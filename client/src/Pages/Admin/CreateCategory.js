import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputCategory from '../../Components/CategoryForm/InputCategory';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/category/create-category", { name })
            if (response.status === 200) {
                //setName("")
                getAllCategory()
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const getAllCategory = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/category/get-category');
            if (response.status === 200) {
                setCategories(response.data.data); // Accessing the categories from `data` field
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <div className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
            <div>
                <p>Add Category</p>
                <InputCategory handleSubmit={handleSubmit} value={name} setValue={setName} />
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
                    {categories?.map((c) => (
                        <tr key={c._id} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                {c.name}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                <button className="text-indigo-600 hover:text-indigo-900 font-bold">
                                    Edit
                                </button>
                                <button className="text-red-600 hover:text-red-900 font-bold ml-4">
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
