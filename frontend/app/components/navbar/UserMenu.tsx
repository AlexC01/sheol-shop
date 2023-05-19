"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import Modal from "../modals/Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@/app/models/User";
import { logOutUser } from "@/app/services/user";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface UserMenuProps {
  currentUser: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const signOut = async () => {
    try {
      await logOutUser();
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong, please try again later!");
    }
  };

  return (
    <>
      <div className="relative">
        <div className="flex flex-row flex-items-center gap-2">
          <div className="relative py-3 px-4 md:p-3 flex items-center border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md transition">
            <BsCart2 size={22} />
            {/* <div className="absolute rounded-xl bg-fifth px-2 -top-1.5 right-0">
            <span className="text-white text-xs">10</span>
          </div> */}
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <div className="hidden lg:block">
              <AiOutlineMenu size={22} />
            </div>
            <Avatar />
          </div>
        </div>
        {isOpen && (
          <>
            <div className="absolute rounded-xl shadow-md w-[40vw] z-10 md:w-48 bg-white overflow-hidden right-0 top-16 md:top-12  text-sm">
              <div className="flex flex-col cursor-pointer">
                {currentUser && (
                  <>
                    <MenuItem onClick={() => {}} label="Profile" />
                    <MenuItem onClick={() => {}} label="Orders" />
                    <MenuItem onClick={() => {}} label="Addresses" />
                    <MenuItem onClick={() => {}} label="Wishlists" />
                    <hr />
                    <MenuItem
                      onClick={() => {
                        setIsOpen(false);
                        signOut();
                      }}
                      label="Log Out"
                    />
                  </>
                )}
                {!currentUser && (
                  <>
                    <MenuItem
                      onClick={() => {
                        setIsOpen(false);
                        loginModal.onOpen();
                      }}
                      label="Login"
                    />
                    <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserMenu;
