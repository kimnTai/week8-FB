import express from "express";
import multer from "multer";
import * as Controller from "../controller";
import Utils from "../utils";

const router = Utils.catchAsyncRouter(express.Router());

const upload = multer({
    // 限制上傳檔案的大小為 10 MB
    limits: { fileSize: 10 * 1024 ** 2 },
    fileFilter: (req, file, callback) => {
        // 只接受三種圖片格式
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            callback(new Error("請上傳正確的檔案格式"));
            return;
        }
        // 若接受該檔案，呼叫 cb() 並帶入 true
        callback(null, true);
    },
});

router.post("/", upload.single("image"), Controller.Image.getImage);

export default router;
