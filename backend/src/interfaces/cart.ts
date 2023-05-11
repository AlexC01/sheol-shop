import { type Types } from "mongoose";

interface CartItems {
  item: Types.ObjectId;
  color: Types.ObjectId;
  size: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface CartInterface {
  user: Types.ObjectId;
  items: CartItems[];
  totalItems?: number;
  total?: number;
}
