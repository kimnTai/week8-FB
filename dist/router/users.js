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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Controller = __importStar(require("../controller"));
var middleware_1 = require("../middleware");
var utils_1 = __importDefault(require("../utils"));
var router = utils_1.default.catchAsyncRouter(express_1.default.Router());
router.get("/", Controller.User.getUsers);
router.post("/sign_up", middleware_1.middleware.checkSignUp, Controller.User.signUp);
router.post("/sign_in", middleware_1.middleware.checkSignIn, Controller.User.signIn);
router.post("/updatePassword", middleware_1.middleware.checkUpdatePassword, Controller.User.updatePassword);
router.get("/profile", middleware_1.middleware.isAuth, Controller.User.getProfile);
router.patch("/profile", middleware_1.middleware.isAuth, Controller.User.updateProfile);
exports.default = router;
