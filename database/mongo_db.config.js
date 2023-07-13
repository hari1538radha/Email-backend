import * as dotenv from "dotenv";
dotenv.config();

export const MongoUrl = `mongodb+srv://Hari:${process.env.MONGOPASS}@cluster0.6vwzlhz.mongodb.net/?retryWrites=true&w=majority`;
