"use client";

import { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./Logo";
import Options from "./Options";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Drawer from "../drawer/Drawer";
import Sidebar from "./sidebar/Sidebar";
import { User } from "@/app/models/User";
import useUserInfo from "@/app/hooks/useUserInfo";
import { Category } from "@/app/models/Category";
import NavbarCategories from "./NavbarCategories";

interface NavbarProps {
  currentUser: User | null;
  categories: {
    categoriesMen: Category[];
    categoriesWomen: Category[];
  };
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const userInfo = useUserInfo();

  useEffect(() => {
    userInfo.changeUserInfo(currentUser);
  }, [currentUser]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const toggleCategoryOpen = () => setCategoryOpen(true);
  const toggleCategoryClose = () => setCategoryOpen(false);
  const toggleCategory = (cat: string) => setCategory(cat);

  return (
    <div className="relative">
      <Drawer isOpen={isOpen} toggleOpen={toggleOpen}>
        <Sidebar categoriesMen={categories.categoriesMen} categoriesWomen={categories.categoriesWomen} />
      </Drawer>
      <nav className="fixed w-full bg-white z-10 shadow-sm">
        <div className="h-36 md:h-20 border-b-[1px]">
          <div className="max-w-[1650px] mx-auto xl:px-16 md:px-10 sm:px-2 px-4">
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
                <div className="h-full">
                  <Options
                    toggleCategory={toggleCategory}
                    toggleCategoryOpen={toggleCategoryOpen}
                    toggleCategoryClose={toggleCategoryClose}
                  />
                </div>
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
          </div>
        </div>
        {categoryOpen && (
          <div
            onMouseEnter={() => toggleCategoryOpen()}
            onMouseLeave={() => toggleCategoryClose()}
            className={`
                    bg-white
                    relative 
                    shadow-sm
                    before:content-['']
                    before:absolute
                    before:top-0
                    before:border-solid
                    before:border-b-[10px]
                    before:3xl:border-b-transparent
                    before:border-r-[10px]
                    before:border-t-[0px]
                    before:border-l-[10px]
                    before:border-t-transparent
                    before:border-r-transparent
                    before:border-l-transparent
                    before:border-b-neutral-200
                    ${
                      category === "women"
                        ? "before:left-[265px] xl:before:left-[310px]"
                        : "before:left-[350px] xl:before:left-[400px]"
                    }
                    before:translate-y-[-100%]
                    before:translate-x-[100%]
                    `}
          >
            {category === "men" && <NavbarCategories categories={categories.categoriesMen} system="men" />}
            {category === "women" && <NavbarCategories categories={categories.categoriesWomen} system="women" />}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
