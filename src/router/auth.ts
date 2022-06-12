import express from "express";
import Utils from "../utils";
import * as Controller from "../controller";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/google", Controller.Auth.googleLogin);

router.get("/google/callback", Controller.Auth.googleCallback);

export default router;
