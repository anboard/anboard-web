"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const client_1 = require("@sanity/client");
exports.client = (0, client_1.createClient)({
    projectId: "5xv1zxx1",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
});
