import cartModel from "../models/Cart.js";

export const AddToCart = async (req, res) => {
    console.log(req.body);
    const { userId, productId, quantity, categoryId } = req.body;
    try {
        if (!userId || !productId || !quantity || !categoryId) { // Added categoryId to the validation
            return res.status(400).json({
                status: 400,
                message: "One or more required fields are missing."
            });
        }

        let cart = await cartModel.findOne({ userId });

        if (cart) {
            const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (productIndex >= 0) {
                cart.items[productIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity, categoryId });
            }
        } else {
            cart = new cartModel({ userId, items: [{ productId, quantity, categoryId }] }); // Ensure categoryId is passed
        }

        await cart.save();

        res.status(201).json({
            status: 201,
            message: "Product added to cart successfully",
            cart
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};




//get cart items

export const GetCartItems = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.params.userId }).populate('items.productId');
        if (cart) {
            res.status(200).json({
                status: 200,
                message: "Cart items fetched successfully",
                cart
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: "Cart not found"
            })
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}



//remove item form cart

export const deleteCartItem = async (req, res) => {
    const { userId, productId } = req.body
    try {
        const cart = await cartModel.findOne({ userId })

        if (cart) {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId)
            await cart.save()
            res.status(200).json({
                status: 200,
                message: "Product removed from cart successfully"
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: "Cart not found"
            })
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}