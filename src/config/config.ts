import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    mongoUri?: string;
    jwtSecret?: string | undefined;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/nolly-watch',
    jwtSecret: process.env.JWT_SECRET || '12345abcde',
};

export default config;