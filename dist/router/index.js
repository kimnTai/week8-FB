"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.users = exports.posts = void 0;
var posts_1 = require("./posts");
Object.defineProperty(exports, "posts", { enumerable: true, get: function () { return __importDefault(posts_1).default; } });
var users_1 = require("./users");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
var upload_1 = require("./upload");
Object.defineProperty(exports, "upload", { enumerable: true, get: function () { return __importDefault(upload_1).default; } });
