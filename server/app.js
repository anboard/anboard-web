"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var node_path_1 = require("node:path");
var config_1 = require("./config");
var client_1 = require("./src/sanity/client");
// import cors from 'cors'
// import { default } from './config';
var app = (0, express_1.default)();
// const allowedOrigins = `http://localhost:4423`;
// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// };
// app.use(cors(corsOptions))
app.set("views", node_path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.static(node_path_1.default.join(__dirname, "public")));
app.use('/client', express_1.default.static(node_path_1.default.join(__dirname, 'public/client')));
// app.use('/events', express.static(path.join(__dirname, '../client/build')))
// app.use(
//   ['/events', '/news', '/obrigado', '/news/:slug'],
//   express.static(path.join(__dirname, '../client/build'), {
//       setHeaders: (res) => {
//           res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//       },
//   })
// )
app.use('/obrigado/*', express_1.default.static(node_path_1.default.join(__dirname, '../client/build'), {
    setHeaders: function (res) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    },
}));
app.get('/api/newslist', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var POSTS_QUERY, options, newsList, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                POSTS_QUERY = "*[\n      _type == \"anboard_news\"]|order(publishedAt desc)[0...12]{_id, title, slug, image, description, publishedAt}";
                options = { next: { revalidate: 30 } };
                return [4 /*yield*/, client_1.client.fetch(POSTS_QUERY, {}, options)];
            case 1:
                newsList = _a.sent();
                res.json({ newsList: newsList });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error fetching news list: ', error_1);
                res.status(500).send('Error fetching news');
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/news/:slug', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, POSTS_QUERY, options, article, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                slug = req.params.slug;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                POSTS_QUERY = "*[\n      _type == \"anboard_news\" && slug.current == \"".concat(slug, "\"]{_id, title, image, description, body, publishedAt}");
                options = { next: { revalidate: 30 } };
                return [4 /*yield*/, client_1.client.fetch(POSTS_QUERY, {}, options)];
            case 2:
                article = _a.sent();
                res.json({ article: article });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Error fetching news: ', error_2);
                res.status(500).send('Error fetching news');
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
var configuration = require('./config').default; // Import the configuration file
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var POSTS_QUERY, options, newsList, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                POSTS_QUERY = "*[\n      _type == \"anboard_news\"]|order(publishedAt desc)[0...12]{_id, title, body, publishedAt}";
                options = { next: { revalidate: 30 } };
                return [4 /*yield*/, client_1.client.fetch(POSTS_QUERY, {}, options)];
            case 1:
                newsList = _a.sent();
                res.render("index", {
                    title: "Home",
                    newsList: newsList,
                    configuration: configuration
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error fetching ANBROAD news list:", error_3);
                res
                    .status(500)
                    .render("error", { title: "Error", message: "Failed to fetch ANBROAD news" });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/about", function (req, res) {
    res.render("about", { title: "About", configuration: configuration });
});
app.get("/contact", function (req, res) {
    res.render("contact", { title: "Contact", configuration: configuration });
});
app.get("/members", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, members, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(config_1.default.API_BASE_URL, "/members"), {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(config_1.default.WEB_SERVER_API_KEY),
                        },
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch data: ".concat(response.statusText));
                }
                return [4 /*yield*/, response.json()];
            case 2:
                members = (_a.sent()).members;
                res.render("members", {
                    title: "Members",
                    members: members,
                    configuration: configuration
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error("Error fetching members:", error_4);
                res
                    .status(500)
                    .render("error", { title: "Error", message: "Failed to fetch members" });
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/member/:upn", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var upn, response, memberInfo, member, pfpUrl, id, stationData, videos, audios, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                upn = req.params.upn;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("".concat(config_1.default.API_BASE_URL, "/member/").concat(upn), {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(config_1.default.WEB_SERVER_API_KEY),
                        },
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                memberInfo = (_a.sent()).memberInfo;
                console.log(memberInfo);
                member = {
                    upn: "string",
                    name: "string",
                    date_of_birth: "string",
                    state_of_origin: "string",
                    local_government: "string",
                    post_held: "string",
                    educational_background: "string",
                    pfpUrl: "string",
                };
                pfpUrl = memberInfo.pfpUrl;
                id = memberInfo.id;
                stationData = memberInfo.stationData;
                videos = memberInfo.videos;
                audios = memberInfo.audios;
                res.render("member", {
                    title: "Member",
                    pfpUrl: pfpUrl,
                    id: id,
                    stationData: stationData,
                    videos: videos,
                    audios: audios,
                    member: {
                        upn: memberInfo.id.upn || "N/A",
                        name: memberInfo.id.name || "N/A",
                        date_of_birth: memberInfo.id.date_of_birth || "N/A",
                        state_of_origin: memberInfo.id.state_of_origin || "N/A",
                        local_government: memberInfo.id.local_government || "N/A",
                        post_held: memberInfo.id.post_held || "N/A",
                        educational_background: memberInfo.id.educational_background || "N/A",
                        pfpUrl: pfpUrl,
                    },
                    upn: upn,
                    configuration: configuration
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.log('In member/:upn: ', error_5);
                res
                    .status(500)
                    .render("error", { title: "Error", message: "Failed to fetch member ".concat(upn) });
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get("/login", function (req, res) {
    res.render("login", { title: "Log In" });
});
app.get("/signup", function (req, res) {
    res.render("signup", { title: "Sign Up" });
});
app.get(['/news', '/news/:slug', '/events'], function (req, res) {
    console.log('we get here');
    res.sendFile(node_path_1.default.join(__dirname, 'public/client/index.html'));
});
exports.default = app;
