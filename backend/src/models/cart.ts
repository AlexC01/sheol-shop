/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from "mongoose";
import { type CartInterface } from "@interfaces/cart";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        color: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
        size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true, default: 0 }
      }
    ],
    totalItems: { type: Number, required: false, default: 0 },
    total: { type: Number, required: false, default: 0 }
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

cartSchema.pre("save", async function (next) {
  const cart: CartInterface = this;
  if (cart.items.length > 0) {
    cart.total = cart.items.reduce((acc, curr) => acc + curr.price, 0);
    cart.totalItems = cart.items.length;
  }
  next();
});

const Carts = mongoose.model("Cart", cartSchema);

export default Carts;
