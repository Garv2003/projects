import { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.TOKEN_SECRET as string

declare global {
    namespace Express {
        interface Request {
            user?: InstanceType<typeof User>;
        }
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists", success: false });
            return
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log(hashedPassword, name, email)
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "Registration successful", success: true });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", success: false });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found", success: false });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid password", success: false });
            return
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
        const { _id, name, email: userEmail } = user;

        res.status(200).json({
            token,
            user: { _id, name, email: userEmail },
            message: "Login successful",
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: "Error during login", success: false });
    }
};

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user?._id)
            .select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found", success: false });
            return;
        }
        res.status(200).json({
            user,
            message: "User details fetched successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", success: false });
    }
};
