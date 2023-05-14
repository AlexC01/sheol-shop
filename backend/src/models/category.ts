import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, required: false },
    system: { type: String, required: true, enum: ["men", "women"] },
    image: { type: Buffer, required: true }
  },
  { toJSON: { virtuals: true } }
);

categorySchema.virtual("subcategories", {
  ref: "SubCategory",
  localField: "_id",
  foreignField: "category"
});

const Categories = mongoose.model("Category", categorySchema);

export default Categories;
