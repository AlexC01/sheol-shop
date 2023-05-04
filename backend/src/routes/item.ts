import express, { type RequestHandler } from "express";
import multer from "multer";
import Item from "@models/item";

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
        .populate({ path: "variations", populate: { path: "sizes", populate: "size" } })
        .populate({ path: "variations", populate: { path: "color" } });
      return res.status(200).send({ totalPages, currentPage: page, items });
    }
    const items = await Item.find()
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .populate("subcategory")
      .populate({ path: "variations", populate: { path: "sizes", populate: "size" } })
      .populate({ path: "variations", populate: { path: "color" } });

    return res.status(200).send({ totalPages, currentPage: page, items });
  } catch (err) {
    return res.status(500).send("Error while fetching items");
  }
}) as RequestHandler);

router.post("/api/items", upload.any(), (async (req, res) => {
  try {
    const obj = req.body;
    const allImages = req.files as Express.Multer.File[];
    for (let i = 0; i < obj.variations.length; i++) {
      const images = allImages.filter(image => image.fieldname === `variations[${i}][images]`);
      const transformation = images.map(image => image.buffer);
      obj.variations[i].images = transformation;
    }
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
      .populate({ path: "variations", populate: { path: "sizes", populate: "size" } })
      .populate({ path: "variations", populate: { path: "color" } });
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
    const allImages = req.files as Express.Multer.File[];
    for (let i = 0; i < obj.variations.length; i++) {
      const images = allImages.filter(image => image.fieldname === `variations[${i}][images]`);
      const transformation = images.map(image => image.buffer);
      obj.variations[i].images = transformation;
    }
    if (item !== null) {
      item.set(obj);
      await item.save();
      return res.send(item);
    }
    return res.status(400);
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
