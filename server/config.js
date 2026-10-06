import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'nethmi_hardware_secret_key_2026';
export const PORT = process.env.PORT || 5001;
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
