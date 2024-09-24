import Product from "./Product"; // Import the Product component

const ProductList = ({ products }) => {
  // Ensure products is an array and use fallback if not
  if (!Array.isArray(products)) {
    return <p>No products available</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
