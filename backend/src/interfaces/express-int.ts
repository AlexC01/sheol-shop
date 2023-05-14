import { Request } from "express";
import { Query } from "express-serve-static-core";
import { UserInterface } from "./user";

export interface TypedRequestUser extends Request {
  user: UserInterface;
  token?: string;
}

export interface TypedRequestBody<T> extends Request {
  body: T;
  user: UserInterface;
  token?: string;
}

interface QueryInt extends Query {
  sortBy?: string;
  sortOrder?: string;
  sizes?: string;
  colors?: string;
  brands?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  limit?: string;
  page?: string;
}

export interface TypedRequestQuery extends Request {
  query: QueryInt;
}

export interface BodyCart {
  item: string;
  size: string;
  price: number;
  type: string;
}

export interface TypeResponse extends Express.Response {
  status: string;
}
