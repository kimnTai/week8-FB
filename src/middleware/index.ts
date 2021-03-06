import { Request, Response, NextFunction } from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import { config, DotenvParseOutput } from "dotenv";
import Utils from "../utils";

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
            // 限制上傳檔案的大小為 2 MB
            limits: { fileSize: 2 * 1024 ** 2 },
            fileFilter: (req, file, callback) => {
                // 只接受三種圖片格式
                if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                    callback(new Error("圖片格式只接受 jpg、jpeg、png"));
                    return;
                }
                // 若接受該檔案，呼叫 cb() 並帶入 true
                callback(null, true);
            },
        }).single("image")(req, res, next);
    };

    /**
     * @description 使用者註冊檢查
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @memberof Middleware
     */
    checkSignUp = (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password } = req.body;
        Utils.checkValidator({ name, email, password });
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
        Utils.checkValidator({ email, password });
        next();
    };

    /**
     * @description 使用者修改密碼檢查
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @memberof Middleware
     */
    checkUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
        const { userId, password } = req.body;
        Utils.checkValidator({ userId, password });
        this.isAuth(req, res, next);
    };

    /**
     * @description token 身分驗證
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @memberof Middleware
     */
    isAuth = (req: Request, res: Response, next: NextFunction) => {
        const { JWT_SECRET } = config().parsed as DotenvParseOutput;
        const token = req.headers.authorization?.replace("Bearer ", "") as string;
        const result = jwt.verify(token, JWT_SECRET) as { userId: string };
        if (!result.userId) {
            throw new Error("token 錯誤");
        }
        if (req.method === "GET") {
            req.body.userId = result.userId;
            return next();
        }
        const { userId, ...args } = req.body;
        Utils.checkValidator({ userId, ...args });
        if (userId !== result.userId) {
            throw new Error("token 錯誤 userId 不一致");
        }
        next();
    };
}

export default new Middleware();
