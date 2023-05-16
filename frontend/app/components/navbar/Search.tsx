"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="relative ">
      <input
        type="text"
        className="border-[1px] w-full placeholder-gray-400 md:w-auto py-2 px-8 rounded-full shadow-sm hover:shadow-md transition focus:shadow-md outline-none"
        placeholder="Black Shirt..."
      />
      <div className="absolute inset-y-0.5 left-2 rounded-r-lg py-2">
        <BiSearch size={22} />
      </div>
    </div>
  );
};

export default Search;
