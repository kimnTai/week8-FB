import express from "express";
import * as Controller from "../controller";
import { middleware } from "../middleware";
import Utils from "../utils";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", Controller.User.getUsers);

router.post("/sign_up", middleware.checkSignUp, Controller.User.createUser);

router.post("/sign_in", Controller.User.userSignIn);

export default router;
