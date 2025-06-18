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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const databaseConfig_1 = require("./config/databaseConfig");
dotenv_1.default.config();
const ErrorMiddleware_1 = require("./middleware/ErrorMiddleware");
const config_1 = __importDefault(require("./config/config"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const app = (0, express_1.default)();
const envPort = config_1.default.port || '3000';
const port = parseInt(String(envPort), 10);
// Define allowed CORS origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://nolly-watch.vercel.app',
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', UserRoute_1.default);
// Error handler middleware
app.use(ErrorMiddleware_1.errorHandler);
// **Ensure database connection before starting the server and seeding data**
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, databaseConfig_1.connectDB)(); // Wait for DB connection to establish
        // Start server after seeding
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("❌ Error starting the server:", error);
        process.exit(1);
    }
});
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map