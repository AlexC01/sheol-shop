import Image from "next/image";

interface CategoryDetailImageProps {
  imageURL: string;
  imageALT: string;
  label: string;
}

const CategoryDetailImage: React.FC<CategoryDetailImageProps> = ({ imageALT, imageURL, label }) => {
  return (
    <div className=" flex justify-center items-center flex-col">
      <div className="rounded-full h-28 w-28 border-[1px] shadow-sm">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${imageURL}`}
          width={110}
          height={110}
          alt={imageALT}
          className="rounded-full"
        />
      </div>
      <p className="text-center mt-2 break-all max-w-[110px]">{label}</p>
    </div>
  );
};

export default CategoryDetailImage;
