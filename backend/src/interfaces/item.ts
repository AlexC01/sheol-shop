import { type Types } from "mongoose";

interface Sizes {
  size: Types.ObjectId;
  stock: number;
}

export interface ItemInterface {
  _id: Types.ObjectId;
  name: string;
  images: any;
  color: Types.ObjectId;
  sizes: Sizes[];
  totalStock?: number;
  description: string;
  price: number;
  subcategory: Types.ObjectId;
  discount?: number;
  discountPrice?: number;
  isDiscount: boolean;
}
