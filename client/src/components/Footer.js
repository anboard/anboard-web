"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../styles/footer.css");
const Footer = () => {
    return (<div className="footer">
      <div className="container footer-wrapper">
        <div className="contact-info">
          <img src="/client/logo.png" alt=""/>
          {/* <img src="/logo.png" alt="" /> */}
          <div className="address contact">
            <span className="footer-contact-title">Address: </span>
            <span>
              Yemi Sonde Media House, Yemi Sonde Crescent, Felele Express Junction, Felele, Ibadan Oyo State.
            </span>
          </div>

          <div className="phone contact">
            <span className="footer-contact-title">Phone: </span>
            <span>+234 803 496 7571, +234 704 441 1859</span>
          </div>
        </div>

        <div className="footer-nav-list">
          <div className="nav-list-group">
            <a href="/about">About</a>
            <a href="/members">Members</a>
          </div>
          <div className="nav-list-group">
            <a href="/contact">Contact</a>
            <a href="/events">Events</a>
          </div>
        </div>

        <div className="interact">
          <div className="newsletter">
            <input type="text" className="newsletter-input" placeholder="Subscribe to our newsletter"/>
            <button className="newsletter-submit">Submit</button>
          </div>

          <div className="socials">
            <div className="facebook">
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
              </svg>
            </div>
            <div className="instagram">
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
            </div>
            <div className="x-twitter">
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="foot">
        <div className="container foot-wrapper">
        <p>
          &copy; Copyright {new Date().getFullYear()} Association of National
          Broadcasters
        </p>

        <p>Privacy policy | Terms and Conditions</p>
        </div>
      </div>
    </div>);
};
exports.default = Footer;
