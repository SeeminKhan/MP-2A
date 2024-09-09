const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative flex justify-center items-center">
        <div className="w-24 h-24 border-t-4 border-gray-500 border-solid border-opacity-60 rounded-full animate-spin"></div>
        <div className="absolute flex justify-center items-center">
          <div className="w-16 h-16 border-t-4 border-black border-solid border-opacity-50 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
