import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images from the local folder
import image1 from "./SliderImg/slider1.jpg";
import image2 from "./SliderImg/slider2.jpg";
import image3 from "./SliderImg/slider3.jpg";

const ProductCarousel = () => {
  // Slider settings
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // For tablets and mobile devices
        settings: {
          arrows: false, // Hide arrows on small screens
        },
      },
    ],
  };

  // Array of image objects
  const images = [
    { src: image1, alt: "Image 1" },
    { src: image2, alt: "Image 2" },
    { src: image3, alt: "Image 3" },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Slider {...settings} className="w-full h-full">
        {images.map(({ src, alt }, index) => (
          <div key={index} className="w-full h-full flex justify-center items-center">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover" // Responsive image
              style={{ height: '100vh' }} // Ensure image height is full viewport height
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
