import express from "express"
import { AdminAccess, VerifyToken } from "../middlewares/authMiddleware.js"
import { CategoryController } from "../controller/CategoryController.js"
import { UpdateCategory } from "../controller/CategoryController.js"
import { getAllCategories } from "../controller/CategoryController.js"
import { getOneCategory } from "../controller/CategoryController.js"
import { DeleteCategory } from "../controller/CategoryController.js"

const router = express.Router()

router.post("/create-category", VerifyToken, AdminAccess, CategoryController)
router.put("/update-category/:id", VerifyToken, AdminAccess, UpdateCategory)

router.get("/get-category", getAllCategories)
router.get("/getOne-category/:slug", getOneCategory)
router.delete("/delete-category/:id", VerifyToken, AdminAccess, DeleteCategory)
export default router