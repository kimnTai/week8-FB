"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var commentSchema = new mongoose_1.default.Schema({
    comment: { type: String, required: [true, "comment 未填寫"] },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "貼文 UserID 未填寫"],
    },
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "post",
        required: [true, "貼文 ID 未填寫"],
    },
}, { versionKey: false, timestamps: true });
commentSchema.pre(/^find/, function (next) {
    this.populate({ path: "userId", select: "id name photo" });
    next();
});
var Comments = mongoose_1.default.model("comment", commentSchema);
exports.default = Comments;
