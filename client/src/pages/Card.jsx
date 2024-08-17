export default function Card({src}) {
    return (
        <div>
            <div className="bg-white text-blue p-8 rounded-lg shadow-md">
            <img
              src={src}
              className="mb-6 w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-4 text-beigeWhite">Feature 1</h3>
            <p className="text-beigeWhite mb-4">Description of Feature 1.</p>
            <button className="bg-beigeWhite text-customPink py-2 px-4 rounded-full">
              Learn More
            </button>
          </div>
        </div>
    );
}