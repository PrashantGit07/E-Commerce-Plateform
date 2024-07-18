import mongoose from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
    }
}, { timestamp: true })

export default mongoose.model('user', UserSchema)