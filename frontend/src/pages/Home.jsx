import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Slider from "./Products/ProductCarousel";
import Product from "./Products/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";


// Import local images
import celeb1 from "./act1.jpeg";
import celeb2 from "./act2.jpg";
import celeb3 from "./act3.jpg";
import celeb4 from "./act4.jpg";
import AtelierImg from "./atelier5.jpg";
import AtelierImg2 from "./AtelierP1.jpg";
import AtelierImg3 from "./AtelierP3.jpg";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  // Dummy image URLs for the slider
  const sliderImages = [
    "https://via.placeholder.com/1500x500?text=Image+1",
    "https://via.placeholder.com/1500x500?text=Image+2",
    "https://via.placeholder.com/1500x500?text=Image+3",
  ];

  // WhatsApp number (replace with the actual WhatsApp number)
  const whatsappNumber = "7304147079";

  return (
    <>
    <div className="">
      {/* Full-screen height slider */}
      <div className="h-screen w-full">
        <Slider images={sliderImages} />
      </div>

      {/* Special Products Section */}
      <div className="flex flex-col items-center py-12">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">
          Our Special Products
        </h1>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {isError?.data?.message || isError?.error}
          </Message>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-lg w-full">
            {data.products.slice(0, 4).map((product) => (
              <div key={product._id} className="flex justify-center">
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>


     {/* {about} */}
     <div className="relative w-full md:h-[900px] bg-black overflow-hidden">
        {/* Background Image */}
        <img
          src={AtelierImg2} // Choose your preferred image here
          alt="Atelier image"
          className="object-cover w-full h-full opacity-80"
        />

        {/* Text Overlay */}
        <div className="absolute bottom-8 left-8 text-white z-10 space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
            Atelier Collection
          </h1>
          <p className="text-sm md:text-lg">
            Discover exclusive designs and craftsmanship
          </p>
        </div>

        {/* Decorative Gradient Element */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      </div>


    {/* Atelier Section */}
      <div className="relative w-full h-[600px] md:h-[900px] bg-black overflow-hidden">
        {/* Background Image */}
        <img
          src={AtelierImg3} // Choose your preferred image here
          alt="Atelier image"
          className="object-cover w-full h-full opacity-80"
        />

        {/* Text Overlay */}
        <div className="absolute bottom-8 left-8 text-white z-10 space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
            Atelier Collection
          </h1>
          <p className="text-sm md:text-lg">
            Discover exclusive designs and craftsmanship
          </p>
        </div>

        {/* Decorative Gradient Element */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      </div>



      {/* Celebs Section */}
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-4xl font-bold text-black mb-10 text-center pb-6">
          Celebs in Sharmeena Kariyaniya
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-lg w-full">
          {[celeb1, celeb2, celeb3, celeb4].map((image, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={image}
                alt={`Celeb ${index + 1}`}
                className="w-full h-96 object-cover transition-transform transform hover:scale-110"
              />
              {/* <div className="p-4 text-center">
                <h2 className="text-xl font-semibold mb-2">Celeb {index + 1}</h2>
                <p className="text-gray-600">Description for Celeb {index + 1}.</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Shop Button */}
      <div className="flex justify-center py-12">
        <a
          href="/shop"
          className="inline-block bg-black text-white py-3 px-6 border rounded-lg shadow-lg text-lg font-semibold transition-transform transform hover:scale-105"
        >
          Shop Now
        </a>
      </div>


      {/* Video Section */}
      <div className="flex flex-col items-center py-12">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">
          Watch Our Video
        </h1>

        <div className="relative w-full max-w-4xl">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video URL
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* WhatsApp Icon */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
        aria-label="Contact on WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="3x" />
      </a>
      </div>
    </>
  );
};

export default Home;
