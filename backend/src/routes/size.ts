import express from "express";
import Size from "@models/size";

const router = express.Router();

router.get("/api/sizes", async (req, res) => {
  try {
    const sizes = await Size.find(req.query);
    res.send(sizes);
  } catch (err) {
    res.status(500).send("Error while fetching sizes");
  }
});

router.post("/api/sizes", async (req, res) => {
  try {
    const size = new Size(req.body);
    await size.save();
    res.send(size);
  } catch (err) {
    res.status(400).send("Error while creating size");
  }
});

export default router;
