import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import celeb1 from "../pages/act1.jpeg";
import celeb2 from "../pages/act2.jpg";
import celeb3 from "../pages/act3.jpg";
import celeb4 from "../pages/act4.jpg";

const images = [
  { src: celeb1, type: 'Anita Hasnandani', heading: 'Anita Hasnandani', description: 'Anita Hasnandani is known for her roles in various television dramas and Bollywood movies.' },
  { src: celeb2, type: 'Anam Mirza', heading: 'Anam Mirza', description: 'Anam Mirza, a prominent figure in the fashion industry, is renowned for her exquisite taste and style.' },
  { src: celeb3, type: 'Gauhar Khan', heading: 'Gauhar Khan', description: 'Gauhar Khan, an accomplished actress and model, has made a mark in both television and films.' },
  { src: celeb4, type: 'Client', heading: 'Client', description: 'Our client is someone who values high-quality and stylish fashion, always looking for the latest trends.' },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black m-4">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 w-full h-full flex justify-center items-center">
          <Transition
            show={true}
            enter="transition-opacity duration-700 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-700 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].type}
              className="w-full h-full object-cover"
            />
          </Transition>
          <div className="absolute top-1/4 left-8 text-center text-white max-w-lg">
            <div className="text-5xl font-bold mb-2">{images[currentIndex].heading}</div>
            <p className="mb-4 text-sm">
              {images[currentIndex].description}
            </p>
            <button className="bg-white text-black px-4 py-2 font-medium rounded hover:bg-gray-200 transition">SEE MORE</button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-16 h-24 cursor-pointer transform transition-transform duration-300 ${index === currentIndex ? 'border-2 border-white' : ''}`}
              onClick={() => handleThumbnailClick(index)}
              role="button"
              aria-label={`Slide ${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.type}
                className="w-full h-full object-cover rounded-xl shadow-md hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col space-y-4">
          <button
            onClick={handlePrev}
            className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition"
            aria-label="Previous Slide"
          >
            &lt;
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-4">
          <button
            onClick={handleNext}
            className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition"
            aria-label="Next Slide"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`Slide ${index + 1} indicator`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;