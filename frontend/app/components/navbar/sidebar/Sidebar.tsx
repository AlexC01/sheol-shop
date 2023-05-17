"use client";

import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Rows from "./Rows";
import SidebarHeader from "./SidebarHeader";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [active, setActive] = useState("women");

  useEffect(() => {
    return () => {
      setActive("women");
    };
  }, [isOpen]);

  return (
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
        <Rows label="Sale" />
      </div>
    </div>
  );
};

export default Sidebar;
