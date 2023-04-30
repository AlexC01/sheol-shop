import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, required: false },
    type: { type: String, required: true, trim: true }
  },
  { toJSON: { virtuals: true } }
);

const Categories = mongoose.model("Category", categorySchema);

export default Categories;
