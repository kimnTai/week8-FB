import { Request, Response, NextFunction } from "express";
import multer from "multer";
import validator from "validator";

class Middleware {
    /**
     * @description 圖片格式驗證
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @memberof Middleware
     */
    upload = (req: Request, res: Response, next: NextFunction) => {
        return multer({
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
        }).single("image")(req, res, next);
    };

    /**F
     * @description 使用者註冊檢查
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @memberof Middleware
     */
    checkSignUp = (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("欄位未填寫正確");
        }
        if (!validator.isEmail(email)) {
            throw new Error("Email 格式不正確");
        }
        if (!validator.isLength(password, { min: 8 })) {
            throw new Error("password 長度應至少 8 碼以上");
        }
        next();
    };

    /**
     * @description 使用者登入檢查
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @memberof Middleware
     */
    checkSignIn = (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("欄位未填寫正確");
        }
        if (!validator.isEmail(email)) {
            throw new Error("Email 格式不正確");
        }
        if (!validator.isLength(password, { min: 8 })) {
            throw new Error("password 長度應至少 8 碼以上");
        }
        next();
    };
}

const middleware = new Middleware();

export { middleware };
