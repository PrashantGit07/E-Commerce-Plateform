
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import InputCategory from '../../Components/CategoryForm/InputCategory';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [categoryID, setCategoryID] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Function to retrieve the token from localStorage
    const getToken = () => {
        const authData = localStorage.getItem('auth');
        return authData ? JSON.parse(authData).token : '';
    };

    const token = getToken();

    // Fetch all categories
    const getAllCategory = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/category/get-category', {
                headers: {
                    Authorization: token,
                },
            });
            if (response.status === 200) {
                setCategories(response.data.data);
            }
        } catch (e) {
            console.log("Error fetching categories:", e);
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await handleEdit(categoryID);
            } else {
                await handleCreate();
            }
            setName("");
            setIsEditing(false);
            setCategoryID(null);
            getAllCategory();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } catch (e) {
            console.error("Something went wrong in the input form:", e.response?.data || e.message);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/category/create-category",
                { name },
                {
                    headers: {
                        Authorization: token,
                    }
                }
            );
            if (response.status === 201) {
                console.log("Category created successfully");
                getAllCategory();
            }
        } catch (e) {
            console.error("Something went wrong in the input form:", e.response?.data || e.message);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/category/update-category/${id}`,
                { name },
                {
                    headers: {
                        Authorization: token,
                    }
                }
            );
            if (response.status === 200) {
                console.log("Category updated successfully");
            }
        } catch (e) {
            console.error("Something went wrong in the input form:", e.response?.data || e.message);
        }
    };

    // Handle delete category
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/category/delete-category/${id}`, {
                headers: {
                    Authorization: token,
                }
            });
            if (response.status === 200) {
                setCategories(categories.filter(category => category._id !== id));
                console.log("Category deleted successfully");
                getAllCategory();
            }
        } catch (e) {
            console.error("Something went wrong in the input form:", e.response?.data || e.message);
        }
    };

    const handleEditCategory = (id) => {
        const categoryToEdit = categories.find(category => category._id === id);
        setName(categoryToEdit.name);
        setCategoryID(categoryToEdit._id);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };

    const handleCancel = () => {
        setName("")
        setIsEditing(false);
        setCategoryID(null)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // Fetch categories on component mount
    useEffect(() => {
        getAllCategory();
    }, [getAllCategory]);

    return (
        <div className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
            <div>
                <InputCategory handleSubmit={handleSubmit} value={name} setValue={setName} isEditing={isEditing} handleCancel={handleCancel} />
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((c) => (
                        <tr key={c._id} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                {c.name}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                <button className="text-indigo-600 hover:text-indigo-900 font-bold"
                                    onClick={() => handleEditCategory(c._id)}
                                >
                                    Edit
                                </button>
                                <button className="text-red-600 hover:text-red-900 font-bold ml-4"
                                    onClick={() => handleDelete(c._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CreateCategory;