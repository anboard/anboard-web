"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlFor = exports.client = void 0;
const client_1 = require("@sanity/client");
const image_url_1 = __importDefault(require("@sanity/image-url"));
exports.client = (0, client_1.createClient)({
    projectId: "5xv1zxx1",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
});
const builder = (0, image_url_1.default)(exports.client);
const urlFor = (source) => builder.image(source);
exports.urlFor = urlFor;
