import express from "express";
import Order from "@models/order";
import Coupon from "@models/coupon";
import Cart from "@models/cart";
import Item from "@models/item";
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

    await Promise.all(
      cartItems.map(async (itemOld: any) => {
        const item = await Item.findById(itemOld.item._id);
        if (item === null) return;
        const findProduct = item.sizes.findIndex(
          (sizeOld: any) => sizeOld.size._id.toString() === itemOld.size._id.toString()
        );
        if (findProduct === -1) return;
        item.sizes[findProduct].stock -= itemOld.quantity;
        await item.save();
      })
    );

    let finalPrice = cart.total;
    let couponDiscount = 0;
    let freeShipping = false;

    if (body.coupon !== undefined) {
      const coupon = await Coupon.findOne({ code: body.coupon });
      if (coupon === null || !coupon.isActive) return res.status(401).send({ msg: "Invalid coupon" });
      couponDiscount = parseFloat((finalPrice * (coupon.discount / 100)).toFixed(2));
      finalPrice -= couponDiscount;
      coupon.uses += 1;
      if (coupon.uses + 1 > coupon.maxUses) coupon.isActive = false;
      await coupon.save();
    }

    if (finalPrice < 50) finalPrice += 10;
    else freeShipping = true;

    const IVA = parseFloat((finalPrice * 0.15).toFixed(2));

    finalPrice = IVA + finalPrice;

    const obj = {
      items: cartItems,
      address: body.address,
      user: user._id,
      status: "pending",
      total: cart.total,
      iva: IVA,
      couponDiscount,
      totalIVA: finalPrice,
      freeShipping,
      shipping: freeShipping ? 0 : 10,
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
