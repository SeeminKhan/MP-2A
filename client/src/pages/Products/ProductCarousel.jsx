import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../images/SliderImg/slider5.jpeg";
import image2 from "../../images/SliderImg/slider4.jpeg";
import image3 from "../../images/SliderImg/slider3.jpg";

const images = [
  { src: image1, heading: 'Image 1', description: 'Description for Image 1' },
  { src: image2, heading: 'Image 2', description: 'Description for Image 2' },
  { src: image3, heading: 'Image 3', description: 'Description for Image 3' },
];

const ProductCarousel = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (sliderRef) sliderRef.slickNext();
  };

  const handlePrev = () => {
    if (sliderRef) sliderRef.slickPrev();
  };

  const handleThumbnailClick = (index) => {
    if (sliderRef) sliderRef.slickGoTo(index);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Hide default slick arrows to use custom ones
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => setCurrentIndex(newIndex),
    ref: setSliderRef, // Attach ref to slider instance
  };

  return (
    <div className="relative w-full h-screen md:h-full overflow-hidden bg-white">
      <div className="relative w-full h-full">
        {/* Slider */}
        <Slider {...settings} className="w-full h-full">
          {images.map((image, index) => (
            <div key={index} className="w-full h-screen flex justify-center items-center">
              <img
                src={image.src}
                alt={image.heading}
                className="w-full h-full object-cover" // Make sure images scale responsively
              />
            </div>
          ))}
        </Slider>

        {/* Custom Previous/Next Buttons */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex z-20">
          <button
            onClick={handlePrev}
            className="bg-white text-black p-2 md:p-3 rounded-full hover:bg-gray-200 transition"
            aria-label="Previous Slide"
          >
            &lt;
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex z-20">
          <button
            onClick={handleNext}
            className="bg-white text-black p-2 md:p-3 rounded-full hover:bg-gray-200 transition"
            aria-label="Next Slide"
          >
            &gt;
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-4 z-20">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`Slide ${index + 1} indicator`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
