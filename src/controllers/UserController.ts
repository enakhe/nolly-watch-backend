import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../model/User";
import { AuthenticatedRequest } from "../middleware/AuthMiddleware";

interface LoginRequestBody {
    email: string;
    password: string;
}

export const registerUser = expressAsyncHandler(

    async (req: Request, res: Response): Promise<void> => {
        const { email, password, username, fullName } = req.body as {
            fullName: string;
            email: string;
            password: string;
            username?: string
        };

        if (!email || !password || !username || fullName) {
            res.status(400);
            throw new Error("Email and password are required");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400);
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            username
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.username,
                email: user.email,
                token: generateToken(user._id.toString())
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    }
);

export const loginUser = expressAsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body as LoginRequestBody;

        if (!email || !password) {
            res.status(404);
            throw new Error("Failed to login, wallet or public key missing");
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user.id,
                name: user.username,
                email: user.email,
                token: generateToken(user._id.toString())
            })
        } else {
            res.status(400);
            throw new Error(`Invalid credentials`);
        }
    }
);

export const getUserProfile = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {

        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error("User not authenticated");
        }
        const id = req.user._id;

        const user = await User.findById(id);

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        res.status(200).json(user);
    }
);

export const getAllUser = expressAsyncHandler(
    async (req: Request, res: Response) => {
        const users = await User.find();
        res.status(200).json(users);
    }
);

export const getUserById = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error("User not authenticated");
        }
        const id = req.user._id;

        if (!id) {
            res.status(400);
            throw new Error("User ID is required");
        }

        const user = await User.findById(id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        res.status(200).json(user);
    }
);

const generateToken = (id: string) => {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


