import express from "express";
import * as Controller from "../controller";
import Middleware from "../middleware";
import Utils from "../utils";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/", Controller.User.getAll);

router.post("/sign_up", Middleware.checkSignUp, Controller.User.signUp);

router.post("/sign_in", Middleware.checkSignIn, Controller.User.signIn);

router.post("/updatePassword", Middleware.checkUpdatePassword, Controller.User.updatePassword);

router.get("/profile", Middleware.isAuth, Controller.User.getProfile);

router.patch("/profile", Middleware.isAuth, Controller.User.updateProfile);

router.get("/getLikeList", Middleware.isAuth, Controller.User.getLikeList);

router.post("/:followingId/follow", Middleware.isAuth, Controller.User.addFollow);

router.delete("/:followingId/unfollow", Middleware.isAuth, Controller.User.removeFollow);

router.get("/following", Middleware.isAuth, Controller.User.getFollowList);

export default router;
