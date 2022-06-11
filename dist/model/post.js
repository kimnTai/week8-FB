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
        required: [true, "貼文 UserID 未填寫"],
    },
    image: { type: String, required: [true, "貼文圖片 image 未填寫"] },
    content: { type: String, required: [true, "content 未填寫"] },
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
}, { versionKey: false, timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
postSchema.virtual("comments", {
    ref: "comment",
    foreignField: "postId",
    localField: "_id",
});
var Posts = mongoose_1.default.model("post", postSchema);
exports.default = Posts;
