import express from "express";
import Coupon from "@models/coupon";
import auth from "@middleware/auth";
import { TypedRequestUser } from "@interfaces/express-int";

const router = express.Router();

router.get("/api/coupons", auth, async (req, res) => {
  const { user } = req as TypedRequestUser;
  if (user.role !== "admin") return res.status(403).send();
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    return res.status(200).send(coupons);
  } catch (err) {
    return res.status(500).send();
  }
});

router.get("/api/coupons/:code", async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (coupon === null) throw new Error();
    return res.status(200).send(coupon);
  } catch (err) {
    return res.status(404).send();
  }
});

router.post("/api/coupons", auth, async (req, res) => {
  const { user } = req as TypedRequestUser;
  if (user.role !== "admin") return res.status(403).send();
  try {
    const coupon = await Coupon.create(req.body);
    return res.status(201).send(coupon);
  } catch (err) {
    return res.status(500).send();
  }
});

router.patch("/api/coupons/:code", auth, async (req, res) => {
  const { user } = req as unknown as TypedRequestUser;
  if (user.role !== "admin") return res.status(403).send();
  try {
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (coupon === null) return res.status(404).send();
    if (req.body.maxUses !== undefined) {
      if (req.body.maxUses < coupon.uses)
        return res.status(400).send({ msg: "The max uses can't be less than the current uses" });
      req.body.isActive = req.body.maxUses > coupon.uses;
    }
    coupon.set(req.body);
    await coupon.save();
    return res.status(202).send(coupon);
  } catch (err) {
    return res.status(500).send();
  }
});

export default router;
