import express, { type RequestHandler } from "express";
import multer from "multer";
import Item from "@models/item";
import SubCategories from "@models/subcategory";
import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER, SORT_VALIDATIONS } from "@constants/sorts";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 8
  }
});

router.get("/api/items", (async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  try {
    const count = await Item.countDocuments();
    const totalPages = Math.ceil(count / +limit);
    if (req.query.search !== undefined) {
      const items = await Item.find({ name: { $regex: req.query.search, $options: "i" } })
        .limit(+limit)
        .skip((+page - 1) * +limit)
        .populate("subcategory")
        .populate({ path: "sizes", populate: { path: "size" } })
        .populate("color");
      return res.status(200).send({ totalPages, currentPage: page, items });
    }
    const items = await Item.find()
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .populate("subcategory")
      .populate({ path: "sizes", populate: { path: "size" } })
      .populate("color");

    return res.status(200).send({ totalPages, currentPage: page, items });
  } catch (err) {
    return res.status(500).send("Error while fetching items");
  }
}) as RequestHandler);

router.get("/api/items/:id/subcategory", (async (req, res) => {
  const {
    page = 1,
    limit = 7,
    sortBy = DEFAULT_SORT_BY,
    sortOrder = DEFAULT_SORT_ORDER,
    sizes,
    colors,
    minPrice,
    maxPrice
  } = req.query;
  const { id } = req.params;

  const sortByParam = SORT_VALIDATIONS.validSortBy.includes(sortBy as string)
    ? (sortBy as any)
    : (DEFAULT_SORT_BY as any);
  const sortOrderParam = SORT_VALIDATIONS.validSortOrder.includes(sortOrder as string)
    ? (sortOrder as any)
    : (DEFAULT_SORT_ORDER as any);

  const query = {} as any;

  query.subcategory = id;

  if (sizes !== undefined) {
    query.sizes = { $elemMatch: { size: { $in: [sizes] }, stock: { $gt: 0 } } };
  } else {
    query.totalStock = { $gt: 0 };
  }

  if (colors !== undefined) {
    query.color = { $in: [colors] };
  }

  if (minPrice !== undefined) {
    query.price = { $gte: parseFloat(minPrice as string) };
  }

  if (maxPrice !== undefined) {
    query.price = { ...query.price, $lte: parseFloat(maxPrice as string) };
  }

  try {
    const totalDocuments = await Item.countDocuments(query);
    const subcategory = await SubCategories.findById(req.params.id);
    if (subcategory === null) throw new Error();
    const items = await Item.find(query)
      .sort({ [sortByParam]: sortOrderParam })
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .populate({ path: "sizes", populate: { path: "size" } })
      .populate("color");

    const totalPages = Math.ceil(totalDocuments / +limit);
    return res.status(200).send({ name: subcategory.name, totalPages, currentPage: page, items });
  } catch (err) {
    return res.status(500).send("Error while fetching items");
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
      .populate("color");
    if (item === null) throw new Error();
    return res.send(item);
  } catch (err) {
    return res.status(404).send();
  }
}) as RequestHandler);

router.put("/api/items/:id", upload.any(), (async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item === null) throw new Error();
    const obj = req.body;
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
