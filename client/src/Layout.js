"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Header_1 = __importDefault(require("./components/Header"));
const Footer_1 = __importDefault(require("./components/Footer"));
require("./styles/layout.css");
const Layout = ({ children }) => {
    return (<div className="layout">
    <Header_1.default />      
      <main className="main-content">{children}</main>
      <Footer_1.default />
    </div>);
};
exports.default = Layout;
