import express, { type RequestHandler } from "express";
import Brand from "@models/brand";

const router = express.Router();

router.get("/api/brands", (async (_req, res) => {
  try {
    const brands = await Brand.find();
    return res.status(200).send(brands);
  } catch (err) {
    return res.status(500).send(err);
  }
}) as RequestHandler);

router.post("/api/brands", (async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    return res.status(201).send(brand);
  } catch (err) {
    return res.status(500).send(err);
  }
}) as RequestHandler);

export default router;
