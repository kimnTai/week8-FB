import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import "./connection";
import "./model";
import * as Router from "./router";
import Exception from "./exception";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use("/posts", Router.posts);
app.use("/users", Router.users);
app.use("/upload", Router.upload);
app.use("/auth", Router.auth);

app.use(Exception.notFindRoute);
app.use(Exception.catchCustomError);

app.listen(config().parsed?.PORT, () => console.log("伺服器啟動中"));
