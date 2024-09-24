import { Link } from "react-router-dom";

import celeb1 from "../images/Atelier.jpg";
import celeb2 from "../images/atelier3.jpg";
import celeb3 from "../images/atelier5.jpg";
import celeb4 from "../images/AtelierP2.jpg";

// Sample images for the custom designs
const customDesigns = [
  { id: 1, img:celeb1, title: "Design 1" },
  { id: 2, img: celeb2, title: "Design 2" },
  { id: 3, img: celeb3, title: "Design 3" },
  { id: 4, img: celeb4, title: "Design 4" },
];

const Atelier = () => {
  return (
    <div className=" mt-[92px] bg-white text-black pb-10 px-5">
      {/* Description */}
      <div className="text-center mb-8">
        {/* <h2 className="text-4xl font-bold mb-4">Atelier</h2> */}
        <p className="text-lg max-w-2xl mx-auto">
          The Atelier is a collection where custom designs are meticulously crafted by <strong>Sharmeena Kariyaniya</strong>. Each piece is designed to reflect your individuality, blending creativity with craftsmanship to deliver bespoke fashion tailored just for you.
        </p>
      </div>

      {/* Custom Design Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {customDesigns.map((design) => (
          <div key={design.id} className="custom-card bg-white shadow-lg overflow-hidden">
            <img
              src={design.img}
              alt={design.title}
              className="w-full h-full object-cover"
            />
            {/* <div className="p-4">
              <h3 className="text-xl font-semibold text-center">{design.title}</h3>
            </div> */}
          </div>
        ))}
      </div>

      {/* WhatsApp Button */}
      <div className="text-center">
  <Link
    to="/customize"
    className="bg-black text-white py-3 px-6 rounded-full text-lg font-bold shadow-lg hover:bg-gray-800 transition duration-300"
  >
    Customize Your Own
  </Link>
</div>
    </div>
  );
};

export default Atelier;
