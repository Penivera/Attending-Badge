import React, { useRef, useState } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ onImageUpload, uploadedImage, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [warning, setWarning] = useState('');
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const validateAndProcessFile = (file) => {
    setWarning('');

    if (!file.type.startsWith('image/')) {
      setWarning('Please upload an image file (PNG, JPG, or JPEG)');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setWarning('File size too large. Please upload an image under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 300 || img.height < 300) {
          setWarning('Image resolution is low. For best results, use a higher quality photo');
        }
        onImageUpload(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove();
    setWarning('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="input-group">
      <label>Upload Your Photo</label>
      <div
        className={`upload-area ${isDragging ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          hidden
        />
        
        {!uploadedImage ? (
          <div className="upload-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p>Click to upload or drag and drop</p>
            <small>PNG, JPG or JPEG (Max 5MB)</small>
          </div>
        ) : (
          <div className="upload-preview">
            <img src={uploadedImage} alt="Preview" />
            <button type="button" className="remove-photo" onClick={handleRemove}>
              ×
            </button>
          </div>
        )}
      </div>
      <small className="helper-text">For best results, use a clear headshot photo</small>
      {warning && (
        <div className="warning-message">
          ⚠️ {warning}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
