import React, { forwardRef, useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import BadgeTemplate from './BadgeTemplate';
import './BadgePreview.css';

const BadgePreview = forwardRef(({ badgeData, isGenerating }, ref) => {
  const badgeRef = useRef(null); // scaled preview badge
  const exportBadgeRef = useRef(null); // unscaled off-screen clone for accurate export
  const scaleWrapperRef = useRef(null);
  const [canDownload, setCanDownload] = React.useState(false);
  const [scale, setScale] = useState(0.5);

  // Dynamic scaling based on available width
  useEffect(() => {
    const computeScale = () => {
      if (!scaleWrapperRef.current) return;
      const containerWidth = scaleWrapperRef.current.parentElement.clientWidth;
      // target width 800; leave some padding (16px)
      const available = containerWidth - 16;
      const raw = available / 800;
      // clamp between 0.18 and 0.5
      const clamped = Math.min(0.5, Math.max(0.18, raw));
      setScale(clamped);
    };
    computeScale();
    window.addEventListener('resize', computeScale);
    return () => window.removeEventListener('resize', computeScale);
  }, []);

  useEffect(() => {
    if (badgeData) {
      setCanDownload(true);
    }
  }, [badgeData]);

  const handleDownload = async () => {
    // Ensure we have the off-screen clone ready
    if (!exportBadgeRef.current) return;
    // Wait for web fonts to be ready to prevent layout shifts
    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch (_) { /* ignore */ }
    }

    try {
      const canvas = await html2canvas(exportBadgeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        removeContainer: true
      });

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const sanitizedName = badgeData.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-');
        const filename = `solana-cohort-${sanitizedName}.png`;

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Error downloading badge:', error);
      alert('Failed to download badge. Please try again.');
    }
  };

  return (
    <div className="badge-preview-container">
      <div className="preview-canvas" style={{ minHeight: `${1000 * scale + 40}px` }}>
        {isGenerating && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Generating your badge...</p>
          </div>
        )}
        <div
          ref={scaleWrapperRef}
          className="badge-scale-wrapper"
          style={{ transform: `scale(${scale})` }}
        >
          <div ref={badgeRef} className="badge-render">
            {badgeData ? (
              <BadgeTemplate
                userName={badgeData.name}
                photoUrl={badgeData.image}
                facePosition={badgeData.facePosition}
              />
            ) : (
              <div className="preview-placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p>Your badge will appear here</p>
                <small>Enter your name and upload a photo to get started</small>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Off-screen unscaled clone for pixel-perfect export */}
      {badgeData && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-10000px',
            left: '-10000px',
            width: '800px',
            height: '1000px',
            overflow: 'hidden'
          }}
        >
          <div ref={exportBadgeRef} style={{ width: '800px', height: '1000px' }}>
            <BadgeTemplate
              userName={badgeData.name}
              photoUrl={badgeData.image}
              facePosition={badgeData.facePosition}
            />
          </div>
        </div>
      )}

      {canDownload && !isGenerating && (
        <button className="btn-download" onClick={handleDownload}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Badge
        </button>
      )}
    </div>
  );
});

BadgePreview.displayName = 'BadgePreview';

export default BadgePreview;
