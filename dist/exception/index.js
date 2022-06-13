"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var Exception = (function () {
    function Exception() {
        this.notFindRoute = function (req, res) {
            res.status(404).send({ status: "error", message: "無此路由資訊" });
        };
        this.catchCustomError = function (err, req, res, next) {
            var _a;
            if (err.type === "entity.parse.failed") {
                return res.status(400).send({ status: "error", message: err.type });
            }
            if (((_a = (0, dotenv_1.config)().parsed) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === "dev") {
                return res.status(400).json({ status: "error", message: err.message, err: err });
            }
            return res.status(400).json({ status: "error", message: err.message });
        };
        process.on("uncaughtException", function (error) {
            console.error("未捕獲的異常！");
            console.error(error);
            process.exit(1);
        });
        process.on("unhandledRejection", function (reason, promise) {
            console.error("未捕捉到的 rejection :", promise, "原因：", reason);
        });
    }
    return Exception;
}());
exports.default = new Exception();
