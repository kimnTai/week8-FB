"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = exports.Users = exports.Posts = void 0;
var post_1 = require("./post");
Object.defineProperty(exports, "Posts", { enumerable: true, get: function () { return __importDefault(post_1).default; } });
var user_1 = require("./user");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var comment_1 = require("./comment");
Object.defineProperty(exports, "Comments", { enumerable: true, get: function () { return __importDefault(comment_1).default; } });
