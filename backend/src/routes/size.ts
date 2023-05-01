import express, { type RequestHandler } from "express";
import Size from "@models/size";

const router = express.Router();

router.get("/api/sizes", (async (_req, res) => {
  try {
    const sizes = await Size.find();
    res.send(sizes);
  } catch (err) {
    res.status(500).send("Error while fetching sizes");
  }
}) as RequestHandler);

export default router;
