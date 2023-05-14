import express, { type RequestHandler } from "express";
import multer from "multer";
import Item from "@models/item";
import Cart from "@models/cart";
import SubCategories from "@models/subcategory";
import mongoose from "mongoose";
import { getQuery, pages } from "src/helpers/query";
import getDiscount from "src/helpers/price";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 8
  }
});

router.get("/api/items", (async (req, res) => {
  const { sort, query } = getQuery(req);
  const { page, limit, skip } = pages(req);

  try {
    const count = await Item.countDocuments();
    const totalPages = Math.ceil(count / +limit);
    const items = await Item.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate("subcategory")
      .populate({ path: "sizes", populate: { path: "size" } })
      .populate("color")
      .populate("brand");
    return res.status(200).send({ totalPages, currentPage: page, items });
  } catch (err) {
    return res.status(500).send("Error while fetching items");
  }
}) as RequestHandler);

router.get("/api/items/:id/subcategory", (async (req, res) => {
  const { id } = req.params;

  const { sort, query } = getQuery(req, id);

  const { page, limit, skip } = pages(req);

  try {
    const totalDocuments = await Item.countDocuments(query);
    const subcategory = await SubCategories.findById(req.params.id);
    if (subcategory === null) throw new Error();
    const items = await Item.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate({ path: "sizes", populate: { path: "size" } })
      .populate("color")
      .populate("brand");

    const totalPages = Math.ceil(totalDocuments / +limit);
    return res.status(200).send({ name: subcategory.name, totalPages, currentPage: page, items });
  } catch (err) {
    return res.status(500).send("Error while fetching items");
  }
}) as RequestHandler);

router.get("/api/items/filters", (async (req, res) => {
  const { subcategoryId, search } = req.body;

  const pipeline = [];

  if (subcategoryId !== undefined) {
    const catId = new mongoose.Types.ObjectId(subcategoryId);
    pipeline.push({ $match: { subcategory: catId } });
  }

  if (search !== undefined) {
    pipeline.push({ $match: { name: { $regex: search, $options: "i" } } });

    pipeline.push({
      $lookup: {
        from: "subcategories",
        localField: "subcategory",
        foreignField: "_id",
        as: "subcategories"
      }
    });
  }

  pipeline.push({
    $lookup: {
      from: "colors",
      localField: "color",
      foreignField: "_id",
      as: "colors"
    }
  });

  pipeline.push({
    $lookup: {
      from: "brands",
      localField: "brand",
      foreignField: "_id",
      as: "brands"
    }
  });

  pipeline.push({
    $lookup: {
      from: "sizes",
      localField: "sizes.size",
      foreignField: "_id",
      as: "sizes.size"
    }
  });

  pipeline.push({ $unwind: "$sizes.size" });

  pipeline.push({
    $group: {
      _id: null,
      colors: { $addToSet: "$colors" },
      brands: { $addToSet: "$brands" },
      sizes: { $addToSet: "$sizes.size" },
      subcategories: { $addToSet: "$subcategories" },
      minPrice: { $min: "$price" },
      maxPrice: { $max: "$price" }
    }
  });

  try {
    const results = await Item.aggregate(pipeline);
    const availableFilters = {} as any;
    if (results.length > 0) {
      availableFilters.colors = results[0].colors.flat();
      availableFilters.brands = results[0].brands.flat();
      availableFilters.sizes = results[0].sizes;
      availableFilters.subcategories = results[0].subcategories.flat();
      availableFilters.minPrice = results[0].minPrice;
      availableFilters.maxPrice = results[0].maxPrice;
    }
    return res.status(200).send(availableFilters);
  } catch (err) {
    return res.status(500).send("Error while fetching filters");
  }
}) as RequestHandler);

router.post("/api/items", upload.array("images"), (async (req, res) => {
  try {
    const obj = req.body;
    const images = req.files as Express.Multer.File[];
    const transformation = images.map(image => image.buffer);
    obj.images = transformation;
    const item = new Item(obj);
    await item.save();
    return res.send(item);
  } catch (err) {
    return res.status(500).send("Error while creating item");
  }
}) as RequestHandler);

router.get("/api/items/:id", (async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("subcategory")
      .populate({ path: "sizes", populate: { path: "size" } })
      .populate("color")
      .populate("brand");

    if (item === null) throw new Error();
    return res.send(item);
  } catch (err) {
    return res.status(404).send();
  }
}) as RequestHandler);

router.put("/api/items/:id", upload.any(), (async (req, res) => {
  const obj = req.body;
  try {
    const item = await Item.findById(req.params.id);
    if (item === null) throw new Error();
    if (item.price !== obj.price || (item.discount !== obj.discount && obj.discount > 0)) {
      const newPrice =
        item.discount !== obj.discount && obj.discount > 0 ? getDiscount(obj.price, obj.discount) : obj.price;
      const carts = await Cart.find({ "items.item": item._id });
      await Promise.all(
        carts.map(async cart => {
          cart.items.forEach(cartItem => {
            if (cartItem.item.toString() === item._id.toString()) {
              cartItem.price = newPrice;
            }
          });
          await cart.save();
        })
      );
    }
    const images = req.files as Express.Multer.File[];
    if (images.length > 0) {
      const transformation = images.map(image => image.buffer);
      obj.images = transformation;
    }

    if (item !== null) {
      item.set(obj);
      await item.save();
      return res.send(item);
    }
    return res.status(404).send();
  } catch (err) {
    return res.status(404).send();
  }
}) as RequestHandler);

router.delete("/api/items/:id", (async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (item === null) throw new Error();
    return res.send(item);
  } catch (err) {
    return res.status(404).send();
  }
}) as RequestHandler);

export default router;
