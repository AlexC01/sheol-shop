import express from "express";
import upload from "@middleware/multer";
import Item from "@models/item";
import Cart from "@models/cart";
import SubCategories from "@models/subcategory";
import mongoose from "mongoose";
import { getQuery, pages } from "@helpers/query";
import { imagePaths } from "@helpers/paths";
import fs from "fs";
import sharp from "sharp";
import { IMAGES_RESOLUTIONS } from "@constants/resolutions";

const router = express.Router();

router.get("/api/items", async (req, res) => {
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
});

router.get("/api/items/:id/subcategory", async (req, res) => {
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
});

router.get("/api/items/:id", async (req, res) => {
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
});

router.get("/api/items/filters", async (req, res) => {
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
});

router.post("/api/items", upload.array("images"), async (req, res) => {
  const obj = req.body;
  const images = req.files as Express.Multer.File[];
  try {
    obj.images = await Promise.all(
      images.map(async image => {
        const { path: pathFile, filename } = image;
        const { imagePath, toFilePath } = imagePaths(filename);
        await sharp(pathFile)
          .resize(IMAGES_RESOLUTIONS.product.width, IMAGES_RESOLUTIONS.product.height)
          .webp()
          .toFile(toFilePath);

        fs.unlinkSync(pathFile);

        return imagePath;
      })
    );
    const item = new Item(obj);
    await item.save();
    return res.send(item);
  } catch (err) {
    return res.status(500).send("Error while creating item");
  }
});

router.patch("/api/items/:id", upload.array("images"), async (req, res) => {
  const obj = req.body;
  const images = req.files as Express.Multer.File[];
  try {
    const item = await Item.findById(req.params.id);
    if (item === null) return res.status(404).send();

    if (images.length > 0) {
      obj.images = await Promise.all(
        images.map(async image => {
          const { path: pathFile, filename } = image;
          const { imagePath, toFilePath } = imagePaths(filename);
          await sharp(pathFile)
            .resize(IMAGES_RESOLUTIONS.product.width, IMAGES_RESOLUTIONS.product.height)
            .webp()
            .toFile(toFilePath);

          fs.unlinkSync(pathFile);

          return imagePath;
        })
      );
    }
    item.set(obj);
    await item.save();
    if (obj.price !== undefined || obj.discount !== undefined || obj.sizes !== undefined) {
      const carts = await Cart.find({ "items.item": item._id });
      await Promise.all(
        carts.map(async cart => {
          await cart.save();
        })
      );
    }
    return res.send(item);
  } catch (err) {
    return res.status(404).send();
  }
});

router.delete("/api/items/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (item === null) throw new Error();
    return res.send(item);
  } catch (err) {
    return res.status(404).send();
  }
});

export default router;
