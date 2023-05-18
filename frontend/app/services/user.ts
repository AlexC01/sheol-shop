import { UserLogIn, UserSignUp } from "../models/User";
import APIClient from "./APIClient";

export const signUp = async (body: UserSignUp) => {
  const clientAPI = new APIClient();
  const response = await clientAPI.client.post("/users", body);
  return response.data;
};

export const logIn = async (body: UserLogIn) => {
  const clientAPI = new APIClient();
  const response = await clientAPI.client.post("/users/login", body);
  return response.data;
};
