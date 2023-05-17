"use client";

import { useState } from "react";
import Rows from "./Rows";
import SidebarHeader from "./SidebarHeader";
import CategoryDetail from "./CategoryDetail";

const Sidebar = () => {
  const [active, setActive] = useState("women");
  const [openCategory, setOpenCategory] = useState(false);

  const toggleCategoryOpen = () => setOpenCategory(!openCategory);

  return (
    <div className="relative w-screen max-w-md h-full overflow-y-auto overflow-x-hidden">
      <div className="py-2">
        <SidebarHeader>
          <div className="flex items-center justify-center gap-6">
            <p
              onClick={() => setActive("women")}
              className={`text-lg transition ${
                active === "women" ? "text-black" : "text-black/60 hover:text-black/50"
              }  cursor-pointer font-semibold`}
            >
              Women
            </p>
            <div>
              <p
                onClick={() => setActive("men")}
                className={`text-lg transition ${
                  active === "men" ? "text-black" : "text-black/60 hover:text-black/50"
                }  cursor-pointer font-semibold`}
              >
                Men
              </p>
            </div>
          </div>
        </SidebarHeader>
        <div className="flex items-center justify-center">
          <div
            className={`h-1 w-8 bg-black transition ease-in-out transform ${
              active === "men" ? "translate-x-12" : "-translate-x-7"
            } `}
          />
        </div>
        <div className="mt-2">
          <Rows label="Sale" toggleOpenCategory={toggleCategoryOpen} />
        </div>
      </div>
      <div
        className={`absolute top-0 bg-white w-screen max-w-md h-full z-50 translate-x-0 duration-300 ease-in-out transition-all transform ${
          openCategory ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <CategoryDetail toggleCategoryOpen={toggleCategoryOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
