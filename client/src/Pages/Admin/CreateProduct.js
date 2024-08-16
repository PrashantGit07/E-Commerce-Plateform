import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [productValues, setProductValues] = useState({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const getToken = () => {
        const authData = localStorage.getItem('auth');
        return authData ? JSON.parse(authData).token : '';
    };

    const token = getToken();

    const getAllCategories = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/category/get-category", {
                headers: {
                    Authorization: `${token}`,
                }
            });
            if (response.status === 200) {
                setCategories(response.data.data);
                console.log("Categories fetched successfully");
            }
        } catch (e) {
            console.log("Error occurred: " + e.message);
        }
    }, [token]);

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    useEffect(() => {
        if (photo) {
            setPhotoPreview(URL.createObjectURL(photo));
            return () => {
                URL.revokeObjectURL(photoPreview);
            };
        }
    }, [photo]);

    return (
        <div className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Create Product</h1>

            <select
                name='category'
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='mb-4 p-2 border'
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
                        {photo ? photo.name : "Upload photo"}
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
                    {photoPreview && (
                        <img
                            src={photoPreview}
                            alt='product-photo'
                            height={"200px"}
                            className="object-cover"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
