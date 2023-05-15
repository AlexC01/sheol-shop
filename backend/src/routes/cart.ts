import express from "express";
import Cart from "@models/cart";
import auth from "@middleware/auth";
import { BodyCart, TypedRequestBody, TypedRequestUser } from "@interfaces/express-int";

const router = express.Router();

router.get("/api/cart", auth, async (req, res) => {
  try {
    const { user } = req as TypedRequestUser;
    const cart = await Cart.findOne({ user }).populate("items.item").populate("items.size");
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
});

router.post("/api/cart", auth, async (req, res) => {
  try {
    const { user, body } = req as TypedRequestUser;
    const cart = await Cart.findOne({ user });
    if (cart === null) return res.status(404).send();
    const findProduct = cart.items.findIndex(
      itemOld => itemOld.item.toString() === body.item && itemOld.size.toString() === body.size
    );
    if (findProduct === -1) {
      cart.items.push(body);
    } else {
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
});

router.delete("/api/cart", auth, async (req, res) => {
  try {
    const { user, body } = req as TypedRequestBody<BodyCart>;
    const cart = await Cart.findOne({ user });
    if (cart === null) return res.status(404).send();
    const newProducts = cart.items.filter(itemOld => itemOld.item.toString() !== body.item);
    cart.items = newProducts;
    await cart.save();
    return res.status(202).send(cart);
  } catch (err) {
    return res.status(500).send();
  }
});

router.post("/api/cart/items/remove", auth, async (req, res) => {
  try {
    const { user } = req as TypedRequestUser;
    const cart = await Cart.findOne({ user });
    if (cart === null) return res.status(404).send();
    cart.items = [];
    await cart.save();
    return res.status(202).send(cart);
  } catch (err) {
    return res.status(500).send();
  }
});

export default router;
