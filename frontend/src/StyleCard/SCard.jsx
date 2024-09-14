import React from 'react';
// Import local images
import celeb1 from "../pages/act1.jpeg";
import celeb2 from "../pages/act2.jpg";
import celeb3 from "../pages/act3.jpg";
import celeb4 from "../pages/act4.jpg";

export default function SCard({celeb, name, product="kaftan"}) {
  return (
    <>
      {/* Typekit fonts */}
      <link rel="stylesheet" href="https://use.typekit.net/mbt4tna.css" />
      <link rel="stylesheet" href="https://use.typekit.net/kid2tin.css" />

      {/* Card container */}
      <div className="minip m-8 ml-8 mx-auto w-[300px] h-[450px] bg-[#b1bfc4] relative shadow-[0_0_5px_#B9816D] hover:shadow-lg transition-shadow">
        
        {/* Grid section */}
        <div className="mg absolute top-0 left-0 w-full h-[200px] grid grid-cols-[250px_50px] grid-rows-[100px_150px] transition-all duration-700 hover:grid-cols-[150px_150px] hover:grid-rows-[100px_300px]">
          
          {/* Colored section */}
          <div className="clr bg-[#f8f1f0]"></div>
          
          {/* Group text */}
          <div className="group font-mono uppercase text-[10px] leading-[10px] tracking-[1px] flex items-center justify-center" style={{ writingMode: 'vertical-lr' }}>
            <span className="block transform rotate-[180deg] transition-transform duration-700 hover:rotate-[270deg]">
              sharmeena Kariyaniya
            </span>
          </div>
        </div>

        {/* Avatar section */}
        <div
          className="av absolute bottom-0 right-0 w-[200px] h-[350px] bg-[#c2cab8] bg-cover bg-top transition-all duration-700 hover:w-[250px] hover:h-[400px]"
          style={{
            backgroundImage: `url(${celeb})`
          }}
        ></div>

        {/* Info section */}
        <div className="info absolute bottom-[100px] left-0 w-[160px] max-h-[100px] p-[25px] bg-[#E5AE8A] flex flex-col justify-center items-start transition-all duration-700 hover:bottom-[50px]">
          <div className="name font-['lust-sans'] font-[200] text-[25px] leading-[30px] -indent-[25px] tracking-[1px] mb-[10px] ml-[25px]">
            {name}
          </div>
          <div className="deets font-mono text-[10px] leading-[15px] uppercase tracking-[1px]">
            369 › he/him
            <br />
            {product}
          </div>
        </div>

        {/* Plot link */}
        <a
          className="plot absolute bottom-[85px] left-[85px] w-[110px] h-[30px] bg-[#2C3834] text-white font-mono uppercase text-[10px] leading-[10px] tracking-[1px] flex items-center justify-center transition-all duration-700 hover:bottom-[35px]"
          href="/"
        >
          view product →
        </a>
      </div>
    </>
  );
}