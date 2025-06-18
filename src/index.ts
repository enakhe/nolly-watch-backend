import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import { connectDB } from './config/databaseConfig';
dotenv.config();

import { errorHandler } from './middleware/ErrorMiddleware';
import config from './config/config';
import userRoute from './routes/UserRoute';
import watchlistRoute from './routes/WatchlistRoute'

const app: Application = express();
const envPort = config.port || '3000';
const port: number = parseInt(String(envPort), 10);

// Define allowed CORS origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://nolly-watch.vercel.app',
];

const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoute);
app.use('/api.watchlist', watchlistRoute);

// Error handler middleware
app.use(errorHandler);

// **Ensure database connection before starting the server and seeding data**
const startServer = async () => {
    try {
        await connectDB(); // Wait for DB connection to establish

        // Start server after seeding
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error("❌ Error starting the server:", error);
        process.exit(1);
    }
};

startServer();

export default app;