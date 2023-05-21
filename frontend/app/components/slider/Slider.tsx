"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface SliderProps {
  images: string[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const Slider: React.FC<SliderProps> = ({ images, autoSlide = true, autoSlideInterval = 3000 }) => {
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
    <section className="overflow-hidden relative w-full h-full">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            alt="Slider Image"
            width={1920}
            height={600}
            className="object-fill"
            src={image}
            priority
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-2 flex items-center justify-center rounded-full shadow bg-white/80 text-gray-800 hover:bg-white transition ease-linear"
        >
          <BsChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="p-2 flex items-center justify-center rounded-full shadow bg-white/80 text-gray-800 hover:bg-white transition ease-linear"
        >
          <BsChevronRight size={20} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, index) => (
            <div
              onClick={() => jump(index)}
              key={index}
              className={`transition-all cursor-pointer w-3 h-3 bg-white rounded-full ${
                curr === index ? "p-2" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
