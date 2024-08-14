import React from 'react';

const InputCategory = ({ handleSubmit, value, setValue, isEditing, handleCancel }) => {
    return (
        <div className="flex justify-center my-6">
            <form
                onSubmit={handleSubmit}
                className={`w-full max-w-sm p-6 rounded-lg shadow-md ${isEditing ? 'bg-yellow-100' : 'bg-white'
                    }`}
            >
                <div className="mb-4">
                    <label
                        className={`block text-sm font-bold mb-2 ${isEditing ? 'text-yellow-700' : 'text-gray-700'
                            }`}
                        htmlFor="category"
                    >
                        {isEditing ? 'Edit Category' : 'Add Category'}
                    </label>
                    <input
                        id="category"
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Category name"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out ${isEditing
                            ? ' bg-cyan-800 hover:bg-blue-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                    >
                        {isEditing ? 'Update' : 'Add'}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out ml-2"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default InputCategory;
