import express, { type RequestHandler } from "express";
import User from "@models/user";

const router = express.Router();

const UserModel = User as any;

router.post("/api/users", (async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(500).send(err);
  }
}) as RequestHandler);

router.post("/api/users/login", (async (req, res) => {
  try {
    const user = await UserModel.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    return res.send({ user, token });
  } catch (err) {
    return res.status(400).send(err);
  }
}) as RequestHandler);

export default router;
