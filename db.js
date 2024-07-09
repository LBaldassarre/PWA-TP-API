import { connect } from "mongoose";
import { config } from 'dotenv';

config();

const DB_URI = process.env.DB_URI

connect(DB_URI, {})
    .then(() => console.log(`MongoDB connected`))
    .catch((err) => console.error(err.message));