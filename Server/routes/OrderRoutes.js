import express from 'express';
import {
    CreateOrder,
    getOrder,
    getUserOrders,
    getAllOrders,
    confirmOrder,
    CancelOrder,
    DeleteOrderEntryByAdmin
} from '../controller/OrderController.js';
import { AdminAccess, VerifyToken } from '../middlewares/AuthMiddleware.js';
const router = express.Router();

// User routes
router.post('/create', VerifyToken, CreateOrder); // User creates an order
router.get('/user', VerifyToken, getUserOrders); // User fetches their orders
router.get('/order/:orderId', VerifyToken, getOrder); // User fetches a specific order (e.g., for detail view)

// Admin routes
router.get('/all', VerifyToken, AdminAccess, getAllOrders); // Admin fetches all orders
router.put('/confirm/:orderId', VerifyToken, AdminAccess, confirmOrder); // Admin confirms an order

router.put("/cancel/:orderId", VerifyToken, CancelOrder)
router.delete("/delete/:orderId", VerifyToken, AdminAccess, DeleteOrderEntryByAdmin)
export default router;
