import express from "express";
import SubCategory from "@models/subcategory";
import upload from "@middleware/multer";
import { imagePaths } from "@helpers/paths";
import sharp from "sharp";
import fs from "fs";
import { IMAGES_RESOLUTIONS } from "@constants/resolutions";

const router = express.Router();

router.get("/api/subcategories", async (_req, res) => {
  try {
    const subcategories = await SubCategory.find().populate("category");
    return res.send(subcategories);
  } catch (error) {
    return res.status(500).send("Error while fetching subcategories");
  }
});

router.get("/api/subcategories/:id", async (req, res) => {
  try {
    const subcategory = await SubCategory.findById(req.params.id)
      .populate("category")
      .populate({ path: "items", populate: { path: "sizes", populate: { path: "size" } } });
    if (subcategory === null) throw new Error();
    return res.send(subcategory);
  } catch (err) {
    return res.status(404).send();
  }
});

router.post("/api/subcategories", upload.single("thumbnail"), async (req, res) => {
  const { file } = req;
  try {
    if (file === undefined) throw new Error("Image is required");
    const { imagePath, toFilePath } = imagePaths(file.filename);
    await sharp(file.path)
      .resize(IMAGES_RESOLUTIONS.thumbnail.width, IMAGES_RESOLUTIONS.thumbnail.height)
      .webp()
      .toFile(toFilePath);
    fs.unlinkSync(file.path);
    req.body.thumbnail = imagePath;
    const subcategory = new SubCategory(req.body);
    await subcategory.save();
    return res.status(201).send(subcategory);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.patch("/api/subcategories/:id", upload.single("image"), async (req, res) => {
  const updates = req.body;
  const { file } = req;
  try {
    if (file !== undefined) {
      const { imagePath, toFilePath } = imagePaths(file.filename);
      await sharp(file.path)
        .resize(IMAGES_RESOLUTIONS.sections.width, IMAGES_RESOLUTIONS.sections.height)
        .webp()
        .toFile(toFilePath);
      fs.unlinkSync(file.path);
      updates.image = imagePath;
    }
    const subcategory = await SubCategory.findOne({ _id: req.params.id });
    if (subcategory === null) return res.status(404).send();
    subcategory.set(updates);
    await subcategory.save();
    return res.status(202).send(subcategory);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/api/subcategories/:id", async (req, res) => {
  try {
    const subcategory = await SubCategory.findByIdAndDelete({ _id: req.params.id });
    if (subcategory === null) return res.status(404).send();
    return res.send(subcategory);
  } catch (err) {
    return res.status(500).send();
  }
});

export default router;
