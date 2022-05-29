"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
var multer_1 = __importDefault(require("multer"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
var utils_1 = __importDefault(require("../utils"));
var Middleware = (function () {
    function Middleware() {
        var _this = this;
        this.upload = function (req, res, next) {
            return (0, multer_1.default)({
                limits: { fileSize: 10 * Math.pow(1024, 2) },
                fileFilter: function (req, file, callback) {
                    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                        callback(new Error("請上傳正確的檔案格式"));
                        return;
                    }
                    callback(null, true);
                },
            }).single("image")(req, res, next);
        };
        this.checkSignUp = function (req, res, next) {
            var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
            utils_1.default.checkValidator({ name: name, email: email, password: password });
            next();
        };
        this.checkSignIn = function (req, res, next) {
            var _a = req.body, email = _a.email, password = _a.password;
            utils_1.default.checkValidator({ email: email, password: password });
            next();
        };
        this.checkUpdatePassword = function (req, res, next) {
            var _a = req.body, userId = _a.userId, password = _a.password;
            utils_1.default.checkValidator({ userId: userId, password: password });
            _this.isAuth(req, res, next);
        };
        this.isAuth = function (req, res, next) {
            var _a;
            var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            var result = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!result.userId) {
                throw new Error("token 錯誤");
            }
            if (req.method === "GET") {
                req.body.userId = result.userId;
                return next();
            }
            var _b = req.body, userId = _b.userId, args = __rest(_b, ["userId"]);
            utils_1.default.checkValidator(__assign({ userId: userId }, args));
            if (userId !== result.userId) {
                throw new Error("token 錯誤 userId 不一致");
            }
            next();
        };
    }
    return Middleware;
}());
var middleware = new Middleware();
exports.middleware = middleware;
