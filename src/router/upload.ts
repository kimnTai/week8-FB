import express from "express";
import * as Controller from "../controller";
import Utils from "../utils";
import { middleware } from "../middleware";

const router = Utils.catchAsyncRouter(express.Router());

router.post("/", middleware.upload, Controller.Image.getImage);

export default router;
