import express from "express";
import * as Controller from "../controller";
import Utils from "../utils";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", Controller.User.getUsers);

router.post("/", Controller.User.createUsers);

export default router;
