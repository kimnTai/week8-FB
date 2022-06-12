import express from "express";
import Utils from "../utils";

const router = Utils.catchAsyncRouter(express.Router());

router.post("/google");

router.post("/google/callback");

export default router;
