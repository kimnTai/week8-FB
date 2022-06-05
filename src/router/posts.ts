import express from "express";
import * as Controller from "../controller";
import Utils from "../utils";
import Middleware from "../middleware";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", Middleware.isAuth, Controller.Post.getAll);

router.get("/:postId", Middleware.isAuth, Controller.Post.getById);

router.post("/", Middleware.isAuth, Controller.Post.addOne);

router.patch("/:postId", Middleware.isAuth, Controller.Post.editOne);

router.post("/:postId/like", Middleware.isAuth, Controller.Post.addLike);

router.delete("/:postId/unlike", Middleware.isAuth, Controller.Post.deleteLike);

router.post("/:postId/comment", Middleware.isAuth, Controller.Post.addComment);

router.get("/user/:userId", Middleware.isAuth, Controller.Post.getByUserId);

export default router;
