"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var Utils = (function () {
    function Utils() {
        var _this = this;
        this.catchAsync = function (func) {
            return function (req, res, next) {
                Promise.resolve(func(req, res, next)).catch(next);
            };
        };
        this.catchAsyncRouter = function (router) {
            var _loop_1 = function (key) {
                if (["get", "post", "delete", "patch"].includes(key)) {
                    var method_1 = router[key];
                    router[key] = function (path) {
                        var callbacks = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            callbacks[_i - 1] = arguments[_i];
                        }
                        method_1.call.apply(method_1, __spreadArray([router, path], callbacks.map(function (cb) { return _this.catchAsync(cb); }), false));
                    };
                }
            };
            for (var key in router) {
                _loop_1(key);
            }
            return router;
        };
        this.checkValidator = function (param) {
            for (var _i = 0, _a = Object.entries(param); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (!value) {
                    throw new Error("欄位未填寫正確");
                }
                switch (key) {
                    case "name":
                        if (!validator_1.default.isLength(value, { min: 2 })) {
                            throw new Error("name 至少 2 個字元以上");
                        }
                        break;
                    case "sex":
                        if (value !== "male" && value !== "female") {
                            throw new Error("sex 只能是 male 或 female");
                        }
                        break;
                    case "email":
                        if (!validator_1.default.isEmail(value)) {
                            throw new Error("Email 格式不正確");
                        }
                        break;
                    case "password":
                        if (!validator_1.default.isLength(value, { min: 8 })) {
                            throw new Error("密碼需至少 8 碼以上");
                        }
                        if (validator_1.default.isAlpha(value)) {
                            throw new Error("密碼不能只有英文");
                        }
                        if (validator_1.default.isNumeric(value)) {
                            throw new Error("密碼不能只有數字");
                        }
                        if (!validator_1.default.isAlphanumeric(value)) {
                            throw new Error("密碼需至少 8 碼以上，並英數混合");
                        }
                        break;
                    case "image":
                        if (!validator_1.default.isURL(value, { protocols: ["https"] })) {
                            throw new Error("image 格式不正確");
                        }
                        break;
                    default:
                        break;
                }
            }
        };
    }
    return Utils;
}());
exports.default = new Utils();
