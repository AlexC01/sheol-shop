import express, { type RequestHandler } from "express";
import Color from "@models/color";

const router = express.Router();

router.get("/api/colors", (async (_req, res) => {
  try {
    const colors = await Color.find();
    res.send(colors);
  } catch (err) {
    res.status(500).send("Error while fetching colors");
  }
}) as RequestHandler);

export default router;
