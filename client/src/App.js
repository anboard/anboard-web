"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Layout_1 = __importDefault(require("./Layout"));
const NewsListPage_1 = __importDefault(require("./pages/NewsListPage"));
const EventsPage_1 = __importDefault(require("./pages/EventsPage"));
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const NewsPage_1 = __importDefault(require("./pages/NewsPage"));
const App = () => {
    return (<react_router_dom_1.BrowserRouter>
      <Layout_1.default>
        <react_router_dom_1.Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <react_router_dom_1.Route path="/news" element={<NewsListPage_1.default />}/>
          <react_router_dom_1.Route path="/news/:slug" element={<NewsPage_1.default />}/>
          <react_router_dom_1.Route path="/events" element={<EventsPage_1.default />}/>
          <react_router_dom_1.Route path="*" element={<HomePage_1.default />}/>
        </react_router_dom_1.Routes>
      </Layout_1.default>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
