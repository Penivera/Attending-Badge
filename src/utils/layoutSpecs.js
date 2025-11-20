/**
 * BADGE LAYOUT SPECIFICATIONS
 * 
 * This file documents the precise measurements and positioning
 * used in the BadgeTemplate component for perfect alignment.
 */

export const BADGE_DIMENSIONS = {
  width: 800,
  height: 1000,
};

export const LAYOUT_POSITIONS = {
  // Header logos
  headerPadding: {
    top: 30,
    horizontal: 40,
  },

  // Event details (left side)
  eventDetails: {
    top: 120,
    left: 40,
    spacing: 20, // gap between date and time
  },

  // Location (right side)
  eventLocation: {
    top: 80,
    right: 40,
  },

  // Progress line
  progressLine: {
    top: 280,
    left: 40,
    width: 200,
    height: 4,
  },

  // Profile photo circle
  photoCircle: {
    top: 200,
    centerX: '50%', // horizontally centered
    diameter: 280,
    borderWidth: 8,
  },

  // Purple content section
  purpleSection: {
    top: 350,
    bottom: 280, // space for theme section
  },

  // Name plate (white bar)
  namePlate: {
    top: 135, // from purple section start
    centerX: '50%',
    minWidth: 400,
    padding: {
      vertical: 18,
      horizontal: 60,
    },
    borderRadius: 12,
  },

  // Name text positioning
  nameText: {
    // Positioned at 51.5% of canvas height for perfect centering in white bar
    verticalPosition: 0.515, // 51.5% of canvas height
    maxWidthPercent: 0.88, // 88% of bar width
    fontSize: {
      base: 0.042, // 4.2% of canvas height
      min: 0.02, // 2% of canvas height minimum
    },
    color: '#2D1B4E', // Dark purple
    fontWeight: 800,
    shadow: {
      color: 'rgba(0, 0, 0, 0.12)',
      blur: 3,
      offsetY: 2,
    },
  },

  // Cohort text
  cohortText: {
    top: 240, // from purple section start
    centerX: '50%',
    width: '90%',
  },

  // Theme section (bottom)
  themeSection: {
    height: 280,
    padding: {
      top: 30,
      horizontal: 40,
      bottom: 40,
    },
    borderRadius: {
      topLeft: 40,
      topRight: 40,
    },
    borderWidth: 3,
  },
};

export const COLORS = {
  // Primary brand colors
  purplePrimary: '#8B2FC9',
  purpleDark: '#6B1FA9',
  purpleLight: '#A855F7',
  
  // Text colors
  namePlateText: '#2D1B4E',
  whiteText: '#FFFFFF',
  blackText: '#1A1A1A',
  grayText: '#666666',
  
  // Background colors
  backgroundGradient: 'linear-gradient(135deg, #E8E8E8 0%, #F5F5F5 100%)',
  whitePlate: 'rgba(255, 255, 255, 0.95)',
  
  // Borders
  themeBorder: '#000000',
};

export const TYPOGRAPHY = {
  fontFamily: "'Poppins', sans-serif",
  
  nameText: {
    weight: 800,
    transform: 'capitalize',
    letterSpacing: '0.5px',
  },
  
  cohortTitle: {
    weight: 800,
    size: 32,
    letterSpacing: '1px',
  },
  
  themeTitle: {
    weight: 800,
    size: 28,
    letterSpacing: '1px',
  },
};

/**
 * POSITIONING ALGORITHM FOR NAME TEXT
 * 
 * The name is positioned using the following precise calculations:
 * 
 * 1. Vertical Position (Y-axis):
 *    - Set at 51.5% of canvas height (0.515)
 *    - This perfectly centers text in the white bar
 *    - White bar is at ~50% with 9% height
 * 
 * 2. Horizontal Position (X-axis):
 *    - Always centered (50% of canvas width)
 *    - Text alignment: center
 * 
 * 3. Font Sizing:
 *    - Starts at 4.2% of canvas height
 *    - Dynamically scales down if text exceeds 88% of bar width
 *    - Minimum font size: 2% of canvas height
 *    - Scale factor: 0.95 per iteration
 * 
 * 4. Auto Title Case:
 *    - Splits name by spaces
 *    - Capitalizes first letter of each word
 *    - Lowercases remaining letters
 *    - Example: "JOHN DOE" → "John Doe"
 * 
 * 5. Color & Shadow:
 *    - Fill color: #2D1B4E (dark purple)
 *    - Shadow: rgba(0,0,0,0.12) with 3px blur
 *    - Vertical offset: 2px down
 */

export const FACE_DETECTION = {
  // When face is detected, photo is positioned to center the face
  // in the circular area using background-position CSS
  circleCenter: {
    x: '50%',
    y: '50%',
  },
  
  // Background size is always 'cover' to fill the circle
  backgroundSize: 'cover',
  
  // Position calculation:
  // backgroundPositionX = 50% - (faceX / imageWidth) * 100%
  // backgroundPositionY = 50% - (faceY / imageHeight) * 100%
};
