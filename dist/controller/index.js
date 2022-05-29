"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.User = exports.Post = void 0;
var posts_1 = require("./posts");
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return __importDefault(posts_1).default; } });
var users_1 = require("./users");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
var images_1 = require("./images");
Object.defineProperty(exports, "Image", { enumerable: true, get: function () { return __importDefault(images_1).default; } });
