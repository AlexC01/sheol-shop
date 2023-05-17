"use client";

interface DrawerProps {
  isOpen: boolean;
  toggleOpen: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleOpen, children }) => {
  return (
    <main className="lg:hidden">
      {isOpen && (
        <div
          onClick={toggleOpen}
          className={`fixed z-40 inset-0 bg-neutral-800/70 opacity-100 transition-opacity duration-500 ease-in-out`}
        />
      )}
      <div
        onClick={e => e.stopPropagation()}
        className={`left-0 absolute z-50  w-screen max-w-md border-[1px] bg-white h-screen shadow-xl duration-300 ease-in-out transition-all transform ${
          isOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative w-screen max-w-md h-full overflow-y-auto overflow-x-hidden">{children}</div>
      </div>
    </main>
  );
};

export default Drawer;
