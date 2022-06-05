"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
var Model = __importStar(require("../model"));
var UsersController = (function () {
    function UsersController() {
        var _this = this;
        this.getUsers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, Model.Users.find()
                            .sort("-createdAt")
                            .limit((_a = Number(req.query.limit)) !== null && _a !== void 0 ? _a : 10)];
                    case 1:
                        result = _b.sent();
                        res.send({ status: "success", result: result });
                        return [2];
                }
            });
        }); };
        this.signUp = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name, email, originPassword, password, _result, _b, _, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, originPassword = _a.password;
                        return [4, Model.Users.findOne({ email: email })];
                    case 1:
                        if (_c.sent()) {
                            throw new Error("此 Email 已被註冊!");
                        }
                        return [4, bcryptjs_1.default.hash(originPassword, 12)];
                    case 2:
                        password = _c.sent();
                        return [4, Model.Users.create({ name: name, email: email, password: password })];
                    case 3:
                        _result = _c.sent();
                        _b = _result.toObject(), _ = _b.password, result = __rest(_b, ["password"]);
                        res.send({ status: "success", result: result });
                        return [2];
                }
            });
        }); };
        this.signIn = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, user, _b, _, result, secret, token;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4, Model.Users.findOne({ email: email }).select("+password")];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new Error("此 Email 不存在!");
                        }
                        return [4, bcryptjs_1.default.compare(password, user.password)];
                    case 2:
                        if (!(_c.sent())) {
                            throw new Error("密碼錯誤!");
                        }
                        _b = user.toObject(), _ = _b.password, result = __rest(_b, ["password"]);
                        secret = process.env.JWT_SECRET;
                        token = jsonwebtoken_1.default.sign({ userId: user._id }, secret, { expiresIn: process.env.JWT_EXPIRES_DAY });
                        res.send({ status: "success", token: token, result: result });
                        return [2];
                }
            });
        }); };
        this.updatePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, bcryptjs_1.default.hash(req.body.password, 12)];
                    case 1:
                        password = _a.sent();
                        return [4, Model.Users.findByIdAndUpdate(req.body.userId, { password: password })];
                    case 2:
                        if (!(_a.sent())) {
                            throw new Error("此 id 不存在");
                        }
                        res.send({ status: "success", message: "密碼重設成功" });
                        return [2];
                }
            });
        }); };
        this.getProfile = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Model.Users.findById(req.body.userId)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new Error("此 id 不存在");
                        }
                        res.send({ status: "success", result: result });
                        return [2];
                }
            });
        }); };
        this.updateProfile = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userId, name, sex, photo, _result, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, userId = _a.userId, name = _a.name, sex = _a.sex, photo = _a.photo;
                        return [4, Model.Users.findByIdAndUpdate(userId, { name: name, sex: sex, photo: photo })];
                    case 1:
                        _result = _b.sent();
                        if (!_result) {
                            throw new Error("此 id 不存在");
                        }
                        return [4, Model.Users.findById(userId)];
                    case 2:
                        result = _b.sent();
                        res.send({ status: "success", message: "更新成功", result: result });
                        return [2];
                }
            });
        }); };
        this.getLikeList = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Model.Posts.find({ likes: { $in: [req.body.userId] } }).populate({
                            path: "user",
                            select: "_id name",
                        })];
                    case 1:
                        result = _a.sent();
                        res.send({ status: "success", result: result });
                        return [2];
                }
            });
        }); };
        this.addFollow = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, followingId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.body.userId;
                        followingId = req.params.followingId;
                        if (userId === followingId) {
                            throw new Error("您無法追蹤自己");
                        }
                        return [4, Promise.all([
                                Model.Users.updateOne({ _id: followingId, "followers.user": { $ne: userId } }, { $push: { followers: { user: userId } } }),
                                Model.Users.updateOne({ _id: userId, "following.user": { $ne: followingId } }, { $push: { following: { user: followingId } } }),
                            ])];
                    case 1:
                        _a.sent();
                        res.send({ status: "success", message: "您已成功追蹤！" });
                        return [2];
                }
            });
        }); };
        this.removeFollow = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, followingId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.body.userId;
                        followingId = req.params.followingId;
                        if (userId === followingId) {
                            throw new Error("您無法取消追蹤自己");
                        }
                        return [4, Promise.all([
                                Model.Users.updateOne({ _id: userId }, { $pull: { following: { user: followingId } } }),
                                Model.Users.updateOne({ _id: followingId }, { $pull: { followers: { user: userId } } }),
                            ])];
                    case 1:
                        _a.sent();
                        res.send({ status: "success", message: "您已成功取消追蹤！" });
                        return [2];
                }
            });
        }); };
        this.getFollowList = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Model.Users.findById(req.body.userId).populate({
                            path: "following.user",
                            select: "name photo",
                        })];
                    case 1:
                        result = _a.sent();
                        res.send({ status: "success", result: { following: result === null || result === void 0 ? void 0 : result.following } });
                        return [2];
                }
            });
        }); };
    }
    return UsersController;
}());
exports.default = new UsersController();
