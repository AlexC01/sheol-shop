import express from "express";
import Color from "@models/color";

const router = express.Router();

router.get("/api/colors", async (_req, res) => {
  try {
    const colors = await Color.find();
    res.send(colors);
  } catch (err) {
    res.status(500).send("Error while fetching colors");
  }
});

router.post("/api/colors", async (req, res) => {
  try {
    const color = new Color(req.body);
    await color.save();
    res.send(color);
  } catch (err) {
    res.status(400).send("Error while creating color");
  }
});

export default router;
