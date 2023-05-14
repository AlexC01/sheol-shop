import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, required: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: Buffer, required: true }
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

subcategorySchema.virtual("items", {
  ref: "Item",
  localField: "_id",
  foreignField: "subcategory"
});

const SubCategories = mongoose.model("SubCategory", subcategorySchema);

export default SubCategories;
