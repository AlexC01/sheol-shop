import express from "express";
import User from "@models/user";
import auth from "@middleware/auth";
import { USER_ROLES } from "@constants/roles";
import { TypedRequestUser } from "@interfaces/express-int";
import upload from "@middleware/multer";
import { imagePaths } from "@helpers/paths";
import sharp from "sharp";
import fs from "fs";
import { IMAGES_RESOLUTIONS } from "@constants/resolutions";

const router = express.Router();

const UserModel = User as any;

router.get("/api/users", auth, async (req, res) => {
  try {
    const { user } = req as TypedRequestUser;
    if (user.role === USER_ROLES.user) {
      return res.status(403).send({ message: "You don't have permission to do that" });
    }
    const users = await UserModel.find();
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/api/users/me", auth, async (req, res) => {
  try {
    const { user } = req as TypedRequestUser;
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/api/users", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.patch("/api/users/me", auth, upload.single("avatar"), async (req, res) => {
  const { user } = req as any;
  const updates = req.body;
  const { file } = req;
  try {
    if (file !== undefined) {
      const { imagePath, toFilePath } = imagePaths(file.filename);
      await sharp(file.path)
        .resize(IMAGES_RESOLUTIONS.avatar.width, IMAGES_RESOLUTIONS.avatar.height)
        .webp()
        .toFile(toFilePath);
      fs.unlinkSync(file.path);
      updates.avatar = imagePath;
    }
    user.set(updates);
    await user.save();
    return res.send(user);
  } catch (err) {
    return res.status(400).send();
  }
});

router.post("/api/users/login", async (req, res) => {
  try {
    const user = await UserModel.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    return res.send({ user, token });
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default router;
