import { checkUser } from "../services/user";
import { cookies } from "next/headers";

export default async function getCurrentUser() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("connect.sid");

  try {
    const session = await checkUser(cookie !== undefined ? `${cookie.name}=${cookie.value}` : "");
    return session;
  } catch (err) {
    return null;
  }
}
