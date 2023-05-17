"use client";

import { MdArrowBackIosNew } from "react-icons/md";
import SidebarHeader from "./SidebarHeader";
import Image from "next/image";
import CategoryImage from "./CategoryImage";

interface CategoryDetailProps {
  toggleCategoryOpen: () => void;
  name: string;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ toggleCategoryOpen, name }) => {
  return (
    <div className="py-2">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <MdArrowBackIosNew onClick={toggleCategoryOpen} size={22} className="cursor-pointer" />
          </div>
          <p className="text-lg uppercase flex-auto font-semibold tracking-[3px]">{name}</p>
        </div>
      </SidebarHeader>
      <div className="mt-2">
        <section className="p-6 border-b-[1px]">
          <p className="uppercase">Recommendation</p>
          <div className="flex flex-row flex-wrap mt-5 gap-7 justify-center items-center">
            <div>
              <div className="rounded-full border-[1px] shadow-sm flex items-center">
                <Image src="/images/dress.png" width={110} height={110} alt="Dress" className="object-fit" />
              </div>
              <p className="text-center mt-2">View All</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoryDetail;
