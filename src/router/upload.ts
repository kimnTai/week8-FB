import express from "express";
import * as Controller from "../controller";
import Utils from "../utils";
import Middleware from "../middleware";

const router = Utils.catchAsyncRouter(express.Router());

router.post("/", Middleware.upload, Middleware.isAuth, Controller.Image.getImage);

export default router;
