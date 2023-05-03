import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true }
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

const Reviews = mongoose.model("Review", reviewSchema);

export default Reviews;
