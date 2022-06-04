import express from "express";
import * as Controller from "../controller";
import Utils from "../utils";
import { middleware } from "../middleware";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", middleware.isAuth, Controller.Post.getPosts);

router.post("/", middleware.isAuth, Controller.Post.createPosts);

router.delete("/:id", Controller.Post.deleteById);

router.patch("/:id", Controller.Post.editPosts);

router.post("/:postId/like", (req, res) => {
    res.send({ status: "success", message: "like" });
});

router.delete("/:postId/unlike", (req, res) => {
    res.send({ status: "success", message: "unlike" });
});

router.delete("/:postId/comment", (req, res) => {
    res.send({ status: "success", message: "comment" });
});

router.get("/user/:userId", (req, res) => {
    res.send({ status: "success", message: "userId" });
});

export default router;
