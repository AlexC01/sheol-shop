"use client";

interface OptionsProps {
  toggleCategoryOpen: () => void;
  toggleCategoryClose: () => void;
  toggleCategory: (cat: string) => void;
  category: string;
  categoryOpen: boolean;
}

const Options: React.FC<OptionsProps> = ({
  toggleCategoryOpen,
  toggleCategoryClose,
  toggleCategory,
  category,
  categoryOpen
}) => {
  return (
    <div className="hidden lg:flex h-20 justify-center items-center relative">
      <ul className="flex items-center gap-6 text-sm h-20">
        <div
          className="h-full flex items-center justify-center group cursor-pointer relative"
          onMouseEnter={() => {
            toggleCategory("women");
            toggleCategoryOpen();
          }}
          onMouseLeave={() => toggleCategoryClose()}
        >
          <li className="text-xl text-primary transition  cursor-pointer group-hover:underline decoration-primary/50">
            Women
          </li>
          {category === "women" && categoryOpen && (
            <div className="absolute bottom-0 border-l-[10px] border-r-[10px] border-t-[0px] border-b-[10px] border-r-transparent border-l-transparent border-t-transparent border-b-neutral-200" />
          )}
        </div>
        <div
          className="h-full flex items-center justify-center group cursor-pointer"
          onMouseEnter={() => {
            toggleCategory("men");
            toggleCategoryOpen();
          }}
          onMouseLeave={() => toggleCategoryClose()}
        >
          <li className="text-xl text-primary transition  cursor-pointer group-hover:underline decoration-primary/50">
            Men
          </li>
          {category === "men" && categoryOpen && (
            <div className="absolute bottom-0 border-l-[10px] border-r-[10px] border-t-[0px] border-b-[10px] border-r-transparent border-l-transparent border-t-transparent border-b-neutral-200" />
          )}
        </div>
      </ul>
    </div>
  );
};

export default Options;
