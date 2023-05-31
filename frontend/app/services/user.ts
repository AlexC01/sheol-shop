import { User, UserLogIn, UserSignUp } from "../models/User";
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

export const checkUser = async (cookie: string) => {
  const clientAPI = new APIClient();
  clientAPI.client.defaults.headers.Cookie = cookie;
  const response = await clientAPI.client.get<User>("/users");
  return response.data;
};

export const logOutUser = async () => {
  const clientAPI = new APIClient();
  const response = await clientAPI.client.post("/users/logout");
  return response.data;
};
