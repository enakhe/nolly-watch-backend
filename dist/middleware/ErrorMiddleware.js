"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const config_1 = __importDefault(require("../config/config"));
const errorHandler = (err, req, res) => {
    const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: config_1.default.nodeEnv === 'production' ? null : err.stack,
        statusCode,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorMiddleware.js.map