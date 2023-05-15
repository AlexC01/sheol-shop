import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    discount: {
      type: Number,
      required: true
    },
    maxUses: {
      type: Number,
      required: true
    },
    uses: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

const Coupons = mongoose.model("Coupons", couponSchema);

export default Coupons;
