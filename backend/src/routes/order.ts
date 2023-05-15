import express from "express";
import Order from "@models/order";
import Cart from "@models/cart";
import auth from "@middleware/auth";
import { TypedRequestUser } from "@interfaces/express-int";

const router = express.Router();

router.get("/api/orders", auth, async (req, res) => {
  const { user } = req as TypedRequestUser;
  if (user.role !== "admin") return res.status(401).send();
  try {
    const orders = await Order.find().populate("items.item").populate("address");
    return res.send(orders);
  } catch (err) {
    return res.status(500).send();
  }
});

router.get("/api/orders/me", auth, async (req, res) => {
  const { user } = req as TypedRequestUser;
  try {
    const orders = await Order.find({ user: user._id }).populate("items.item").populate("address");
    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send();
  }
});

router.get("/api/orders/:id", auth, async (req, res) => {
  const { user } = req as unknown as TypedRequestUser;
  try {
    if (user.role === "admin") {
      const order = await Order.findOne({ _id: req.params.id }).populate("items.item").populate("address");
      return res.status(200).send(order);
    }
    const order = await Order.findOne({ _id: req.params.id, user: user._id })
      .populate("items.item")
      .populate("address");
    if (order === null) return res.status(404).send();
    return res.status(200).send(order);
  } catch (err) {
    return res.status(500).send();
  }
});

router.post("/api/orders", auth, async (req, res) => {
  const { user, body } = req as TypedRequestUser;
  try {
    const cart = await Cart.findOne({ user }).populate("items.item").populate("items.size");
    if (cart === null) return res.status(404).send();
    const cartItems = cart.items.filter(item => item.outOfStock === false);
    if (cartItems.length === 0) return res.status(401).send({ msg: "There are items out of stock" });

    const outOfStockItems: string[] = [];

    cartItems.forEach((itemOld: any) => {
      const findProduct = itemOld.item.sizes.findIndex(
        (sizeOld: any) => sizeOld.size._id.toString() === itemOld.size._id.toString()
      );
      if (findProduct === -1) return outOfStockItems.push(itemOld.item.id);
      if (itemOld.quantity > itemOld.item.sizes[findProduct].quantity) return outOfStockItems.push(itemOld.item.id);
      delete itemOld.outOfStock;
      return itemOld;
    });

    if (outOfStockItems.length > 0) return res.status(401).send({ msg: "There are items out of stock" });

    let finalPrice = cart.total;

    if (cart.total < 50) finalPrice += 10;

    const IVA = finalPrice * 0.15;

    finalPrice = IVA + finalPrice;

    const obj = {
      items: cartItems,
      address: body.address,
      user: user._id,
      status: "pending",
      total: cart.total,
      iva: IVA,
      totalIVA: finalPrice,
      freeShipping: cart.total > 50,
      shipping: cart.total < 50 ? 10 : 0,
      totalItems: cartItems.length,
      orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };

    const newOrder = new Order(obj);

    await newOrder.save();

    cart.items = cart.items.filter(item => item.outOfStock === true);
    await cart.save();

    return res.status(201).send(newOrder);
  } catch (err) {
    return res.status(500).send();
  }
});

export default router;
