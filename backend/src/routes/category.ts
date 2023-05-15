import express from "express";
import Category from "@models/category";
import upload from "@middleware/multer";
import sharp from "sharp";
import fs from "fs";
import { IMAGES_RESOLUTIONS } from "@constants/resolutions";
import { imagePaths } from "@helpers/paths";

const router = express.Router();

router.get("/api/categories", async (_req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    res.send(categories);
  } catch (err) {
    res.status(500).send("Error while fetching categories");
  }
});

router.get("/api/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("subcategories");
    if (category === null) throw new Error();
    return res.send(category);
  } catch (err) {
    return res.status(404).send();
  }
});

router.post("/api/categories", upload.single("image"), async (req, res) => {
  const { path: pathFile, filename } = req.file as Express.Multer.File;

  try {
    const { imagePath, toFilePath } = imagePaths(filename);

    await sharp(pathFile)
      .resize(IMAGES_RESOLUTIONS.hero.width, IMAGES_RESOLUTIONS.hero.height)
      .webp()
      .toFile(toFilePath);
    fs.unlinkSync(pathFile);
    req.body.image = imagePath;

    const category = new Category(req.body);
    await category.save();

    return res.status(201).send(category);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.patch("/api/categories/:id", upload.single("image"), async (req, res) => {
  const { file } = req;
  const updates = req.body;
  try {
    if (file !== undefined) {
      const { imagePath, toFilePath } = imagePaths(file.filename);
      await sharp(file.path)
        .resize(IMAGES_RESOLUTIONS.hero.width, IMAGES_RESOLUTIONS.hero.height)
        .webp()
        .toFile(toFilePath);
      fs.unlinkSync(file.path);
      updates.image = imagePath;
    }
    const category = await Category.findOne({ _id: req.params.id });
    if (category === null) return res.status(404).send();
    category.set(updates);
    await category.save();
    return res.send(category);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/api/categories/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete({ _id: req.params.id });
    if (category === null) return res.status(404).send();
    return res.send(category);
  } catch (err) {
    return res.status(500).send();
  }
});

export default router;
