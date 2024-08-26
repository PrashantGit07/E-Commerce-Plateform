import express from "express"
import { AddToCart, deleteCartItem, GetCartItems } from "../controller/CartController.js"

const router = express.Router()

//routes

router.post("/add-to-cart", AddToCart)

router.get("/cartItems/:userId", GetCartItems)

router.delete("/remove-from-cart", deleteCartItem)

export default router