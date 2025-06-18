import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import User from '../model/User';
import { UserType } from '../types';

export interface AuthenticatedRequest extends Request {
    user?: UserType;
}

export const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (!config.jwtSecret) {
                throw new Error('JWT secret is not defined');
            }
            const decoded = jwt.verify(token, config.jwtSecret as string) as jwt.JwtPayload;
            const foundUser = await User.findOne({ _id: decoded.id });

            if (!foundUser) {
                res.status(401);
                throw new Error(`Not authorized`);
            }
            req.user = foundUser;

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error(`Not authorized`);
        }
    }

    if (!token) {
        res.status(401);
        throw new Error(`Not authorized`);
    }
});