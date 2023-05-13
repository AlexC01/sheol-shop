import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    name: { type: String, required: true },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Item"
        },
        size: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Size"
        }
      }
    ]
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

const Wishlists = mongoose.model("Wishlist", wishlistSchema);

export default Wishlists;
