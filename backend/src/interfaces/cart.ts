import { type Types } from "mongoose";
import { type ItemInterface } from "./item";

interface CartItems {
  item: ItemInterface;
  color: Types.ObjectId;
  size: Types.ObjectId;
  outOfStock?: boolean;
  quantity: number;
  price: number;
}

export interface CartInterface {
  user: Types.ObjectId;
  items: CartItems[];
  totalItems?: number;
  total?: number;
}
