import Image from "next/image";

const CategoryImage = () => {
  return (
    <div className="h-20 w-20 rounded-full border-[1px] shadow-sm flex items-center justify-center">
      <Image src="/images/dress.png" width={120} height={120} alt="Dress" className="object-fit" />
    </div>
  );
};

export default CategoryImage;
