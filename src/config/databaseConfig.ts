import mongoose from 'mongoose';
import colors from 'colors';
import config from './config';

export const connectDB = async () => {
    try {
        const envMonURI = config.mongoUri;
        const connection = config.nodeEnv !== 'development' ? envMonURI : "mongodb://localhost:27017/memevex";

        if (!connection) {
            throw new Error('MongoDB connection string is undefined.');
        }

        const conn = await mongoose.connect(connection);
        console.log(colors.red.underline(`MongoDB Connected: ${conn.connection.host}`));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};