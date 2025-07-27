"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT || 3001,
    API_BASE_URL: process.env.API_BASE_URL,
    WEB_SERVER_API_KEY: process.env.WEB_SERVER_API_KEY,
    APP_LOGIN_URL: process.env.VITE_APP_LOGIN_LINK
};
