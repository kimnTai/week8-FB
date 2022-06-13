"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = require("dotenv");
var _a = (0, dotenv_1.config)().parsed, DATABASE = _a.DATABASE, DATABASE_PASSWORD = _a.DATABASE_PASSWORD;
var url = DATABASE.replace("<password>", DATABASE_PASSWORD);
mongoose_1.default.connect(url).then(function () { return console.log("資料庫連線中"); });
