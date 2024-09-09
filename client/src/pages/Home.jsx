import { useState, useEffect } from 'react';
import Slider1 from "../assets/slider1.jpg";
import Slider2 from "../assets/slider2.jpg";
import Slider3 from "../assets/slider3.jpg";
import Card from './Card';
import CarImg1 from "../cardImg/card4.jpg";
import CarImg2 from "../cardImg/card2.jpg";
import CarImg3 from "../cardImg/card5.jpg";
import img1 from "../cardImg/img1.jpg";
import img2 from "../cardImg/img2.jpg";
import img3 from "../cardImg/img3.jpg";
import img4 from "../cardImg/img4.jpg";
import img5 from "../cardImg/img5.jpg";
import img6 from "../cardImg/img6.jpg";


const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: Slider1, alt: 'Slide 1' },
    { src: Slider2, alt: 'Slide 2' },
    { src: Slider3, alt: 'Slide 3' },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <div className="bg-beigeWhite text-gray-800">
      {/* Slideshow */}
      <section className="relative w-full h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ))}
      </section>

      {/* Featured Cards */}
      <section className="py-16 px-4 md:px-16">
        <h2 className="text-3xl font-semibold text-center mb-12 text-customBlack">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card src={CarImg1} />

          {/* Card 2 */}
          <Card src={CarImg2} />

          {/* Card 3 */}
          <Card src={CarImg3} />

          <Card src={img1} />

          <Card src={img2} />

          <Card src={img5} />

          <Card src={img4} />

        </div>
      </section>
    </div>
  );
};

export default HomePage;
