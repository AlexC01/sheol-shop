import express, { type RequestHandler } from "express";
import SubCategory from "@models/subcategory";

const router = express.Router();

router.get("/api/subcategories", (async (_req, res) => {
  try {
    const subcategories = await SubCategory.find();
    return res.send(subcategories);
  } catch (error) {
    return res.status(500).send("Error while fetching subcategories");
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

export default router;
