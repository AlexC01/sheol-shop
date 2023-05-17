"use client";

import { MdKeyboardArrowLeft, MdArrowBackIosNew } from "react-icons/md";
import SidebarHeader from "./SidebarHeader";

interface CategoryDetailProps {
  toggleCategoryOpen: () => void;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ toggleCategoryOpen }) => {
  return (
    <div className="py-2">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <MdArrowBackIosNew onClick={toggleCategoryOpen} size={22} className="cursor-pointer" />
          </div>
          <p className="text-lg uppercase flex-auto font-semibold tracking-[3px]">Sale</p>
        </div>
      </SidebarHeader>
    </div>
  );
};

export default CategoryDetail;
