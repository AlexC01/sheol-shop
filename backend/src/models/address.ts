import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    fullName: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    default: { type: Boolean, required: true, default: false }
  },
  { toJSON: { virtuals: true } }
);

const Addresses = mongoose.model("Address", addressSchema);

export default Addresses;
