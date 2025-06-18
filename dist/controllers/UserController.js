"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUser = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, fullName } = req.body;
    if (!email || !password || !username || !fullName) {
        res.status(400);
        throw new Error("Email and password are required");
    }
    const existingUser = yield User_1.default.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield User_1.default.create({
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
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(404);
        throw new Error("Failed to login, wallet or public key missing");
    }
    const user = yield User_1.default.findOne({ email });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.username,
            email: user.email,
            token: generateToken(user._id.toString())
        });
    }
    else {
        res.status(400);
        throw new Error(`Invalid credentials`);
    }
}));
exports.getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        res.status(401);
        throw new Error("User not authenticated");
    }
    const id = req.user._id;
    const user = yield User_1.default.findById(id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
}));
exports.getAllUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    res.status(200).json(users);
}));
exports.getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        res.status(401);
        throw new Error("User not authenticated");
    }
    const id = req.user._id;
    if (!id) {
        res.status(400);
        throw new Error("User ID is required");
    }
    const user = yield User_1.default.findById(id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
}));
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
//# sourceMappingURL=UserController.js.map