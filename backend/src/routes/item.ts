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

router.get("/api/items", (async (_req, res) => {
  try {
    const items = await Item.find().populate("subcategory").populate("size").populate("color");
    res.send(items);
  } catch (err) {
    res.status(500).send("Error while fetching items");
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
    res.send(item);
  } catch (err) {
    res.status(500).send("Error while creating item");
  }
}) as RequestHandler);

export default router;
