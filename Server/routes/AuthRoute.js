import express from "express"
import { ForgotPassword, Login, Register } from "../controller/Register.js"
import { AdminAccess, testController, VerifyToken } from "../middlewares/AuthMiddleware.js"

const router = express.Router()

router.post('/register', Register)
router.post('/login', Login)
router.get('/test', VerifyToken, AdminAccess, testController)

router.post('/forgot-password', ForgotPassword)


router.get('/user-auth', VerifyToken, (req, res) => {
    res.status(200).send({ ok: true });
})

router.get('/admin-auth', VerifyToken, (req, res) => {
    res.status(200).send({ ok: true });
})
export default router