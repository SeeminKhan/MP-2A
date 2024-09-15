import React from 'react';

// Import images
import celeb1 from "./act1.jpeg";
import celeb2 from "./act2.jpg";
import celeb3 from "./act3.jpg";
import celeb4 from "./act4.jpg";

const Skcircle = () => {
  // Define actor details here
  const actors = [
    { name: "GAUHAR KHAN", image: celeb4 },
    { name: "ANITA HASNANDANI", image: celeb2 },
    { name: "ANAM MIRZA", image: celeb3},
    { name: "CLIENT", image: celeb1},
  ];

  // Email address to pre-fill
  const emailAddress = "example@example.com";

  return (
    <div className="mt-[92px] min-h-screen px-4 lg:px-20">
      <div className="container mx-auto">
        {/* Actor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {actors.map((actor, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={actor.image}
                alt={actor.name}
                className="w-full h-90 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{actor.name}</h3>
                <p className="text-gray-600">{actor.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Paragraph and Email Button */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            If you would like to reach out to us, please feel free to send us an email.
          </p>
          <a
            href={`mailto:${emailAddress}`}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Open Mail
          </a>
        </div>
      </div>
    </div>
  );
}

export default Skcircle;
