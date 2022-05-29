import express from "express";
import * as Controller from "../controller";
import Utils from "../utils";
import { middleware } from "../middleware";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", middleware.isAuth, Controller.Post.getPosts);

router.post("/", middleware.isAuth, Controller.Post.createPosts);

router.delete("/:id", Controller.Post.deleteById);

router.patch("/:id", Controller.Post.editPosts);

export default router;
