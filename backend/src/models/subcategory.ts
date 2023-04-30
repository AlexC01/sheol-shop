import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, required: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
  },
  { timestamps: true }
);

const SubCategories = mongoose.model("SubCategory", subcategorySchema);

export default SubCategories;
