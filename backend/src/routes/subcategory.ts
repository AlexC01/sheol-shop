import express, { type RequestHandler } from "express";
import SubCategory from "@models/subcategory";

const router = express.Router();

router.get("/api/subcategories", (async (_req, res) => {
  try {
    const subcategories = await SubCategory.find().populate("category");
    return res.send(subcategories);
  } catch (error) {
    return res.status(500).send("Error while fetching subcategories");
  }
}) as RequestHandler);

router.get("/api/subcategories/:id", (async (req, res) => {
  try {
    const subcategory = await SubCategory.findById(req.params.id)
      .populate("category")
      .populate({ path: "items", populate: { path: "variations", populate: { path: "sizes", populate: "size" } } })
      .populate({ path: "items", populate: { path: "variations", populate: { path: "color" } } });
    if (subcategory === null) throw new Error();
    return res.send(subcategory);
  } catch (err) {
    return res.status(404).send();
  }
}) as RequestHandler);

router.post("/api/subcategories", (async (req, res) => {
  try {
    const subcategory = new SubCategory(req.body);
    await subcategory.save();
    return res.status(201).send(subcategory);
  } catch (err) {
    return res.status(400).send(err);
  }
}) as RequestHandler);

router.delete("/api/subcategories/:id", (async (req, res) => {
  try {
    const subcategory = await SubCategory.findByIdAndDelete({ _id: req.params.id });
    if (subcategory === null) return res.status(404).send();
    return res.send(subcategory);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

export default router;
