import mongoose from "mongoose";

const { DATABASE, DATABASE_PASSWORD } = process.env;
const url = DATABASE?.replace("<password>", <string>DATABASE_PASSWORD) as string;

mongoose.connect(url).then(() => console.log("資料庫連線中"));
