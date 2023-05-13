import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true }
  },
  { toJSON: { virtuals: true } }
);

brandSchema.virtual("items", {
  ref: "Item",
  localField: "_id",
  foreignField: "brand"
});

const Brands = mongoose.model("Brand", brandSchema);

export default Brands;
