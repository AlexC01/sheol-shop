/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from "mongoose";
import { type ItemInterface } from "@interfaces/item";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
    variations: [
      {
        id: { type: Number, required: false },
        color: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
        images: [{ type: Buffer, required: true }],
        sizes: [
          {
            size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
            stock: { type: Number, required: true, default: 0 }
          }
        ],
        totalStock: { type: Number, required: false, default: 0 }
      }
    ],
    discount: { type: Number, required: false, default: 0 },
    discountPrice: { type: Number, required: false, default: 0 },
    rate: { type: Number, required: false, default: 0 },
    totalReviews: { type: Number, required: false, default: 0 }
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

itemSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "item"
});

itemSchema.pre("save", async function (next) {
  const item: ItemInterface = this;
  item.variations.forEach(variation => {
    variation.id = item.variations.indexOf(variation);
    variation.totalStock = variation.sizes.reduce((acc, curr) => acc + curr.stock, 0);
  });
  if (item.discount !== undefined && item.discount > 0)
    item.discountPrice = item.price - (item.price * item.discount) / 100;
  else item.discountPrice = 0;
  next();
});

const Items = mongoose.model("Item", itemSchema);

export default Items;
