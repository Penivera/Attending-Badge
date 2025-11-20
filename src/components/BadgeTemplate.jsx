import React from 'react';
import './BadgeTemplate.css';

const BadgeTemplate = ({ userName, photoUrl, facePosition }) => {
  return (
    <div className="badge-template">
      {/* Header Section with Logos */}
      <div className="badge-header">
        <div className="header-logos-left">
          <div className="logo-kronos">KronosGuild</div>
          <div className="logo-divider">×</div>
          <div className="logo-ssa">SSA</div>
        </div>
        <div className="header-logos-right">
          <div className="logo-solana">
            <div className="solana-brand">
              <svg className="solana-icon" viewBox="0 0 397.7 311.7" fill="currentColor">
                <defs>
                  <linearGradient id="solanaGradient" x1="360.88" y1="351.46" x2="141.21" y2="-69.13" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#00FFA3"/>
                    <stop offset="1" stopColor="#DC1FFF"/>
                  </linearGradient>
                </defs>
                <path fill="url(#solanaGradient)" d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"/>
                <path fill="url(#solanaGradient)" d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"/>
                <path fill="url(#solanaGradient)" d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"/>
              </svg>
              <div className="solana-text-group">
                <span className="solana-text">SOLANA</span>
                <span className="foundation-text">FOUNDATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date and Time */}
      <div className="event-details">
        <div className="event-date">
          <svg className="icon-calendar" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
          </svg>
          <div>
            <div className="date-text">27TH-29TH</div>
            <div className="date-month">NOV 2025</div>
          </div>
        </div>
        
        <div className="event-time">
          <svg className="icon-clock" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
          </svg>
          <div className="time-text">10:00AM</div>
        </div>
      </div>

      {/* Location */}
      <div className="event-location">
        <svg className="icon-location" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <div className="location-text">UNIUYO CAMPUS</div>
      </div>

      {/* Progress Line */}
      <div className="progress-line">
        <div className="progress-gradient"></div>
      </div>

      {/* Profile Photo Circle */}
      <div className="photo-circle-container">
        {photoUrl && (
          <div className="photo-circle" style={{
            backgroundImage: `url(${photoUrl})`,
            backgroundPosition: facePosition 
              ? `${50 - (facePosition.centerX / facePosition.imageWidth) * 100}% ${50 - (facePosition.centerY / facePosition.imageHeight) * 100}%`
              : 'center',
            backgroundSize: 'cover'
          }}></div>
        )}
        {!photoUrl && <div className="photo-circle photo-placeholder"></div>}
      </div>

      {/* Purple Section */}
      <div className="badge-content">
        <div className="purple-wave">
          <svg viewBox="0 0 800 600" preserveAspectRatio="none" className="wave-svg">
            <path d="M 0 300 Q 200 100 400 250 T 800 300 L 800 600 L 0 600 Z" fill="#8B2FC9"/>
          </svg>
        </div>

        {/* Name Plate */}
        <div className="name-plate">
          <div className="name-text">
            {userName || 'Your Name'}
          </div>
        </div>

        {/* Main Text */}
        <div className="cohort-text">
          <div className="attending-text"><b>I will be attending the</b></div>
          <div className="cohort-title">SOLANA NIGERIAN DEVELOPER COHORT</div>
        </div>
      </div>

      {/* Theme Section */}
      <div className="theme-section">
        <div className="theme-label">Theme:</div>
        <div className="theme-title">UNLOCK YOUR WEB3 POWER</div>
        <div className="registration-info">
          <div className="registration-text">FOR FREE REGISTRATION, USE THE</div>
          <div className="link-text">LINK BELOW</div>
        </div>
        <div className="registration-link">https://luma.com/kb0rt3y9</div>
        <div className="partner-logo">
          <img src="/superteam.jpg" alt="SuperTeam Partner" className="superteam-badge" />
          <div className="powered-by">Powered by SuperTeam</div>
        </div>
      </div>
    </div>
  );
};

export default BadgeTemplate;
