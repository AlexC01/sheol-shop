"use client";

import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CategoryImage from "./CategoryImage";

interface RowsProps {
  label: string;
  toggleOpenCategory: () => void;
  changeCategory: (name: string) => void;
}

const Rows: React.FC<RowsProps> = ({ label, toggleOpenCategory, changeCategory }) => {
  return (
    <div
      onClick={() => {
        changeCategory(label);
        toggleOpenCategory();
      }}
      className="flex items-center justify-between px-6 py-3 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <CategoryImage />
        <p className="text-lg uppercase">{label}</p>
      </div>
      <MdOutlineKeyboardArrowRight size={22} />
    </div>
  );
};

export default Rows;
