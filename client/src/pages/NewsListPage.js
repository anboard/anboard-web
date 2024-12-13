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
const client_1 = require("../sanity/client");
require("../styles/newsList.css");
const NewsListPage = () => {
    const [news, setNews] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchNews = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch("http://localhost:4422/api/newslist");
            // const response = await fetch("/api/newslist");
            const { newsList } = yield response.json();
            console.log("smth is fuccing w me");
            setNews(newsList);
        });
        fetchNews();
    }, []);
    console.log(news);
    return (<div className="alt-bg-white">
      <div className="banner">
        <div className="container ">
          <h1>News</h1>
        </div>
      </div>

      <div className="news-list container">
        <h3>Latest News</h3>
        <div className="news-list-wrapper">
          {news.map((item) => (<div key={item._id} className="news-card">
              {item.image ? (<div className="card-image-wrapper">
                  <img src={(0, client_1.urlFor)(item.image)
                    .width(400)
                    .height(300)
                    .fit("crop")
                    .url()} // Generate the URL
             alt={item.title} className="news-list-image"/>
                </div>) : (<div className="card-image-wrapper">
                  <img src="/client/default-image.webp" alt={item.title} className="news-list-image"/>
                </div>)}

              <div className="news-card-text">
                <div className="card-text-head">
                  <h2 className="news-card-title">{item.title}</h2>
                  <small>
                    Published on {" "}
                    {new Date(item.publishedAt.split("T")[0]).toDateString()}
                  </small>
                </div>

                <div className="news-card-body">
                  <div className="news-card-description">
                    {/* <PortableText value={item.body} /> */}
                    <p>{item.description}</p>
                  </div>

                  <div className="news-card-more">
                    <a href={`/news/${item.slug.current}`}>Read more</a>
                  </div>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
};
exports.default = NewsListPage;
