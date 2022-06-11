"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: [true, "name 未填寫"] },
    sex: { type: String, enum: ["male", "female"] },
    email: { type: String, required: [true, "email 未填寫"] },
    password: { type: String, required: [true, "password 未填寫"], select: false },
    photo: { type: String, default: "https://i.imgur.com/tPmUQVM.png" },
    followers: [
        {
            _id: false,
            user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    following: [
        {
            _id: false,
            user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" },
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, { versionKey: false, timestamps: true });
var Users = mongoose_1.default.model("user", userSchema);
exports.default = Users;
