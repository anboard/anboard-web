"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("@portabletext/react");
const client_1 = require("../sanity/client");
require("../styles/news.css");
const NewsPage = () => {
    const { slug } = (0, react_router_dom_1.useParams)();
    const [content, setContent] = (0, react_1.useState)({});
    (0, react_1.useEffect)(() => {
        const fetchNews = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch(`http://localhost:4422/api/news/${slug}`);
            // const response = await fetch(`/api/news/${slug}`);
            const { article } = yield response.json();
            if (!article) {
            }
            console.log(article[0]);
            setContent(article[0]);
        });
        fetchNews();
    }, []);
    return (<div className="news-page">
      <div className="container">
        <div className="article-wrapper">
          <div className="post-header">
            {content.image ? (<img src={(0, client_1.urlFor)(content.image)
                // .width(400)
                // .height(300)
                // .fit("crop")
                .url()} // Generate the URL
         alt={content.title} className="article-head-image"/>) : (<img src="/client/default-image.webp" alt={content.title} className="article-head-image"/>)}

            <div className="header-text">
              <h1>{content.title}</h1>
              <time> on {content.publishedAt && new Date(content.publishedAt.split('T')[0]).toDateString()}</time>
            </div>
          </div>

          <div className="article-body">
          {content && <react_2.PortableText value={content.body}/>}
          </div>
        </div>
      </div>
    </div>);
};
exports.default = NewsPage;
