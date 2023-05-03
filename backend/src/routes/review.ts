import express, { type RequestHandler } from "express";
import Review from "@models/review";

const router = express.Router();

router.get("/api/reviews", (async (_req, res) => {
  try {
    const reviews = await Review.find();
    res.send(reviews);
  } catch (err) {
    res.status(500).send("Error while fetching reviews");
  }
}) as RequestHandler);

router.get("/api/items/:item/reviews", (async (req, res) => {
  try {
    const reviews = await Review.find({ item: req.params.item });
    return res.send(reviews !== null ? reviews : []);
  } catch (err) {
    return res.status(500).send("Error while fetching reviews");
  }
}) as RequestHandler);

router.post("/api/reviews", (async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    return res.status(201).send(review);
  } catch (err) {
    return res.status(500).send("Error while creating review");
  }
}) as RequestHandler);

export default router;
