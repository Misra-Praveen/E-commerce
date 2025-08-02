import React, { useState } from "react";
import api from "../services/api.js";

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const categoryOptions = [
    "Electronics",
    "Clothing",
    "Books",
    "Accessories",
    "Groceries",
    "Beauty",
    "Footwear",
    "Home Appliances",
  ];

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    for (let key in form) {
      formData.append(key, form[key])
    }
    formData.append("image", image);

    const token = localStorage.getItem("token")
    try {
      const res = await api.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
         },
        
      });
      console.log("Product Created: ", res.data)
      alert("Product created successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Product creation failed.");
      console.error(err);
    }

  };
  return (
    <div className="max-w-md mx-auto mt-4 px-6 pt-6 pb-3 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-3 text-center text-purple-600 underline">Create Product</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-2"
        encType="multipart/form-data"
      >
        <label className="text-lg text-blue-600 font-semibold">Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          value={form.name}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <label className="text-lg text-blue-600 font-semibold">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={form.description}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <label className="text-lg text-blue-600 font-semibold">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={form.price}
          min={1}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <label className="text-lg text-blue-600 font-semibold">Image</label>
        <div className="flex justify-center items-center">
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-16 h-12 p-1 object-cover rounded mt-2"
          />
        )}
        </div>
        <label className="text-lg text-blue-600 font-semibold">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Select Category</option>
          {categoryOptions.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <label className="text-lg text-blue-600 font-semibold">Stock</label>
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          onChange={handleChange}
          value={form.stock}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
