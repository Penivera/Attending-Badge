// Global variables
let uploadedImage = null;
let userName = '';
let faceApiLoaded = false;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// DOM Elements
const elements = {
    nameInput: document.getElementById('nameInput'),
    photoUpload: document.getElementById('photoUpload'),
    uploadArea: document.getElementById('uploadArea'),
    uploadPreview: document.getElementById('uploadPreview'),
    uploadPlaceholder: document.querySelector('.upload-placeholder'),
    previewImg: document.getElementById('previewImg'),
    removePhoto: document.getElementById('removePhoto'),
    generateBtn: document.getElementById('generateBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    badgeCanvas: document.getElementById('badgeCanvas'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    uploadWarning: document.getElementById('uploadWarning')
};

// Load Face-API models
async function loadFaceDetection() {
    try {
        const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        faceApiLoaded = true;
        console.log('Face detection models loaded successfully');
    } catch (error) {
        console.warn('Face detection not available:', error);
        faceApiLoaded = false;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFaceDetection();
    initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
    // Name input
    elements.nameInput.addEventListener('input', handleNameInput);
    
    // Photo upload
    elements.uploadArea.addEventListener('click', () => elements.photoUpload.click());
    elements.photoUpload.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    elements.uploadArea.addEventListener('dragover', handleDragOver);
    elements.uploadArea.addEventListener('dragleave', handleDragLeave);
    elements.uploadArea.addEventListener('drop', handleDrop);
    
    // Remove photo
    elements.removePhoto.addEventListener('click', (e) => {
        e.stopPropagation();
        removePhoto();
    });
    
    // Generate badge
    elements.generateBtn.addEventListener('click', generateBadge);
    
    // Download badge
    elements.downloadBtn.addEventListener('click', downloadBadge);
}

// Handle name input
function handleNameInput(e) {
    userName = e.target.value.trim();
    validateForm();
    
    // Show warning for long names
    if (userName.length > 35) {
        showWarning('Name might be too long to fit nicely on the badge');
    } else {
        hideWarning();
    }
}

// Handle file selection
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processFile(file);
    }
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    elements.uploadArea.classList.add('drag-over');
}

// Handle drag leave
function handleDragLeave(e) {
    e.preventDefault();
    elements.uploadArea.classList.remove('drag-over');
}

// Handle drop
function handleDrop(e) {
    e.preventDefault();
    elements.uploadArea.classList.remove('drag-over');
    
    const file = e.dataTransfer.files[0];
    if (file) {
        processFile(file);
    }
}

// Process uploaded file
function processFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showWarning('Please upload an image file (PNG, JPG, or JPEG)');
        return;
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        showWarning('File size too large. Please upload an image under 5MB');
        return;
    }
    
    // Check image resolution
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // Warn for low resolution
            if (img.width < 300 || img.height < 300) {
                showWarning('Image resolution is low. For best results, use a higher quality photo');
            } else {
                hideWarning();
            }
            
            uploadedImage = img;
            displayPreview(e.target.result);
            validateForm();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Display image preview
function displayPreview(src) {
    elements.previewImg.src = src;
    elements.uploadPlaceholder.style.display = 'none';
    elements.uploadPreview.style.display = 'flex';
}

// Remove photo
function removePhoto() {
    uploadedImage = null;
    elements.photoUpload.value = '';
    elements.uploadPreview.style.display = 'none';
    elements.uploadPlaceholder.style.display = 'block';
    hideWarning();
    validateForm();
}

// Validate form
function validateForm() {
    const isValid = userName.length > 0 && uploadedImage !== null;
    elements.generateBtn.disabled = !isValid;
}

// Show warning
function showWarning(message) {
    elements.uploadWarning.textContent = message;
    elements.uploadWarning.style.display = 'block';
}

// Hide warning
function hideWarning() {
    elements.uploadWarning.style.display = 'none';
}

// Detect face and get optimal crop coordinates
async function detectFaceAndCrop(image) {
    if (!faceApiLoaded) {
        // Fallback to center crop
        return getCenterCrop(image);
    }
    
    try {
        const detection = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions());
        
        if (detection) {
            const box = detection.box;
            // Calculate center of face
            const faceCenterX = box.x + box.width / 2;
            const faceCenterY = box.y + box.height / 2;
            
            return {
                centerX: faceCenterX,
                centerY: faceCenterY,
                detected: true
            };
        }
    } catch (error) {
        console.warn('Face detection failed:', error);
    }
    
    // Fallback to center crop
    return getCenterCrop(image);
}

