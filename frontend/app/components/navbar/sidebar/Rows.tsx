"use client";

import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CategoryImage from "./CategoryImage";
import { Category } from "@/app/models/Category";

interface RowsProps {
  category: Category;
  toggleOpenCategory: () => void;
  changeCategory: (cat: Category) => void;
}

const Rows: React.FC<RowsProps> = ({ category, toggleOpenCategory, changeCategory }) => {
  return (
    <div
      onClick={() => {
        changeCategory(category);
        toggleOpenCategory();
      }}
      className="flex items-center justify-between px-6 py-3 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <CategoryImage imageURL={category.thumbnail} imageALT={category.description} />
        <p className="text-lg uppercase">{category.name}</p>
      </div>
      <MdOutlineKeyboardArrowRight size={22} />
    </div>
  );
};

export default Rows;
