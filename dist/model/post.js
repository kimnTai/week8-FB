"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var postSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "貼文 ID 未填寫"],
    },
    tags: [{ type: String, required: [true, "貼文標籤 tags 未填寫"] }],
    type: { type: String, enum: ["group", "person"], required: [true, "貼文類型 type 未填寫"] },
    image: { type: String, required: [true, "貼文圖片 image 未填寫"] },
    createdAt: { type: Date, default: Date.now },
    content: { type: String, required: [true, "content 未填寫"] },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
}, { versionKey: false });
var Posts = mongoose_1.default.model("post", postSchema);
exports.default = Posts;
