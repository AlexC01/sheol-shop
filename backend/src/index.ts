import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
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
import addressRouter from "@routes/address";
import orderRouter from "@routes/order";
import couponRouter from "@routes/coupon";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const PORT = process.env.PORT ?? 3030;
const corsOptions = {
  origin: ["https://sheol-shop.acuadraq.com", "http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["Set-Cookie"]
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
      httpOnly: true
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_STRING ?? ""
    })
  })
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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
  wishlistRouter,
  addressRouter,
  orderRouter,
  couponRouter
]);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING ?? "")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
