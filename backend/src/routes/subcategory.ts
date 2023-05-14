import express from "express";
import SubCategory from "@models/subcategory";
import upload from "@helpers/multer";

const router = express.Router();

router.get("/api/subcategories", async (_req, res) => {
  try {
    const subcategories = await SubCategory.find().populate("category");
    return res.send(subcategories);
  } catch (error) {
    return res.status(500).send("Error while fetching subcategories");
  }
});

router.get("/api/subcategories/:id", async (req, res) => {
  try {
    const subcategory = await SubCategory.findById(req.params.id)
      .populate("category")
      .populate({ path: "items", populate: { path: "sizes", populate: { path: "size" } } });
    if (subcategory === null) throw new Error();
    return res.send(subcategory);
  } catch (err) {
    return res.status(404).send();
  }
});

router.post("/api/subcategories", upload.single("image"), async (req, res) => {
  const image = req.file as Express.Multer.File;
  try {
    req.body.image = image.buffer;
    const subcategory = new SubCategory(req.body);
    await subcategory.save();
    return res.status(201).send(subcategory);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/api/subcategories/:id", async (req, res) => {
  try {
    const subcategory = await SubCategory.findByIdAndDelete({ _id: req.params.id });
    if (subcategory === null) return res.status(404).send();
    return res.send(subcategory);
  } catch (err) {
    return res.status(500).send();
  }
});

export default router;
