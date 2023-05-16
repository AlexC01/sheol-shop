"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import Avatar from "../Avatar";

const UserMenu = () => {
  return (
    <div>
      <div className="flex flex-row flex-items-center gap-2">
        <div className="p-3 border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md transition">
          <BsCart2 size={22} />
        </div>
        <div className="p-3 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu size={22} />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
