import React, { useState, useRef, useEffect } from 'react';
import BadgeTemplate from './components/BadgeTemplate';
import ImageUploader from './components/ImageUploader';
import NameInput from './components/NameInput';
import BadgePreview from './components/BadgePreview';
import { detectFace, initializeFaceDetection } from './utils/faceDetection';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [facePosition, setFacePosition] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBadge, setGeneratedBadge] = useState(null);
  const badgeRef = useRef(null);

  // Initialize face detection model on app load
  useEffect(() => {
    initializeFaceDetection();
  }, []);

  const handleImageUpload = async (image) => {
    setUploadedImage(image);
    // Detect face position for optimal cropping
    const faceData = await detectFace(image);
    setFacePosition(faceData);
  };

  const handleGenerate = async () => {
    if (!userName || !uploadedImage) return;
    
    setIsGenerating(true);
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    setGeneratedBadge({ name: userName, image: uploadedImage, facePosition });
    setIsGenerating(false);
  };

  const canGenerate = userName.trim().length > 0 && uploadedImage !== null;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-logos">
          <div className="logos-left">
            <span className="logo-text">KronosGuild</span>
            <span className="logo-divider">×</span>
            <span className="logo-text">SSA</span>
          </div>
          <div className="logos-right">
            <div className="solana-logo">
              <span className="solana-main">SOLANA</span>
              <span className="solana-sub">FOUNDATION</span>
            </div>
          </div>
        </div>
        <div className="header-content">
          <h1>Solana Nigeria<br/>Developer Cohort</h1>
          <p className="tagline">Building The Next Generation Of Solana Developers In Nigeria</p>
          <div className="event-badge">
            <span className="event-dates">November 22 - November 28, 2025</span>
            <span className="event-time">||08:00AM</span>
          </div>
          <p className="subtitle">Create Your Personalized Registration Badge</p>
        </div>
      </header>

      <main className="app-main">
        <div className="form-section">
          <NameInput 
            value={userName} 
            onChange={setUserName}
          />
          
          <ImageUploader 
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
            onRemove={() => {
              setUploadedImage(null);
              setFacePosition(null);
            }}
          />

          <button 
            className="btn-primary"
            onClick={handleGenerate}
            disabled={!canGenerate}
          >
            {isGenerating ? 'Generating...' : 'Generate My Badge'}
          </button>
        </div>

        <div className="preview-section">
          <h2>Preview</h2>
          <BadgePreview
            ref={badgeRef}
            badgeData={generatedBadge}
            isGenerating={isGenerating}
          />
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <img src="/superteam.jpg" alt="SuperTeam" className="footer-logo" />
          <p>Powered by Solana Foundation × SuperTeam × KronosGuild × SSA</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
