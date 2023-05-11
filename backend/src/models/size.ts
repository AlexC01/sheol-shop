import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    value: { type: String, trim: true, required: true, unique: true }
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
