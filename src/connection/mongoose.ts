import mongoose from "mongoose";
import { config, DotenvParseOutput } from "dotenv";

const { DATABASE, DATABASE_PASSWORD } = config().parsed as DotenvParseOutput;
const url = DATABASE.replace("<password>", DATABASE_PASSWORD);

mongoose.connect(url).then(() => console.log("資料庫連線中"));
