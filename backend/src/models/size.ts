import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    system: { type: String, required: true, enum: ["men", "women"] },
    value: { type: String, trim: true, required: false }
  },
  { toJSON: { virtuals: true } }
);

sizeSchema.virtual("items", {
  ref: "Item",
  localField: "_id",
  foreignField: "size"
});

sizeSchema.virtual("carts", {
  ref: "Cart",
  localField: "_id",
  foreignField: "size"
});

const Sizes = mongoose.model("Size", sizeSchema);

export default Sizes;
