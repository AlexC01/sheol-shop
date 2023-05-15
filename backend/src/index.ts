import express from "express";
import cors from "cors";
import connectMongo from "@db/mongoose";
import categoryRouter from "@routes/category";
import subcategoryRouter from "@routes/subcategory";
import sizeRouter from "@routes/size";
import colorRouter from "@routes/color";
import itemRouter from "@routes/item";
import reviewRouter from "@routes/review";
import userRouter from "@routes/user";
import cartRouter from "@routes/cart";
import brandRouter from "@routes/brand";
import wishlistRouter from "@routes/wishlist";
import path from "path";

void connectMongo();

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use([
  categoryRouter,
  subcategoryRouter,
  sizeRouter,
  colorRouter,
  itemRouter,
  reviewRouter,
  userRouter,
  cartRouter,
  brandRouter,
  wishlistRouter
]);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
