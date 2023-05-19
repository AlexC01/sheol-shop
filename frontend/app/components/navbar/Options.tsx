"use client";

interface OptionsProps {
  toggleCategoryOpen: () => void;
  toggleCategoryClose: () => void;
  toggleCategory: (cat: string) => void;
}

const Options: React.FC<OptionsProps> = ({ toggleCategoryOpen, toggleCategoryClose, toggleCategory }) => {
  return (
    <div className="hidden lg:flex h-20 justify-center items-center relative">
      <ul className="flex items-center gap-6 text-sm h-20">
        <div
          className="h-full flex items-center justify-center group cursor-pointer"
          onMouseEnter={() => {
            toggleCategory("women");
            toggleCategoryOpen();
          }}
          onMouseLeave={() => toggleCategoryClose()}
        >
          <li className="text-xl text-primary transition  cursor-pointer group-hover:underline decoration-primary/50">
            Women
          </li>
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
        </div>
      </ul>
    </div>
  );
};

export default Options;
