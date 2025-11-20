import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs';

let model = null;

export const loadFaceDetectionModel = async () => {
  if (!model) {
    try {
      model = await blazeface.load();
      console.log('BlazeFace model loaded successfully');
    } catch (error) {
      console.error('Failed to load face detection model:', error);
    }
  }
  return model;
};

export const detectFace = async (imageDataUrl) => {
  try {
    // Load model if not already loaded
    if (!model) {
      await loadFaceDetectionModel();
    }

    if (!model) {
      return null;
    }

    // Create image element
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageDataUrl;
    });

    // Detect faces
    const predictions = await model.estimateFaces(img, false);

    if (predictions.length > 0) {
      const face = predictions[0];
      
      // Get face bounding box
      const [x, y, width, height] = [
        face.topLeft[0],
        face.topLeft[1],
        face.bottomRight[0] - face.topLeft[0],
        face.bottomRight[1] - face.topLeft[1]
      ];

      // Calculate face center
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      return {
        centerX,
        centerY,
        imageWidth: img.width,
        imageHeight: img.height,
        faceBox: { x, y, width, height },
        confidence: face.probability[0]
      };
    }

    // No face detected, return image center
    return {
      centerX: img.width / 2,
      centerY: img.height / 2,
      imageWidth: img.width,
      imageHeight: img.height,
      faceBox: null,
      confidence: 0
    };
  } catch (error) {
    console.error('Face detection error:', error);
    return null;
  }
};

// Preload the model on app initialization
export const initializeFaceDetection = async () => {
  await loadFaceDetectionModel();
};
