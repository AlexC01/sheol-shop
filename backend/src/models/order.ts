import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true, default: 0 },
        totalPrice: { type: Number, required: true, default: 0 }
      }
    ],
    freeShipping: { type: Boolean, required: true, default: false },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, required: true, default: "pending", enum: ["pending", "shipped", "delivered"] },
    totalItems: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    shipping: { type: Number, required: true, default: 0 },
    iva: { type: Number, required: true, default: 0 },
    totalIVA: { type: Number, required: true, default: 0 },
    orderId: { type: String, required: true, unique: true }
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

const Orders = mongoose.model("Order", orderSchema);

export default Orders;
