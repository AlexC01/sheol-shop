import express, { type RequestHandler } from "express";
import Wishlist from "@models/wishlist";
import auth from "@middleware/auth";

const router = express.Router();

router.get("/api/wishlist", auth, (async (req, res) => {
  const { user } = req as any;
  try {
    const wishlists = await Wishlist.find({ user }).populate("items.item").populate("items.size");
    if (wishlists === null) return res.status(404).send();
    return res.status(200).send(wishlists);
  } catch (err) {
    return res.status(500).send(err);
  }
}) as RequestHandler);

router.get("/api/wishlist/:id", auth, (async (req, res) => {
  const { user } = req as any;
  const { id } = req.params;
  try {
    const wishlist = await Wishlist.findOne({ _id: id, user }).populate("items.item").populate("items.size");
    if (wishlist === null) return res.status(404).send();
    return res.status(200).send(wishlist);
  } catch (err) {
    return res.status(500).send(err);
  }
}) as RequestHandler);

router.post("/api/wishlist", auth, (async (req, res) => {
  const { user, body } = req as any;
  const { name } = body;
  try {
    const wishlists = await Wishlist.findOne({ user, name });
    if (wishlists !== null) return res.status(406).send({ message: "Wishlist name already exists" });
    const newWishlist = new Wishlist({ user, name, items: [] });
    await newWishlist.save();
    return res.status(201).send(newWishlist);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

router.post("/api/wishlist/:id/item", auth, (async (req, res) => {
  const { body, user } = req as any;
  const { id } = req.params;
  const { item, size } = body;
  try {
    const wishlist = await Wishlist.findOne({ _id: id, user });
    if (wishlist === null) return res.status(404).send({ message: "Wishlist not found" });
    const findProduct = wishlist.items.findIndex(
      itemOld => itemOld.item.toString() === item && itemOld.size.toString() === size
    );
    if (findProduct === -1) {
      wishlist.items.push({ item, size });
    } else return res.status(406).send({ message: "Item already exists in wishlist" });
    await wishlist.save();
    return res.status(202).send(wishlist);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

router.post("/api/wishlist/:id/item/remove/:itemId", auth, (async (req, res) => {
  const { user } = req as any;
  const { id, itemId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ _id: id, user });
    if (wishlist === null) return res.status(404).send({ message: "Wishlist not found" });
    const products = wishlist.items.filter((itemOld: any) => itemOld._id.toString() !== itemId);
    wishlist.items = products;
    await wishlist.save();
    return res.status(202).send(wishlist);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

router.patch("/api/wishlist/:id", auth, (async (req, res) => {
  const { body, user } = req as any;
  const { id } = req.params;
  const { name } = body;
  try {
    const wishlist = await Wishlist.findOne({ _id: id, user });
    if (wishlist === null) return res.status(404).send({ message: "Wishlist not found" });
    wishlist.name = name;
    await wishlist.save();
    return res.status(202).send(wishlist);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

router.delete("/api/wishlist/:id", auth, (async (req, res) => {
  const { user } = req as any;
  const { id } = req.params;
  try {
    const wishlist = await Wishlist.findOneAndDelete({ _id: id, user });
    if (wishlist === null) return res.status(404).send({ message: "Wishlist not found" });
    return res.status(202).send(wishlist);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

export default router;
