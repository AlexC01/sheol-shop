import { create } from "zustand";
import { User } from "../models/User";

interface UserModalStore {
  currentUser: User | null;
  changeUserInfo: (user: User | null) => void;
}

const useUserInfo = create<UserModalStore>(set => ({
  currentUser: null,
  changeUserInfo: user => set({ currentUser: user })
}));

export default useUserInfo;
