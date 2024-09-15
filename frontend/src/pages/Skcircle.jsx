import React from "react";

// Import images
import celeb1 from "../images/act1.jpeg";
import celeb2 from "../images/act2.jpg";
import celeb3 from "../images/act3.jpg";
import celeb4 from "../images/act4.jpg";

const Skcircle = () => {
  // Define actor details here
  const actors = [
    { name: "GAUHAR KHAN", image: celeb4 },
    { name: "ANITA HASNANDANI", image: celeb2 },
    { name: "ANAM MIRZA", image: celeb3 },
    { name: "CLIENT", image: celeb1 },
  ];

  // Email address to pre-fill
  const emailAddress = "example@example.com";

  return (
    <div className="mt-[92px] min-h-screen px-4 lg:px-20">
      <div className="container mx-auto">
        {/* Actor Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-5 lg:mb-10">
          {actors.map((actor, index) => (
            <div key={index} className="bg-white shadow-lg overflow-hidden">
              <img
                src={actor.image}
                alt={actor.name}
                className="w-full h-70 object-cover"
              />
              <div className="p-3">
                <h3 className="text-xl font-semibold mb-1">{actor.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Paragraph and Email Button */}
        <div className="text-center">
          <p className="text-lg font-medium text-black mb-6">
            Through SK Circle, we allow customers to resell their pre-loved SK
            items, offering a solution to extend the life cycle of our products.
            We can, in that way, reduce the need for placing new items on the
            market and avoid using resources beyond their capacity. We encourage
            you to prolong the use of your garment by placing it on our website
            once you no longer want to wear it. Get in touch with us to learn
            more.
          </p>
          <a
            href={`mailto:${emailAddress}`}
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-stone-600 transition duration-300"
          >
            Open Mail
          </a>
        </div>
      </div>
    </div>
  );
};

export default Skcircle;
