// errorHandler.ts
import { Request, Response } from 'express';
import config from '../config/config';

export const errorHandler = (
	err: { message: string; stack: string },
	req: Request,
	res: Response
) => {
	const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
	res.status(statusCode).json({
		message: err.message,
		stack: config.nodeEnv === 'production' ? null : err.stack,
		statusCode,
	});
};