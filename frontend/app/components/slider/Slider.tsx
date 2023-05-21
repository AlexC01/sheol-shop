"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface SliderProps {
  images: { url: string; route: "" }[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const Slider: React.FC<SliderProps> = ({ images, autoSlide = true, autoSlideInterval = 4000 }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr(curr => (curr === 0 ? images.length - 1 : curr - 1));

  const next = () => setCurr(curr => (curr === images.length - 1 ? 0 : curr + 1));

  const jump = (index: number) => setCurr(index);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            alt="Slider Image"
            width={1400}
            height={600}
            className="object-fill aspect-[21/8] cursor-pointer"
            src={image.url}
            priority
          />
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 p-1 md:p-2 flex items-center justify-center rounded-full shadow bg-white/80 text-gray-800 hover:bg-white transition ease-linear"
      >
        <BsChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        className="p-1 md:p-2 absolute top-1/2 right-2 flex items-center justify-center rounded-full shadow bg-white/80 text-gray-800 hover:bg-white transition ease-linear"
      >
        <BsChevronRight size={16} />
      </button>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, index) => (
            <div
              onClick={() => jump(index)}
              key={index}
              className={`transition-all cursor-pointer w-3 h-3 bg-white rounded-full ${
                curr === index ? "p-1 md:p-2" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
