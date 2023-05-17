"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, outline, small, icon: Icon, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${outline ? "bg-white border-primary text-black" : "bg-primary text-white"} ${
        small ? "py-2 text-sm font-light border-[1px]" : "py-3 border-2 text-md font-semibold"
      } relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-90 transition w-full`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
      {loading && <AiOutlineLoading3Quarters size={24} className="absolute right-4 top-3 animate-spin" />}
    </button>
  );
};

export default Button;
