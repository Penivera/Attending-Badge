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
        <div className="header-content">
          <h1>Solana Nigerian Developer Cohort</h1>
          <p className="tagline">Building The Next Generation Of Solana Developers In Nigeria</p>
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
        <p>Powered by Solana Foundation × SuperTeam × KronosBlu × SSA</p>
      </footer>
    </div>
  );
}

export default App;
