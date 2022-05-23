import express from "express";
import * as Controller from "../controller";
import Utils from "../utils";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", Controller.Post.getPosts);

router.post("/", Controller.Post.createPosts);

router.delete("/:id", Controller.Post.deleteById);

router.patch("/:id", Controller.Post.editPosts);

export default router;
