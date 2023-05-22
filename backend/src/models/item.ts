/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from "mongoose";
import { type ItemInterface } from "@interfaces/item";
import getDiscount from "@helpers/price";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
    color: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
    system: { type: String, required: true, enum: ["men", "women"] },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    images: [{ type: String, required: true }],
    sizes: [
      {
        size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
        stock: { type: Number, required: true, default: 0 }
      }
    ],
    totalStock: { type: Number, required: false, default: 0 },
    discount: { type: Number, required: false, default: 0 },
    discountPrice: { type: Number, required: false, default: 0 },
    rate: { type: Number, required: false, default: 0 },
    totalReviews: { type: Number, required: false, default: 0 },
    isFeatured: { type: Boolean, required: true, default: false },
    isDiscount: { type: Boolean, required: true, default: false }
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

itemSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "item"
});

itemSchema.virtual("carts", {
  ref: "Cart",
  localField: "_id",
  foreignField: "item"
});

itemSchema.pre("save", async function (next) {
  const item: ItemInterface = this;
  item.totalStock = item.sizes.reduce((acc, curr) => acc + curr.stock, 0);
  if (item.discount !== undefined && item.discount > 0) {
    item.discountPrice = parseFloat(getDiscount(item.price, item.discount).toFixed(2));
    item.isDiscount = true;
  } else {
    item.discountPrice = 0;
    item.isDiscount = false;
  }
  next();
});

const Items = mongoose.model("Item", itemSchema);

export default Items;
