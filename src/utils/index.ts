import { Request, Response, NextFunction, RequestHandler, Router } from "express";

class Utils {
    /**
     * @description 包裝 RequestHandler，捕捉 Promise.reject
     * @param {RequestHandler} func
     * @memberof Utils
     */
    catchAsync = (func: RequestHandler) => {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(func(req, res, next)).catch(next);
        };
    };

    /**
     * @description 使用 catchAsync 包裝 Router
     * @param {Router} router
     * @memberof Utils
     */
    catchAsyncRouter = (router: Router) => {
        for (const key in router) {
            if (["get", "post", "delete", "patch"].includes(key)) {
                const method = (<any>router)[key];
                (<any>router)[key] = (path: any, ...callbacks: any) => {
                    method.call(router, path, ...callbacks.map((cb: any) => this.catchAsync(cb)));
                };
            }
        }
        return router;
    };
}

export default new Utils();
