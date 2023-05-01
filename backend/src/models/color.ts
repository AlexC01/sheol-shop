import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    value: { type: String, trim: true }
  },
  { toJSON: { virtuals: true } }
);

colorSchema.virtual("items", {
  ref: "Item",
  localField: "_id",
  foreignField: "color"
});

const Colors = mongoose.model("Color", colorSchema);

export default Colors;
