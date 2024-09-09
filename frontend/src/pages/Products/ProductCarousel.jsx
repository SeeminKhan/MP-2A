import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

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

  return (
    <div className="relative w-full overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div>Loading...</div>
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="w-full">
          {products.map(({ image, _id, name }) => (
            <div key={_id} className="flex justify-center items-center">
              <img
                src={image}
                alt={name}
                className="w-full h-screen max-h-screen object-cover" // Responsive image
                style={{ maxHeight: '80vh' }} // Adjust height as needed
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
