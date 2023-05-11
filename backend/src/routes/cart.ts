/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
import express, { type RequestHandler } from "express";
import Cart from "@models/cart";
import auth from "@middleware/auth";

const router = express.Router();

router.get("/api/cart", auth, (async (req, res) => {
  try {
    const { user } = req as any;
    const cart = await Cart.findOne({ user }).populate("items.item");
    if (cart === null) {
      const body = {
        user: user._id,
        items: [],
        totalItems: 0,
        total: 0
      };
      const newCart = new Cart(body);
      await newCart.save();
      return res.status(200).send(newCart);
    }
    return res.status(200).send(cart);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

router.post("/api/cart", auth, (async (req, res) => {
  try {
    const { user, body } = req as any;
    const cart = await Cart.findOne({ user });
    if (cart === null) return res.status(404).send();
    const findProduct = cart.items.findIndex(
      itemOld =>
        itemOld.item.toString() === body.item &&
        itemOld.color.toString() === body.color &&
        itemOld.size.toString() === body.size
    );
    if (findProduct === -1) {
      cart.items.push({ item: body.item, color: body.color, size: body.size, quantity: 1, price: body.price });
    } else {
      cart.items[findProduct].price = body.price;
      const quant = body.type === "add" ? cart.items[findProduct].quantity + 1 : cart.items[findProduct].quantity - 1;
      if (quant === 0) {
        cart.items.splice(findProduct, 1);
      } else {
        cart.items[findProduct].quantity = quant;
      }
    }
    await cart.save();
    return res.status(202).send(cart);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

router.delete("/api/cart", auth, (async (req, res) => {
  try {
    const { user, body } = req as any;
    const cart = await Cart.findOne({ user });
    if (cart === null) return res.status(404).send();
    const newProducts = cart.items.filter(itemOld => itemOld.item.toString() !== body.item);
    cart.items = newProducts;
    await cart.save();
    return res.status(202).send(cart);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

export default router;
