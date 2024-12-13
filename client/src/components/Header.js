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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../styles/header.css");
const config_1 = __importDefault(require("../config"));
const SearchModel_1 = __importDefault(require("./SearchModel"));
const Header = () => {
    const [activeDropdown, setActiveDropdown] = (0, react_1.useState)(null);
    const aboutDropdownRef = (0, react_1.useRef)(null);
    const membershipDropdownRef = (0, react_1.useRef)(null);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            var _a, _b;
            if (activeDropdown &&
                !((_a = aboutDropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)) &&
                !((_b = membershipDropdownRef.current) === null || _b === void 0 ? void 0 : _b.contains(event.target))) {
                console.log(activeDropdown);
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeDropdown]);
    const toggleDropdown = (dropdown) => {
        setActiveDropdown((current) => (current === dropdown ? null : dropdown));
    };
    return (<nav className="nav-container">
      <div className="logo-wrapper">
        {/* <img src="/logo.png" alt="" /> */}
        <img src="/client/logo.png" alt=""/>
      </div>

      <div className="nav-right-container">
        <div className="right-row-one nav-list">
          <a href="/news">News</a>
          <a href="/corporate-partners">Corporate Partners</a>
          <a href="/events">Events</a>
          <div className="login-wrapper">
            <a href={`${config_1.default.APP_LOGIN_LINK}`} className="login-btn login-big">
              Member Login
            </a>

            <a href={`${config_1.default.APP_LOGIN_LINK}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" className="login-small" viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="right-row-two nav-list">
          <a href="/">Home</a>
          <div className="dropdown-wrapper" ref={aboutDropdownRef} onClick={() => toggleDropdown("about")}>
            <p>About</p>
            <div className={`dropdown 
                ${activeDropdown !== 'membership' ? 'active-dropdown' : ''}
                 ${activeDropdown === "about" ? "show" : ""}`}>
              <div className="about-dropdown-point dropdown-point"></div>
              <ul>
                <li>
                  <a href="/#smallabout">Who we are</a>
                </li>
                <li>
                  <a href="/#smallbroadcasters">Our leaders</a>
                </li>
                <li>
                  <a href="/#">The National Executives</a>
                </li>
                <li>
                  <a href="/#">State Governors</a>
                </li>
              </ul>
            </div>
          </div>
          <a href="/contact-us">Contact Us</a>
          <div className="dropdown-wrapper" ref={membershipDropdownRef} onClick={() => toggleDropdown("membership")}>
            <p>Membership</p>
            <div className={`dropdown 
                ${activeDropdown !== 'about' ? 'active-dropdown' : ''}
                 ${activeDropdown === "membership" ? "show" : ""}`}>
              <div className="about-dropdown-point dropdown-point"></div>
              <ul>
                <li>
                  <a href="/#smallabout">ANBROAD Members</a>
                </li>
                <li>
                  <a href="/#smallbroadcasters">Benefits of Members</a>
                </li>
                <li>
                  <a href="/#">The National Executives</a>
                </li>
                <li>
                  <a href="/#">State Governors</a>
                </li>
              </ul>
            </div>
          </div>
          {/* <button className="search-btn">
          <svg
            className="search-icon"
            width="30"
            height="30"
            viewBox="0 0 23 23"
            fill="none"
          >
            <circle
              cx="9"
              cy="9"
              r="5"
              stroke="black"
              strokeWidth="2"
            ></circle>
            <line
              x1="13"
              y1="13"
              x2="21"
              y2="21"
              stroke="black"
              strokeWidth="2"
            ></line>
          </svg>
        </button> */}
      <SearchModel_1.default />
        </div>
      </div>

    </nav>);
};
exports.default = Header;
