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

void connectMongo();

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(express.json());
app.use(cors());
app.use([categoryRouter, subcategoryRouter, sizeRouter, colorRouter, itemRouter, reviewRouter, userRouter]);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
