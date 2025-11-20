# 🚀 Quick Start Guide

## Your New Professional Badge Generator is Ready!

### What's Changed

✅ **Migrated to React + Vite** - Modern, professional framework
✅ **AI Face Detection** - TensorFlow.js BlazeFace for perfect photo positioning  
✅ **Coded Template** - No more relying on template.jpg, everything is code
✅ **Precise Name Positioning** - Name perfectly placed in white bar area
✅ **Auto Title Case** - Names automatically formatted (e.g., "john doe" → "John Doe")
✅ **High-Quality Export** - 2x resolution PNG downloads

### How to Run

The dev server is already running at: **http://localhost:3000/**

To stop the server: Press `Ctrl + C` in the terminal

To start again:
```bash
npm run dev
```

### Project Structure

```
src/
├── components/
│   ├── BadgeTemplate.jsx      # Fully coded badge design
│   ├── BadgePreview.jsx       # Preview & download
│   ├── NameInput.jsx          # Name input with validation
│   └── ImageUploader.jsx      # Drag-drop photo upload
├── utils/
│   └── faceDetection.js       # TensorFlow face detection
├── App.jsx                    # Main app
└── main.jsx                   # Entry point
```

### Key Features

1. **Smart Face Detection**
   - Automatically detects faces in uploaded photos
   - Centers face perfectly in the circular area
   - Falls back to center crop if no face detected

2. **Professional Name Formatting**
   - Auto converts to title case
   - Dynamic font sizing to fit any name length
   - Perfect positioning in white bar (51.5% vertical)
   - Dark purple color (#2D1B4E) for contrast

3. **Coded Template Benefits**
   - No dependency on template.jpg image
   - Easy to customize colors, fonts, sizes
   - Smaller bundle size
   - Faster loading
   - SuperTeam logo integrated as co-branding

4. **Responsive & Modern**
   - Works on all screen sizes
   - Drag-and-drop file upload
   - Real-time validation
   - Instant preview updates

### Build for Production

```bash
npm run build
```

Output will be in `dist/` folder, ready to deploy!

### Deploy Options

- **Vercel**: `vercel deploy`
- **Netlify**: Drag `dist/` folder to netlify.com/drop
- **GitHub Pages**: Push to gh-pages branch

### Old Version Backup

Your original vanilla JS version is backed up in:
`old-vanilla-version/` folder

---

**Need help?** Check the main README.md for detailed documentation.

**Technology Stack:**
- React 18
- Vite 5
- TensorFlow.js (BlazeFace)
- html2canvas
- Modern CSS3
