import { useState } from "react";

const Customize = () => {
  const [inputTxt, setInputTxt] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = "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";

  const query = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: inputTxt }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.blob();
      return result;
    } catch (error) {
      console.error(error);
      alert("Failed to fetch image from the API");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await query();
    if (response) {
      const objectURL = URL.createObjectURL(response);
      setImageSrc(objectURL);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'generated-design.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col mt-12 sm:mt-6 md:mt-[80px] lg:mt-[86px] max-w-6xl mx-auto px-4">
      <div className={`flex flex-col-reverse md:flex-row w-full`}>
        {/* Form Section */}
        <div className={`flex-1 bg-white text-black px-8 py-10 rounded-lg shadow-lg w-full`}>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center">
            Customize Your Design
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col mb-6 items-center">
            <input
              type="text"
              value={inputTxt}
              onChange={(e) => setInputTxt(e.target.value)}
              placeholder="Enter your design description"
              className="border border-gray-300 p-4 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
              required
            />
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-xl shadow-lg w-72 hover:bg-stone-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Image"}
            </button>
          </form>

          {imageSrc && (
            <div className="flex flex-col items-center mt-4">
              <p className="text-lg text-center mb-2">
                Your design has been generated!
              </p>
              <p className="text-lg text-center mb-2">
                You can download the design and talk to the designer directly.
              </p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={handleDownload}
                  className="bg-black text-md text-white py-2 px-4 rounded-md shadow-lg hover:bg-stone-700 transition duration-300"
                >
                  Download Image
                </button>
                <a
                  href="https://wa.me/7304147079"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-md text-white py-2 px-4 rounded-md shadow-lg hover:bg-stone-700 transition duration-300"
                >
                  Talk to Designer
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Image Section */}
        {imageSrc && (
          <div className="flex-1 flex items-center justify-center mt-6 md:mt-0">
            <img
              src={imageSrc}
              alt="Generated Design"
              className="h-auto w-full max-h-[550px] md:w-auto md:max-h-[550px] rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Customize;
