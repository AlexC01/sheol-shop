"use client";

import { Category } from "@/app/models/Category";
import Container from "../container/Container";
import Image from "next/image";

interface NavbarCategoriesProps {
  categories: Category[];
  system: "men" | "women";
}

const NavbarCategories: React.FC<NavbarCategoriesProps> = ({ categories, system }) => {
  return (
    <div className="max-w-[1520px] mx-auto xl:px-10 md:px-10 sm:px-2 px-4">
      <div className="grid xl:grid-cols-2 py-5 gap-3">
        <div className="flex flex-wrap justify-center xl:justify-start gap-7">
          {categories.map(category => (
            <div key={category.id} className="mb-5">
              <ul>
                <li className="font-semibold hover:underline cursor-pointer">{category.name}</li>
                <div className="mt-1">
                  {category.subcategories.map(subcategory => (
                    <li key={subcategory.id} className="hover:underline cursor-pointer mt-1.5">
                      {subcategory.name}
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          ))}
        </div>
        <div className="hidden xl:grid grid-cols-3 gap-5">
          <div className="flex justify-start items-center flex-col group cursor-pointer">
            <Image src={`/images/sales-${system}.webp`} width={200} height={200} alt={`Sales for ${system}`} />
            <ul className="text-center mt-4">
              <li className="font-semibold group-hover:underline">Sales and Deals</li>
              <li className="mt-1.5 group-hover:underline">Shop now</li>
            </ul>
          </div>
          <div className="flex justify-start items-center flex-col group cursor-pointer">
            <Image
              src={`/images/arrivals-${system}.webp`}
              width={200}
              height={200}
              alt={`New Arrivals for ${system}`}
            />
            <ul className="text-center mt-4">
              <li className="font-semibold group-hover:underline">New Arrivals</li>
              <li className="mt-1.5 group-hover:underline">Shop now</li>
            </ul>
          </div>
          <div className="flex justify-start items-center flex-col group cursor-pointer">
            <Image src={`/images/featured-${system}.webp`} width={200} height={200} alt={`Featured for ${system}`} />
            <ul className="text-center mt-4">
              <li className="font-semibold group-hover:underline">Featured</li>
              <li className="mt-1.5 group-hover:underline">Shop now</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarCategories;
