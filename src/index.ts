import dotenv from 'dotenv';
import express, { Application } from 'express';
import { connectDB } from './config/databaseConfig';
dotenv.config();

import { errorHandler } from './middleware/ErrorMiddleware';
import config from './config/config';
import userRoute from './routes/UserRoute';

const app: Application = express();
const envPort = config.port || '3000';
const port: number = parseInt(String(envPort), 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handler middleware
app.use(errorHandler);

app.use('/api', userRoute);

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