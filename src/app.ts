import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import "./connection";
import "./model";
import * as Router from "./router";
import { exception } from "./exception";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use("/posts", Router.posts);
app.use("/users", Router.users);
app.use("/upload", Router.upload);

app.use(exception.notFindRoute);
app.use(exception.catchCustomError);

app.listen(process.env.PORT, () => console.log("伺服器啟動中"));
