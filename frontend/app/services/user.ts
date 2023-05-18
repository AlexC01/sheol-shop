import { UserSignUp } from "../models/User";
import APIClient from "./APIClient";

export const signUp = async (body: UserSignUp) => {
  try {
    const clientAPI = new APIClient();
    const response = await clientAPI.client.post("/users", body);
    return response.data;
  } catch (err) {
    return err;
  }
};
