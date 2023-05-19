import { Category } from "../models/Category";
import APIClient from "./APIClient";

export const getCategories = async (system: string) => {
  const clientAPI = new APIClient();
  const response = await clientAPI.client.get<Category[]>(`/categories${system ? `?system=${system}` : ""}`);
  return response.data;
};
