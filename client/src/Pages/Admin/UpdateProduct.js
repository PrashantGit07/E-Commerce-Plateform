import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"  // Corrected import name

const UpdateProduct = () => {
    const navigate = useNavigate()
    const { slug, pid } = useParams()
    console.log("Slug is " + slug)
    const [product, setProduct] = useState({})
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [photoPreview, setPhotoPreview] = useState(null)
    const [id, setId] = useState("")
    const getToken = () => {
        const authData = localStorage.getItem('auth');
        return authData ? JSON.parse(authData).token : '';
    }
    const token = getToken()
    const getProduct = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/product/get-product/${slug}`);
            if (response.status === 200 && response.data.product) {
                console.log("Single product returned:", response.data.product);
                const product = response.data.product;
                setId(product._id)
                setProduct(product);
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setQuantity(product.quantity);
                setSelectedCategory(product.category._id);
                setShipping(product.shipping);
                setPhotoPreview(product.photo ? `data:${product.photo.contentType};base64,${Buffer.from(product.photo.data).toString('base64')}` : null);
            } else {
                console.error("Product not found");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }, [slug]);


    useEffect(() => {
        if (product) {
            setName(product.name || "");
            setDescription(product.description || "");
            setPrice(product.price || "");
            setQuantity(product.quantity || "");
            setSelectedCategory(product.category ? product.category._id : "");
            setShipping(product.shipping || false);
        }
    }, [product])


    const getAllCategories = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/category/get-category", {
                headers: {
                    Authorization: `${token}`,
                }
            })
            if (response.status === 200) {
                setCategories(response.data.data)
            }
        }
        catch (e) {
            console.log(e)
        }
    }, [token])



    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('shipping', shipping ? 'true' : 'false');
            formData.append('category', selectedCategory);
            if (photo) formData.append('photo', photo);

            const response = await axios.put(`http://localhost:8000/api/product/update-product/${id}`, formData, {
                headers: {
                    Authorization: `${token}`,
                }
            })
            if (response.status === 201) {
                toast.success("Product updated successfully"); // Show success toast
                setName("");
                setDescription("");
                setPrice("");
                setQuantity("");
                setSelectedCategory("");
                setShipping(false);
                setPhoto(null);
                setPhotoPreview(null);
                navigate("/dashboard/admin/products"); // Navigate back to products page
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/product/delete-product/${id}`, {
                headers: {
                    Authorization: `${token}`,
                }
            });
            if (response.status === 200) { // Typically successful delete returns 204
                toast.success("Product deleted successfully");
                navigate("/dashboard/admin/products"); // Redirect to products page
            } else {
                toast.error("Failed to delete product");
            }
        } catch (e) {
            console.error("Error deleting product:", e);
            toast.error("An error occurred while deleting the product");
        }
    }

    useEffect(() => {
        getProduct()
        getAllCategories()
    }, [getAllCategories, getProduct])

    useEffect(() => {
        if (photo) {
            setPhotoPreview(URL.createObjectURL(photo))
            return () => {
                URL.revokeObjectURL(photoPreview);
            };
        }
    }, [photo])
    return (
        <div className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
            <Toaster />
            <button onClick={() => navigate("/dashboard/admin/products")} className="px-6 py-3 font-semibold text-blue-700 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                Back
            </button>

            <h1 className="text-2xl font-bold mb-4">Update Product</h1>

            <select
                name='category'
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='mb-4 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
                <option value="" disabled>Select Category</option>
                {categories && categories.map(c => (
                    <option key={c._id} value={c._id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <div className="mb-4">
                <label htmlFor="photo-upload" className="block mb-2">
                    <span className="inline-block py-2 px-4 border border-gray-300 rounded-lg text-white cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out">
                        Update Photo
                    </span>
                    <input
                        id="photo-upload"
                        type='file'
                        name='photo'
                        accept='image/*'
                        hidden
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </label>
                <div>
                    {photoPreview ? (
                        <img
                            src={photoPreview}
                            alt='product-photo'
                            height={"200px"}
                            className="object-cover"
                        />

                    ) : (
                        <img
                            src={`http://localhost:8000/api/product/product-photo/${id}`}
                            alt='product-photo'
                            className="w-40 h-40 object-cover rounded-lg border border-gray-300"
                        />
                    )}
                </div>

            </div>

            <div className="mb-4">
                <input
                    type='text'
                    placeholder='Product Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <textarea
                    placeholder='Product Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                />
            </div>

            <div className="mb-4">
                <input
                    type='number'
                    placeholder='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <input
                    type='number'
                    placeholder='Quantity'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <select
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value === 'true')}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>Select Shipping Option</option>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                </select>
            </div>

            <button className="inline-block py-2 px-4 border border-gray-300 rounded-lg text-white cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out"
                onClick={handleUpdate}>Update Product</button>
            <button className="inline-block py-2 px-4 border border-gray-300 rounded-lg text-white cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out"
                onClick={handleDelete}>delete Product</button>
        </div>
    )
}

export default UpdateProduct
