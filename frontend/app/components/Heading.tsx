import React from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <p className="text-2xl font-bold">{title}</p>
      <p className="font-light text-neutral-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default Heading;
