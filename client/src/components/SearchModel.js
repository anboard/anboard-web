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
require("../styles/modal.css");
const SearchModal = () => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [userProfiles, setUserProfiles] = (0, react_1.useState)([]);
    const [query, setQuery] = (0, react_1.useState)("");
    const [filteredProfiles, setFilteredProfiles] = (0, react_1.useState)([]);
    // Fetch profiles when the modal opens
    (0, react_1.useEffect)(() => {
        const fetchProfiles = () => __awaiter(void 0, void 0, void 0, function* () {
            if (userProfiles.length === 0) {
                try {
                    const profilesResponse = yield fetch(`http://localhost:1984/api/web/members`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer a3df4b1e-7c12-4681-9b10-2f8edfdc7a54`
                        }
                    });
                    if (!profilesResponse.ok) {
                        throw new Error(`Failed to fetch profiles: ${profilesResponse.statusText}`);
                    }
                    const { members } = yield profilesResponse.json();
                    setUserProfiles(members);
                }
                catch (error) {
                    console.error("Error fetching profiles:", error.message);
                    alert("Error fetching user profiles. Please check your network connection.");
                }
            }
        });
        if (isOpen) {
            fetchProfiles();
        }
    }, [isOpen, userProfiles]);
    // Handle search input and filter profiles
    (0, react_1.useEffect)(() => {
        if (query.trim() === "") {
            setFilteredProfiles([]);
            return;
        }
        const lowerQuery = query.trim().toLowerCase();
        const results = userProfiles.filter((profile) => profile.name.toLowerCase().includes(lowerQuery) ||
            profile.upn.toLowerCase().includes(lowerQuery));
        setFilteredProfiles(results);
    }, [query, userProfiles]);
    const handleCloseModal = () => {
        setIsOpen(false);
        setQuery("");
        setFilteredProfiles([]);
    };
    const handleProfileClick = (upn) => {
        window.location.href = `/member/${upn}`;
    };
    return (<>
      <div className="search-btn" onClick={() => setIsOpen(true)}>
        <svg className="search-icon" width="30" height="30" viewBox="0 0 23 23" fill="none">
          <circle cx="9" cy="9" r="5" stroke="black" strokeWidth="2"/>
          <line x1="13" y1="13" x2="21" y2="21" stroke="black" strokeWidth="2"/>
        </svg>
      </div>

      {isOpen && (<div id="searchModal" className="modal" onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Search Members</h2>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by UPN or Name" className="search-input"/>
            <div id="suggestions" className="suggestions-container">
              {filteredProfiles.length > 0 ? (filteredProfiles.map((profile) => (<div key={profile.upn} className="suggestion" onClick={() => handleProfileClick(profile.upn)}>
                    <img src={profile.pfpUrl || "/default-avatar.png"} alt="Profile Picture" className="suggestion-img"/>
                    <div className="suggestion-info">
                      <p className="suggestion-name">{profile.name}</p>
                      <p className="suggestion-upn">UPN: {profile.upn}</p>
                    </div>
                  </div>))) : query.trim() !== "" ? (<p>Member Not Found</p>) : null}
            </div>
            <button type="button" className="search-button" onClick={() => {
                const exactMatch = userProfiles.find((profile) => profile.name.toLowerCase() === query.trim().toLowerCase() ||
                    profile.upn.toLowerCase() === query.trim().toLowerCase());
                if (exactMatch) {
                    handleProfileClick(exactMatch.upn);
                }
                else {
                    alert("Profile not found.");
                }
            }}>
              Search
            </button>
          </div>
        </div>)}
    </>);
};
exports.default = SearchModal;
