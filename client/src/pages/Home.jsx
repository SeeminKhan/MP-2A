import  { useState, useEffect } from 'react';
import Slider1 from "../assets/slider1.jpg";
import Slider2 from "../assets/slider2.jpg";
import Slider3 from "../assets/slider3.jpg";

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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </section>

      {/* Featured Cards */}
      <section className="py-16 px-4 md:px-16">
        <h2 className="text-3xl font-semibold text-center mb-12 text-customPink">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-customPink p-8 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/300"
              alt="Feature 1"
              className="mb-6 w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-4 text-beigeWhite">Feature 1</h3>
            <p className="text-beigeWhite mb-4">Description of Feature 1.</p>
            <button className="bg-beigeWhite text-customPink py-2 px-4 rounded-full">
              Learn More
            </button>
          </div>
          {/* Card 2 */}
          <div className="bg-customPink p-8 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/300"
              alt="Feature 2"
              className="mb-6 w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-4 text-beigeWhite">Feature 2</h3>
            <p className="text-beigeWhite mb-4">Description of Feature 2.</p>
            <button className="bg-beigeWhite text-customPink py-2 px-4 rounded-full">
              Learn More
            </button>
          </div>
          {/* Card 3 */}
          <div className="bg-customPink p-8 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/300"
              alt="Feature 3"
              className="mb-6 w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-4 text-beigeWhite">Feature 3</h3>
            <p className="text-beigeWhite mb-4">Description of Feature 3.</p>
            <button className="bg-beigeWhite text-customPink py-2 px-4 rounded-full">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
