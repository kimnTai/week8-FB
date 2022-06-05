import express from "express";
import * as Controller from "../controller";
import { middleware } from "../middleware";
import Utils from "../utils";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", Controller.User.getUsers);

router.post("/sign_up", middleware.checkSignUp, Controller.User.signUp);

router.post("/sign_in", middleware.checkSignIn, Controller.User.signIn);

router.post("/updatePassword", middleware.checkUpdatePassword, Controller.User.updatePassword);

router.get("/profile", middleware.isAuth, Controller.User.getProfile);

router.patch("/profile", middleware.isAuth, Controller.User.updateProfile);

router.get("/getLikeList", middleware.isAuth, Controller.User.getLikeList);

router.post("/:followingId/follow", middleware.isAuth, Controller.User.addFollow);

router.delete("/:followingId/unfollow", middleware.isAuth, Controller.User.removeFollow);

router.get("/following", middleware.isAuth, Controller.User.getFollowList);

export default router;
