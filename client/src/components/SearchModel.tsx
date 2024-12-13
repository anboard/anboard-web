import React, { useState, useEffect } from "react";
import "../styles/modal.css";

interface MemberProfile {
  name: string;
  upn: string;
  pfpUrl?: string;
}

const SearchModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfiles, setUserProfiles] = useState<MemberProfile[]>([]);
  const [query, setQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState<MemberProfile[]>([]);

  // Fetch profiles when the modal opens
  useEffect(() => {
    const fetchProfiles = async () => {
      if (userProfiles.length === 0) {
        try {
            const profilesResponse = await fetch(`http://localhost:1984/api/web/members`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer a3df4b1e-7c12-4681-9b10-2f8edfdc7a54`
                }
            });

            if (!profilesResponse.ok) {
                throw new Error(`Failed to fetch profiles: ${profilesResponse.statusText}`);
            }

            const {members} = await profilesResponse.json();
          setUserProfiles(members);
        } catch (error: any) {
          console.error("Error fetching profiles:", error.message);
          alert("Error fetching user profiles. Please check your network connection.");
        }
      }
    };

    if (isOpen) {
      fetchProfiles();
    }
  }, [isOpen, userProfiles]);

  // Handle search input and filter profiles
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProfiles([]);
      return;
    }

    const lowerQuery = query.trim().toLowerCase();
    const results = userProfiles.filter(
      (profile) =>
        profile.name.toLowerCase().includes(lowerQuery) ||
        profile.upn.toLowerCase().includes(lowerQuery)
    );
    setFilteredProfiles(results);
  }, [query, userProfiles]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setQuery("");
    setFilteredProfiles([]);
  };

  const handleProfileClick = (upn: string) => {
    window.location.href = `/member/${upn}`;
  };

  return (
    <>
      <div className="search-btn" onClick={() => setIsOpen(true)}>
        <svg
          className="search-icon"
          width="30"
          height="30"
          viewBox="0 0 23 23"
          fill="none"
        >
          <circle cx="9" cy="9" r="5" stroke="black" strokeWidth="2" />
          <line x1="13" y1="13" x2="21" y2="21" stroke="black" strokeWidth="2" />
        </svg>
      </div>

      {isOpen && (
        <div id="searchModal" className="modal" onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Search Members</h2>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by UPN or Name"
              className="search-input"
            />
            <div id="suggestions" className="suggestions-container">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
                  <div
                    key={profile.upn}
                    className="suggestion"
                    onClick={() => handleProfileClick(profile.upn)}
                  >
                    <img
                      src={profile.pfpUrl || "/default-avatar.png"}
                      alt="Profile Picture"
                      className="suggestion-img"
                    />
                    <div className="suggestion-info">
                      <p className="suggestion-name">{profile.name}</p>
                      <p className="suggestion-upn">UPN: {profile.upn}</p>
                    </div>
                  </div>
                ))
              ) : query.trim() !== "" ? (
                <p>Member Not Found</p>
              ) : null}
            </div>
            <button
              type="button"
              className="search-button"
              onClick={() => {
                const exactMatch = userProfiles.find(
                  (profile) =>
                    profile.name.toLowerCase() === query.trim().toLowerCase() ||
                    profile.upn.toLowerCase() === query.trim().toLowerCase()
                );

                if (exactMatch) {
                  handleProfileClick(exactMatch.upn);
                } else {
                  alert("Profile not found.");
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;