import express from "express";
import Address from "@models/address";
import auth from "@middleware/auth";
import { TypedRequestUser } from "@interfaces/express-int";

const router = express.Router();

router.get("/api/address", auth, async (req, res) => {
  const { user } = req as TypedRequestUser;
  try {
    const addresses = await Address.find({ user });
    return res.status(200).send(addresses);
  } catch (err) {
    return res.status(500).send();
  }
});

router.get("/api/address/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (address === null) throw new Error();
    return res.status(200).send(address);
  } catch (err) {
    return res.status(404).send();
  }
});

router.post("/api/address", auth, async (req, res) => {
  const { user } = req as TypedRequestUser;
  try {
    if (req.body.default === true) {
      const addresses = await Address.find({ user });
      addresses.forEach(async address => {
        address.default = false;
        await address.save();
      });
    }
    const address = new Address({ ...req.body, user: user._id });
    await address.save();
    return res.status(201).send(address);
  } catch (err) {
    return res.status(500).send();
  }
});

router.patch("/api/address/:id", auth, async (req, res) => {
  const { user, params } = req as unknown as TypedRequestUser;
  const updates = req.body;
  try {
    const address = await Address.findOne({ _id: params.id, user: user._id });
    if (address === null) return res.status(404).send();
    if (req.body.default === true) {
      const addresses = await Address.find({ user });
      addresses.forEach(async address => {
        if (address._id.toString() === params.id) return;
        address.default = false;
        await address.save();
      });
    }
    address.set(updates);
    await address.save();
    return res.status(202).send(address);
  } catch (err) {
    return res.status(500).send();
  }
});

router.delete("/api/address/:id", auth, async (req, res) => {
  const { user, params } = req as unknown as TypedRequestUser;
  try {
    const address = await Address.findOneAndDelete({ _id: params.id, user: user._id });
    if (address === null) return res.status(404).send();
    return res.status(202).send(address);
  } catch (err) {
    return res.status(500).send();
  }
});

export default router;
