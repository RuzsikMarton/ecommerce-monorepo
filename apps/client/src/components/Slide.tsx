"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "New Arrivals: Precision in Time",
    description: "Minimal cases. Sapphire glass. Swiss movement.",
    img: "/w.jpg",
    url: "/products",
    bg: "bg-gradient-to-r from-yellow-50 to-red-50",
  },
  {
    id: 2,
    title: "Clarity in Every Frame",
    description: "Polarized lenses. Blue-light options. Ultra-light frames.",
    img: "/s.jpg",
    url: "/products",
    bg: "bg-gradient-to-r from-purple-50 to-blue-50",
  },
  {
    id: 3,
    title: "The Everyday Set",
    description: "Pair a watch with any frame and save 15%",
    img: "/ws.jpg",
    url: "/products",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slide = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden relative">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`w-screen h-full flex flex-col xl:flex-row ${slide.bg}`}
          >
            {/*text section */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-2 sm:gap-4 lg:gap-6 xl:gap-8 text-center px-4 py-4 sm:py-6 lg:py-8">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                {slide.description}
              </h2>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-2 px-3 sm:py-3 sm:px-4 cursor-pointer items-center text-sm sm:text-base">
                  Shop Now
                </button>
              </Link>
            </div>
            {/*image section */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                sizes="100%"
                className="object-cover"
                priority={current === 0}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide;
