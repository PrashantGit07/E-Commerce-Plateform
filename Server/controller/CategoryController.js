import Category from "../models/Category.js";
import slugify from "slugify";

export const CategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the name is provided
        if (!name) {
            return res.status(404).json({
                status: 404,
                error: "Name is required"
            });
        }

        // Check if the category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(409).json({
                status: 409,
                error: "Category already exists"
            });
        }

        // Create and save the new category
        const newCategory = await new Category({ name: name, slug: slugify(name) }).save();
        return res.status(201).json({
            status: 201,
            message: "Category created successfully",
            data: newCategory
        });

    } catch (e) {
        return res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            details: e.message
        });
    }
};



export const UpdateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        // Check if the name is provided
        if (!name) {
            return res.status(400).json({
                status: 400,
                error: "Name is required"
            });
        }

        // Check if the category exists
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({
                status: 404,
                error: "Category does not exist"
            });
        }

        // Update the category
        const updatedCategory = await Category.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        return res.status(200).json({
            status: 200,
            message: "Category updated successfully",
            data: updatedCategory
        });

    } catch (e) {
        return res.status(500).json({
            status: 500,
            error: e.message,
            message: "Internal Server Error"
        });
    }
};



export const getAllCategories = async (req, res) => {
    try {

        const category = await Category.find({})
        return res.status(200).json({
            status: 200,
            message: "Categories fetched successfully",
            data: category
        });

    }
    catch (e) {
        return res.status(500).json({
            status: 500,
            error: e.message,
            message: "Internal Server Error"
        });
    }
}


export const getOneCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug })
        return res.status(200).json({
            status: 200,
            message: "Category found successfully",
            data: category
        });

    }
    catch (e) {
        return res.status(500).json({
            status: 500,
            error: e.message,
            message: "Internal Server Error"
        });
    }
}




export const DeleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const deletedCategory = await Category.findByIdAndDelete(id)
        return res.status(200).json({
            status: 200,
            message: "Category deleted successfully",
            data: deletedCategory
        });
    }
    catch (e) {
        return res.status(500).json({
            status: 500,
            error: e.message,
            message: "Internal Server Error"
        });
    }
}