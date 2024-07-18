import express from "express"
import { Register } from "../controller/Register.js"

const router = express.Router()

router.post('/register', Register)
export default router