// Get center crop coordinates
function getCenterCrop(image) {
    return {
        centerX: image.width / 2,
        centerY: image.height / 2,
        detected: false
    };
}

// Generate badge
async function generateBadge() {
    elements.loadingOverlay.style.display = 'flex';
    
    try {
        // Load template image
        const templateImg = await loadImage('template.jpg');
        
        // Load SuperTeam logo
        const superteamImg = await loadImage('superteam.jpg');
        
        // Set canvas dimensions to match template
        const canvas = elements.badgeCanvas;
        canvas.width = templateImg.width;
        canvas.height = templateImg.height;
        
        const ctx = canvas.getContext('2d');
        
        // Draw template as background
        ctx.drawImage(templateImg, 0, 0);
        
        // Detect face and get crop coordinates
        const cropInfo = await detectFaceAndCrop(uploadedImage);
        
        // Draw user photo in circular area
        await drawCircularPhoto(ctx, uploadedImage, cropInfo, canvas.width, canvas.height);
        
        // Draw SuperTeam logo (co-branding)
        drawSuperTeamLogo(ctx, superteamImg, canvas.width, canvas.height);
        
        // Draw user name
        drawUserName(ctx, userName, canvas.width, canvas.height);
        
        // Show download button
        elements.downloadBtn.style.display = 'block';
        
    } catch (error) {
        console.error('Error generating badge:', error);
        alert('Failed to generate badge. Please try again.');
    } finally {
        elements.loadingOverlay.style.display = 'none';
    }
}

// Load image helper
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// Draw circular photo with auto-crop
async function drawCircularPhoto(ctx, image, cropInfo, canvasWidth, canvasHeight) {
    // Calculate circle position and size based on template
    // Assuming the circle is centered horizontally and positioned in upper-middle area
    const circleX = canvasWidth * 0.5; // Center horizontally
    const circleY = canvasHeight * 0.35; // Positioned in upper area
    const circleRadius = Math.min(canvasWidth, canvasHeight) * 0.18; // Approximately 18% of canvas size
    
    // Save context state
    ctx.save();
    
    // Create circular clipping path
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    
    // Calculate scaling to cover the circle
    const diameter = circleRadius * 2;
    const scale = Math.max(diameter / image.width, diameter / image.height);
    const scaledWidth = image.width * scale;
    const scaledHeight = image.height * scale;
    
    // Calculate position to center the face (or image center) in the circle
    const offsetX = circleX - (cropInfo.centerX * scale);
    const offsetY = circleY - (cropInfo.centerY * scale);
    
    // Draw the image
    ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);
    
    // Restore context state
    ctx.restore();
}

// Draw SuperTeam logo
function drawSuperTeamLogo(ctx, logoImg, canvasWidth, canvasHeight) {
    // Position in top-right area, below Solana Foundation logo
    const logoHeight = canvasHeight * 0.06; // 6% of canvas height (approximately 45-50px)
    const logoWidth = (logoImg.width / logoImg.height) * logoHeight;
    const logoX = canvasWidth - logoWidth - (canvasWidth * 0.08); // 8% margin from right
    const logoY = canvasHeight * 0.08; // 8% from top
    
    ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
}

// Draw user name
function drawUserName(ctx, name, canvasWidth, canvasHeight) {
    // Position text in the white rectangular bar beneath the profile circle
    const barCenterY = canvasHeight * 0.515; // Adjusted for perfect vertical centering
    const barWidth = canvasWidth * 0.58;     // Width of the white bar
    const maxTextWidth = barWidth * 0.88;    // 88% to ensure padding on sides

    // Convert name to title case for professional appearance
    const formattedName = name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    // Start with optimal font size for the bar
    let fontSize = canvasHeight * 0.042;
    ctx.font = `800 ${fontSize}px Poppins, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Dynamically adjust font size to fit within bar width
    let metrics = ctx.measureText(formattedName);
    while (metrics.width > maxTextWidth && fontSize > canvasHeight * 0.02) {
        fontSize *= 0.95;
        ctx.font = `800 ${fontSize}px Poppins, sans-serif`;
        metrics = ctx.measureText(formattedName);
    }

    // Professional dark purple color with slight transparency
    ctx.fillStyle = '#2D1B4E';

    // Add subtle text shadow for depth and readability
    ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    // Draw the name centered in the white bar
    ctx.fillText(formattedName, canvasWidth / 2, barCenterY);

    // Reset shadow state
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

// Download badge
function downloadBadge() {
    const canvas = elements.badgeCanvas;
    
    // Sanitize filename
    const sanitizedName = userName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filename = `solana-cohort-${sanitizedName}.png`;
    
    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 'image/png', 1.0);
}
