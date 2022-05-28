import express from "express";
import * as Controller from "../controller";
import { middleware } from "../middleware";
import Utils from "../utils";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", Controller.User.getUsers);

router.post("/sign_up", middleware.checkSignUp, Controller.User.signUp);

router.post("/sign_in", middleware.checkSignIn, Controller.User.signIn);

router.post("/updatePassword", middleware.checkUpdatePassword, Controller.User.updatePassword);

router.get("/profile", Controller.User.updatePassword);

router.patch("/profile", Controller.User.updatePassword);

export default router;
