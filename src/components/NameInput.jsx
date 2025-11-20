import React from 'react';
import './NameInput.css';

const NameInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const characterCount = value.length;
  const isLong = characterCount > 35;

  return (
    <div className="input-group">
      <label htmlFor="nameInput">Your Full Name</label>
      <input
        type="text"
        id="nameInput"
        placeholder="Enter your name"
        value={value}
        onChange={handleChange}
        maxLength={50}
        autoComplete="name"
      />
      <div className="input-footer">
        <small className="helper-text">
          This will appear on your registration badge
        </small>
        <small className={`character-count ${isLong ? 'warning' : ''}`}>
          {characterCount}/50
        </small>
      </div>
      {isLong && (
        <div className="warning-message">
          ⚠️ Name might be too long to fit nicely on the badge
        </div>
      )}
    </div>
  );
};

export default NameInput;
