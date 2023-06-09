import express from "express";
import Review from "@models/review";
import Item from "@models/item";
import auth from "@middleware/auth";
import { TypedRequestUser } from "@interfaces/express-int";

const router = express.Router();

router.get("/api/reviews", async (_req, res) => {
  try {
    const reviews = await Review.find();
    res.send(reviews);
  } catch (err) {
    res.status(500).send("Error while fetching reviews");
  }
});

router.get("/api/items/:item/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ item: req.params.item }).populate("user");
    return res.send(reviews !== null ? reviews : []);
  } catch (err) {
    return res.status(500).send("Error while fetching reviews");
  }
});

router.post("/api/reviews", auth, async (req, res) => {
  try {
    const { item: itemId, rating } = req.body;
    const item = await Item.findById(itemId);
    if (item === null) return res.status(404).send("Item not found");
    const reviews = await Review.find({ item: itemId });
    const total = reviews.length === 0 ? 0 : reviews.reduce((acc, curr) => acc + curr.rating, 0);
    item.rate = parseFloat(((total + rating) / (reviews.length + 1)).toFixed(2));
    item.totalReviews = reviews.length + 1;
    const { user } = req as TypedRequestUser;
    req.body.user = user._id;
    const review = new Review(req.body);
    await item.save();
    await review.save();
    return res.status(201).send(review);
  } catch (err) {
    return res.status(500).send(err);
  }
});

export default router;
