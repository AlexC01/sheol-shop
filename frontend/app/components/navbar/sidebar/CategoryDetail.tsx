"use client";

import { MdArrowBackIosNew } from "react-icons/md";
import SidebarHeader from "./SidebarHeader";
import Image from "next/image";
import CategoryImage from "./CategoryImage";
import { Category } from "@/app/models/Category";
import CategoryDetailImage from "./CategoryDetailImage";

interface CategoryDetailProps {
  toggleCategoryOpen: () => void;
  category: Category;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ toggleCategoryOpen, category }) => {
  return (
    <div className="py-2">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <MdArrowBackIosNew onClick={toggleCategoryOpen} size={22} className="cursor-pointer" />
          </div>
          <p className="text-lg uppercase flex-auto font-semibold tracking-[3px]">{category.name}</p>
        </div>
      </SidebarHeader>
      <div className="mt-2">
        <section className="p-6 border-b-[1px]">
          <p className="uppercase">Recommendation</p>
          <div className="flex flex-row flex-wrap mt-5 gap-7 justify-center items-center">
            <CategoryDetailImage label="View All" imageURL={category.thumbnail} imageALT={category.name} />
            {category.subcategories.length > 2 && (
              <>
                <CategoryDetailImage
                  label="New In"
                  imageURL={category.subcategories[0].thumbnail}
                  imageALT={category.name}
                />
                <CategoryDetailImage
                  label="Sales & Deals"
                  imageURL={category.subcategories[1].thumbnail}
                  imageALT={category.name}
                />
              </>
            )}
          </div>
        </section>
      </div>
      <div className="mt-2">
        <section className="p-6 border-b-[1px]">
          <p className="uppercase">Shop By Category</p>
          <div className="mt-5 gap-7 flex justify-center md:justify-start items-start flex-row flex-wrap">
            {category.subcategories.map(subcategory => (
              <CategoryDetailImage
                key={subcategory.id}
                label={subcategory.name}
                imageURL={subcategory.thumbnail}
                imageALT={subcategory.name}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoryDetail;
