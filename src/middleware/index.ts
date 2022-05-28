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
        this._checkValidator({ name, email, password });
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
        this._checkValidator({ email, password });
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
        const { id, password } = req.body;
        this._checkValidator({ id, password });
        next();
    };

    /**
     * @description validator 驗證
     * @param {{ [key: string]: string }} param
     * @memberof Middleware
     */
    _checkValidator = (param: { [key: string]: string | undefined }) => {
        for (const [key, value] of Object.entries(param)) {
            if (!value) {
                throw new Error("欄位未填寫正確");
            }
            switch (key) {
                case "name":
                    if (!validator.isLength(value, { min: 2 })) {
                        throw new Error("name 至少 2 個字元以上");
                    }
                    break;
                case "email":
                    if (!validator.isEmail(value)) {
                        throw new Error("Email 格式不正確");
                    }
                    break;
                case "password":
                    if (!validator.isLength(value, { min: 8 })) {
                        throw new Error("密碼需至少 8 碼以上");
                    }
                    if (validator.isAlpha(value)) {
                        throw new Error("密碼不能只有英文");
                    }
                    if (validator.isNumeric(value)) {
                        throw new Error("密碼不能只有數字");
                    }
                    if (!validator.isAlphanumeric(value)) {
                        throw new Error("密碼需至少 8 碼以上，並英數混合");
                    }
                    break;
                default:
                    break;
            }
        }
    };
}

const middleware = new Middleware();

export { middleware };
