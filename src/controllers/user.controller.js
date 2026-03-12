import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        if(!username || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existinguser = await User.findOne({ email });
        if(existinguser) {
            return res.status(409).json({ message: "User already exist" });
        }
        const newUser = await User.create({
            username: username,
            email: email,
        })
        res.status(200).json({ message: "User Created Successfull ", userId: newUser._id });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        res.status(200).json({ success: true, userId: user._id });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

export const getTodos = async (req, res) => {
    try {
        const { userId } = req.params;
        if(!userId) {
            return res.status(400).json({ message: "userId is missing" });
        }
        const user = await User.findById(userId).populate("todos");
        if(!user) {
            return res.status(404).json({ message: "Invalid User" });
        }
        res.status(200).json({
            success: true,
            todos: user.todos,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        res.json({ user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};