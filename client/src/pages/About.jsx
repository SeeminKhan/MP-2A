import designerPhoto from "../images/designer.jpg"; // Update with actual path to the designer's photo

const About = () => {
  return (
    <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] w-full min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col-reverse md:flex-row md:items-start">
        {/* Designer's Photo */}
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={designerPhoto}
            alt="Fashion Designer"
            className="w-full max-w-sm h-[480px] rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Designer's Information */}
        <div className="w-full md:w-1/2 md:pl-8 flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center md:text-left">
            The Brand
          </h1>
          <p className="text-gray-700 mb-4 text-center md:text-left">
            Sharmeena Kariyaniya is a luxury, women’s ready-to-wear label
            operating from Mumbai since 2018. Strongly rooted in the now but
            with a keen eye on the future, Our brand aims in delivering twisted
            modernity, neo-luxury, supreme craftsmanship, fine tailoring and
            heterodox lifestyle. Our perspective on self-expression and freedom
            of speech is built into the fabric of the brand. We offer
            season-less, ethically produced clothing and accessories.
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center md:text-left">
            The Designer
          </h1>
          <p className="text-gray-700 mb-4 text-center md:text-left">
            Born in 1994, Sharmeena Kariyaniya is founder and creative director
            of her label. She holds a bachelor's degree in Textile and Apparel
            Designing from the SNDT university, Juhu. Since the brand initiation
            in 2018, she customised outfits for her personal clients. She has
            experience of 6 years in the Fashion industry in multiple roles and
            has a great ocean of knowledge of practical fashion. Hailing from a
            background where her dad was the second biggest leather exporter
            from Mumbai and her mom a shopaholic she instantly had established
            love for fashion at a very young age.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
