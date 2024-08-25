'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/converse.png",
  "/adidas.png",
  "/noctar.png",
];

const HomeBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 2000);

    return () => clearInterval(intervalId); 
  }, [currentIndex]);

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg rounded-lg overflow-hidden mb-8">
      <div className="mx-auto px-4 sm:px-8 py-12 flex flex-col gap-6 md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4">
            Solde !
          </h1>
          <p className="text-lg sm:text-xl text-white mb-4 font-light tracking-wide">
            Obtenez des réductions incroyables sur vos produits préférés
          </p>
          <p className="text-2xl sm:text-3xl md:text-5xl text-yellow-400 font-bold drop-shadow-lg">
            25% DE RÉDUCTION
          </p>
        </div>

        <div className="relative w-2/3 sm:w-1/2 md:w-1/3 max-w-xs mx-auto md:mx-0">
          <div className="flex justify-center items-center">
            <button onClick={prevSlide} className="text-white text-2xl absolute left-0 transform -translate-y-1/2 top-1/2 z-10">
              <FaChevronLeft />
            </button>
            <Image
              src={images[currentIndex]}
              width={300}
              height={300}
              alt="Slide Image"
              className="object-contain drop-shadow-2xl"
              priority
            />
            <button onClick={nextSlide} className="text-white text-2xl absolute right-0 transform -translate-y-1/2 top-1/2 z-10">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
