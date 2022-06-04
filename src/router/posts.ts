import express from "express";
import * as Controller from "../controller";
import Utils from "../utils";
import { middleware } from "../middleware";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", middleware.isAuth, Controller.Post.getPosts);

router.post("/", middleware.isAuth, Controller.Post.createPosts);

router.delete("/:postId", Controller.Post.deleteById);

router.patch("/:postId", Controller.Post.editPosts);

router.post("/:postId/like", middleware.isAuth, Controller.Post.addLike);

router.delete("/:postId/unlike", middleware.isAuth, Controller.Post.deleteLike);

router.delete("/:postId/comment", (req, res) => {
    res.send({ status: "success", message: "comment" });
});

router.get("/user/:userId", middleware.isAuth, Controller.Post.getByUserId);

export default router;
