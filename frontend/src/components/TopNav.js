import React from 'react';

export default function TopNav({ onProfileToggle, showProfile, onMenu, onLogout }) {
  return (
    <div className="topnav surface" style={{position:'relative'}}>
      <div className="topnav-left" style={{display:'flex',alignItems:'center',gap:12}}>
        <button className="menu-btn btn" aria-label="Toggle sidebar" onClick={onMenu}>☰</button>
        <div className="brand">educa</div>
      </div>

      <div className="topnav-right" style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{position:'relative'}}>
          <button className="btn" onClick={onProfileToggle} aria-haspopup="true" aria-expanded={showProfile}>Profile ▾</button>
          {showProfile && (
            <div className="profile-dropdown">
              <button className="profile-item">My Profile</button>
              <button className="profile-item" onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
