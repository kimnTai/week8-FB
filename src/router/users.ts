import express from "express";
import * as Controller from "../controller";
import Utils from "../utils";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", Controller.User.getUsers);

router.post("/sign_up", Controller.User.createUser);

export default router;
