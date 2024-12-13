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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const config_1 = __importDefault(require("./config"));
const client_1 = require("./sanity/client");
// import cors from 'cors'
// import { default } from './config';
const app = (0, express_1.default)();
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
app.use('/client', express_1.default.static(node_path_1.default.join(__dirname, '../client/build')));
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
    setHeaders: (res) => {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    },
}));
app.get('/api/newslist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const POSTS_QUERY = `*[
      _type == "anboard_news"]|order(publishedAt desc)[0...12]{_id, title, slug, image, description, publishedAt}`;
        const options = { next: { revalidate: 30 } };
        const newsList = yield client_1.client.fetch(POSTS_QUERY, {}, options);
        res.json({ newsList });
    }
    catch (error) {
        console.error('Error fetching news list: ', error);
        res.status(500).send('Error fetching news');
        return;
    }
}));
app.get('/api/news/:slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    try {
        const POSTS_QUERY = `*[
      _type == "anboard_news" && slug.current == "${slug}"]{_id, title, image, description, body, publishedAt}`;
        const options = { next: { revalidate: 30 } };
        const article = yield client_1.client.fetch(POSTS_QUERY, {}, options);
        res.json({ article });
    }
    catch (error) {
        console.error('Error fetching news: ', error);
        res.status(500).send('Error fetching news');
        return;
    }
}));
const configuration = require('./config').default; // Import the configuration file
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const POSTS_QUERY = `*[
      _type == "anboard_news"]|order(publishedAt desc)[0...12]{_id, title, body, publishedAt}`;
        const options = { next: { revalidate: 30 } };
        const newsList = yield client_1.client.fetch(POSTS_QUERY, {}, options);
        res.render("index", {
            title: "Home",
            newsList,
            configuration
        });
    }
    catch (error) {
        console.error("Error fetching ANBROAD news list:", error);
        res
            .status(500)
            .render("error", { title: "Error", message: "Failed to fetch ANBROAD news" });
        return;
    }
}));
app.get("/about", (req, res) => {
    res.render("about", { title: "About", configuration });
});
app.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact", configuration });
});
app.get("/members", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${config_1.default.API_BASE_URL}/members`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${config_1.default.WEB_SERVER_API_KEY}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const { members } = yield response.json();
        res.render("members", {
            title: "Members",
            members, configuration
        });
    }
    catch (error) {
        console.error("Error fetching members:", error);
        res
            .status(500)
            .render("error", { title: "Error", message: "Failed to fetch members" });
        return;
    }
}));
app.get("/member/:upn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const upn = req.params.upn;
    try {
        const response = yield fetch(`${config_1.default.API_BASE_URL}/member/${upn}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${config_1.default.WEB_SERVER_API_KEY}`,
            },
        });
        const { memberInfo } = yield response.json();
        let member = {
            upn: "string",
            name: "string",
            date_of_birth: "string",
            state_of_origin: "string",
            local_government: "string",
            post_held: "string",
            educational_background: "string",
            pfpUrl: "string",
        };
        const pfpUrl = memberInfo.pfpUrl;
        const id = memberInfo.id;
        const stationData = memberInfo.stationData;
        const videos = memberInfo.videos;
        const audios = memberInfo.audios;
        res.render("member", {
            title: "Member",
            pfpUrl,
            id,
            stationData,
            videos,
            audios,
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
            upn,
        });
    }
    catch (error) {
        res
            .status(500)
            .render("error", { title: "Error", message: `Failed to fetch member ${upn}` });
        return;
    }
}));
app.get("/login", (req, res) => {
    res.render("login", { title: "Log In" });
});
app.get("/signup", (req, res) => {
    res.render("signup", { title: "Sign Up" });
});
app.get(['/news', '/news/:slug', '/events'], (req, res) => {
    console.log('we get here');
    res.sendFile(node_path_1.default.join(__dirname, '../client/build/index.html'));
});
exports.default = app;
