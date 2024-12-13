"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
exports.default = (0, vite_1.defineConfig)({
    root: './client',
    plugins: [(0, plugin_react_1.default)()],
    // base: '/',
    base: '/client',
    build: {
        outDir: 'build', // Same as react-scripts' output directory
    },
});
