import express from "express";

import { AdminAccess, VerifyToken } from "../middlewares/AuthMiddleware.js"
import formidable from "express-formidable";
import { createProductController, deleteProductController, getProductByCategory, getProductController, getSimilarProduct, getSingleProductController, productPhotoController, updateProductController } from "../controller/ProductController.js";

const router = express.Router();

//routes
router.post(
    "/create-product",
    VerifyToken,
    AdminAccess,
    formidable(),
    createProductController
);
//routes
router.put(
    "/update-product/:pid",
    VerifyToken,
    AdminAccess,
    formidable(),
    updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", VerifyToken, AdminAccess, deleteProductController);

router.get("/related-product/:pid/:cid", getSimilarProduct)

router.get("/product-category/:slug", getProductByCategory)

export default router;