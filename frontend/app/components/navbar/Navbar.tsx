"use client";

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Container from "../container/Container";
import Logo from "./Logo";
import Options from "./Options";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Drawer from "../drawer/Drawer";
import Sidebar from "./sidebar/Sidebar";
import { User } from "@/app/models/User";

interface NavbarProps {
  currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <Drawer isOpen={isOpen} toggleOpen={toggleOpen}>
        <Sidebar />
      </Drawer>
      <nav className="fixed w-full bg-white z-10 shadow-sm">
        <div className="h-36 md:h-20 border-b-[1px]">
          <Container>
            <div className="flex items-center gap-4 xl:gap-6 justify-between">
              <div
                onClick={toggleOpen}
                className="block md:hidden p-3 border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu size={22} />
              </div>
              <div className="md:hidden">
                <Logo />
              </div>
              <div className="hidden md:flex items-center md:flex-1 lg:flex-none gap-2">
                <div
                  onClick={toggleOpen}
                  className="block lg:hidden p-2 border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu size={22} />
                </div>
                <Logo />
              </div>
              <div className="flex lg:flex-1 items-center md:justify-between gap-2 lg:gap-0">
                <Options />
                <div className="flex items-center gap-4 justify-end lg:justify-between xl:justify-end">
                  <div className="hidden md:block">
                    <Search />
                  </div>
                  <UserMenu currentUser={currentUser} />
                </div>
              </div>
            </div>
            <div className="block md:hidden mt-2">
              <Search />
            </div>
          </Container>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
