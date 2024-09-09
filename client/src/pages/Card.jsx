import React from 'react';

const Card = ({src}) => {
  return (
    <div className="relative w-[350px] h-[500px] overflow-hidden">
      <div className="w-full h-full">
        <img 
          src={src} 
          alt="Spring Hue" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-8 left-8 text-white">
        <h2 className="text-2xl font-bold tracking-wider">SPRING HUE</h2>
        <button className="mt-4 px-6 py-2 bg-white text-black text-sm font-medium tracking-wider hover:bg-black hover:text-white transition-all">
          VIEW COLLECTION
        </button>
      </div>
    </div>
  );
};

export default Card;
