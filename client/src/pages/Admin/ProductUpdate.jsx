import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData, isLoading: isLoadingProduct } = useGetProductByIdQuery(params._id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id || "");
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !description || !category || !quantity || !brand || !stock) {
      toast.error("Please fill all fields.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      await updateProduct({ productId: params._id, formData }).unwrap();

      toast.success("Product successfully updated", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.error(err);
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;

      const data = await deleteProduct(params._id).unwrap();
      toast.success(`${data.name} is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading product details...</div>
      </div>
    );
  }

  return (
    <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] p-4 md:p-8 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-4 md:p-8">
        {/* <AdminMenu /> */}
        <div className="md:w-3/4">
          <h2 className="text-xl font-semibold mb-4">Update / Delete Product</h2>

          {image && (
            <div className="text-center mb-4">
              <img
                src={image}
                alt="product"
                className="block mx-auto w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-bold text-center cursor-pointer p-4 bg-gray-200 rounded-lg shadow-md">
              {image ? "Change image" : "Upload image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mb-4">
              <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
                <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-gray-200 text-gray-800"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="w-full md:w-1/2 md:pl-4">
                <label htmlFor="price" className="block mb-2 text-gray-700">Price</label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-gray-200 text-gray-800"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap mb-4">
              <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
                <label htmlFor="quantity" className="block mb-2 text-gray-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="p-4 w-full border rounded-lg bg-gray-200 text-gray-800"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <label htmlFor="brand" className="block mb-2 text-gray-700">Brand</label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-gray-200 text-gray-800"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="description" className="block mb-2 text-gray-700">Description</label>
            <textarea
              className="p-4 w-full border rounded-lg bg-gray-200 text-gray-800"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex flex-wrap mb-4">
              <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
                <label htmlFor="countInStock" className="block mb-2 text-gray-700">Count In Stock</label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-gray-200 text-gray-800"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="w-full md:w-1/2 md:pl-4">
                <label htmlFor="category" className="block mb-2 text-gray-700">Category</label>
                <select
                  className="p-4 w-full border rounded-lg bg-gray-200 text-gray-800"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="py-2 px-6 rounded-lg text-lg font-bold bg-green-600 text-white shadow-md hover:bg-green-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-2 px-6 rounded-lg text-lg font-bold bg-red-600 text-white shadow-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
