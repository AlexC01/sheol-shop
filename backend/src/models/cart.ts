/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from "mongoose";
import { type CartInterface } from "@interfaces/cart";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
        outOfStock: { type: Boolean, required: false, default: false },
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
  const newCart = this as any;
  await newCart.populate("items.item");
  await newCart.populate("items.size");
  const cart: CartInterface = newCart;
  cart.total = cart.items.reduce((acc, curr) => acc + curr.price, 0);
  cart.totalItems = cart.items.length;
  if (cart.items.length > 0) {
    const newItems = cart.items.map(itemOld => {
      const findSize = itemOld.item.sizes.find(sizeOld => sizeOld.size.toString() === itemOld.size.id.toString());
      if (findSize !== undefined) return { ...itemOld, outOfStock: findSize.stock < itemOld.quantity };
      return itemOld;
    });
    cart.items = newItems;
  }
  next();
});

const Carts = mongoose.model("Cart", cartSchema);

export default Carts;
