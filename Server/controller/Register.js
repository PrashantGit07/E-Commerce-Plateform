import User from '../models/User.js';
import { ComparePassword, hashPassword } from '../Helper/AuthHelper.js';
import jwt from "jsonwebtoken"
import dotnev from "dotenv"

dotnev.config()


export const Register = async (req, res) => {
    try {
        const { name, email, password, address, phone, answer } = req.body;
        if (!email || !password || !address || !phone || !name || !answer) {
            return res.status(400).send({ error: "Please enter all required fields" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ error: "User already exists", success: false });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Save the user
        const user = new User({ email, name, answer, address, phone, password: hashedPassword });
        await user.save();

        res.status(201).send({
            success: true,
            user,
            message: "User registered successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};






//Login


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // Compare password
        const match = await ComparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: "Password mismatch"
            });
        }

        // Token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: "Successfully logged in",
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role: user.role,
            },
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};





export const ForgotPassword = async (req, res) => {

    try {
        const { email, newPassword, answer } = req.body
        if (!email || !newPassword || !answer) {
            res.status(400).send({ message: "Please enter required field" })
        }

        //checking user
        const user = await User.findOne({ email, answer })
        if (!user) {
            res.status(404).send({ message: "User not found" })
        }

        //update password
        const newHashedPassword = await hashPassword(newPassword)
        await User.findByIdAndUpdate(user._id, { password: newHashedPassword })

        res.status(200).send({
            success: true,
            message: 'Password updated successfully',
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
}