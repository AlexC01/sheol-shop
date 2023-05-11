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

export default router;
