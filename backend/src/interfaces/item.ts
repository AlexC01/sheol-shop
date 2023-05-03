import { type Types } from "mongoose";

interface Sizes {
  size: Types.ObjectId;
  stock: number;
}

interface Variations {
  color: Types.ObjectId;
  images: any;
  totalStock?: number;
  sizes: Sizes[];
}

export interface ItemInterface {
  name: string;
  description: string;
  price: number;
  subcategory: Types.ObjectId;
  variations: Variations[];
  discount?: number;
  discountPrice?: number;
}
