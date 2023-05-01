import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, required: false },
    price: { type: Number, required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
    size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
    color: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
    images: [{ type: Buffer, required: true }],
    stock: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: false, default: 0 },
    discountPrice: { type: Number, required: false, default: 0 }
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
  },
  { timestamps: true }
);

const Items = mongoose.model("Item", itemSchema);

export default Items;
