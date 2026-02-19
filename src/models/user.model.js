import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    username: {
        type: String, 
        required: true,
        unique: true,
    }, 
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    todos: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo'
        }],
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);