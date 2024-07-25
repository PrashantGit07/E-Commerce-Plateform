import express from "express"
import { Login, Register } from "../controller/Register.js"
import { AdminAccess, testController, VerifyToken } from "../middlewares/AuthMiddleware.js"

const router = express.Router()

router.post('/register', Register)
router.post('/login', Login)
router.get('/test', VerifyToken, AdminAccess, testController)
export default router