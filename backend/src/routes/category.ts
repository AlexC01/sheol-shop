import express from "express";
import Category from "@models/category";

const router = express.Router();

const types = ["men", "women"];

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

router.post("/api/categories", async (req, res) => {
  try {
    if (!types.includes(req.body.type)) {
      return res.status(400).send({ error: "Invalid category type, should be `men` or `women`" });
    }
    const category = new Category(req.body);
    await category.save();
    return res.status(201).send(category);
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
