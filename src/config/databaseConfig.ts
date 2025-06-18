import mongoose from 'mongoose';
import colors from 'colors';
import config from './config';

export const connectDB = async () => {
    try {
        const envMonURI = config.mongoUri || 'mongodb://localhost:27017/nolly-watch';
        const conn = await mongoose.connect(envMonURI);
        console.log(colors.red.underline(`MongoDB Connected: ${conn.connection.host}`));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};