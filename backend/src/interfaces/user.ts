import { ObjectId } from "mongoose";

export interface UserInterface {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  tokens: Array<{ token: string; _id: ObjectId }>;
  avatar: Buffer;
  createdAt: Date;
  updatedAt: Date;
}
