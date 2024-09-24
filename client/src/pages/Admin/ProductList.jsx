import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories, isLoading } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !description || !category || !quantity || !brand || stock < 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData).unwrap();

      toast.success(`${data.name} is created`);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 2) { // 2MB limit
      toast.error("File size exceeds 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error("Image upload failed. Try again.");
    }
  };

  return (
    <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] w-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-3/4 p-4 rounded-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-black">Create Product</h2>

          {imageUrl && (
            <div className="text-center mb-4">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] object-cover rounded-lg shadow-md border border-gray-300"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2 px-4 py-2 text-center cursor-pointer bg-gray-100 rounded-lg font-bold text-black">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  className="p-4 w-full border rounded-lg bg-gray-100 text-gray-800"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label htmlFor="price" className="block mb-2 text-gray-700">Price</label>
                <input
                  type="number"
                  id="price"
                  className="p-4 w-full border rounded-lg bg-gray-100 text-gray-800"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Product Price"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="quantity" className="block mb-2 text-gray-700">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  className="p-4 w-full border rounded-lg bg-gray-100 text-gray-800"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Product Quantity"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label htmlFor="brand" className="block mb-2 text-gray-700">Brand</label>
                <input
                  type="text"
                  id="brand"
                  className="p-4 w-full border rounded-lg bg-gray-100 text-gray-800"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Product Brand"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 text-gray-700">Description</label>
              <textarea
                id="description"
                className="p-4 w-full border rounded-lg bg-gray-100 text-gray-800"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product Description"
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="stock" className="block mb-2 text-gray-700">Count In Stock</label>
                <input
                  type="number"
                  id="stock"
                  className="p-4 w-full border rounded-lg bg-gray-100 text-gray-800"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  min="0"
                  placeholder="Count In Stock"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label htmlFor="category" className="block mb-2 text-gray-700">Category</label>
                {isLoading ? (
                  <p className="text-gray-700">Loading categories...</p>
                ) : (
                  <select
                    id="category"
                    className="p-4 w-full border rounded-lg bg-gray-100 text-gray-800"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`bg-black py-2 px-6 rounded-full text-lg w-full mt-8${isSubmitting ? "bg-gray-400" : "bg-black"} text-white`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
