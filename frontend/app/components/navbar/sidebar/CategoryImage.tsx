import Image from "next/image";

interface CategoryImageProps {
  imageURL: string;
  imageALT: string;
}

const CategoryImage: React.FC<CategoryImageProps> = ({ imageURL, imageALT }) => {
  return (
    <div className="h-20 w-20 rounded-full border-[1px] shadow-sm flex items-center justify-center">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/${imageURL}`}
        width={110}
        height={110}
        alt={imageALT}
        className="object-fit rounded-full"
      />
    </div>
  );
};

export default CategoryImage;
