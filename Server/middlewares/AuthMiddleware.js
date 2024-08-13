// import jwt from "jsonwebtoken"
// import dotnev from "dotenv"
// import User from "../models/User.js";

// dotnev.config();

// export const VerifyToken = async (req, res, next) => {

//     try {
//         const decode = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
//         console.log(req.headers.authorization);

//         req.user = decode
//         next()
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ error: "Internal Server Error" });
//     }
// }


// //For Admin Access

// export const AdminAccess = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.user._id)
//         if (user.role !== 1) {
//             return res.status(401).send({
//                 success: false,
//                 message: "UnAuthorized Access"
//             })
//         } else {
//             next();
//         }
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).send({ error: "Internal Server Error" });
//     }
// }


// //test controller

export const testController = (req, res) => {
    res.send("Protected route accessed successfully")
}
import JWT from "jsonwebtoken";
import User from "../models/User.js";

//Protected Routes token base
export const VerifyToken = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ message: 'Unauthorized, no token' });
        }

        // Directly use the token from the header
        const token = authHeader;

        // Verify token
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode; // Attach user information to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).send({ message: 'Invalid or expired token' });
    }
};

//admin acceess
export const AdminAccess = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};