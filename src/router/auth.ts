import express from "express";
import passport from "passport";
import Utils from "../utils";
import * as Controller from "../controller";

const router = Utils.catchAsyncRouter(express.Router());

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), Controller.Auth.loginCallback);

router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), Controller.Auth.loginCallback);

export default router;
