# Solana Nigerian Developer Cohort - Badge Generator

A professional React-based badge generator for the Solana Nigerian Developer Cohort event, featuring AI-powered face detection and a fully coded template design.

## Features

- ✨ **Modern React + Vite Stack** - Fast development and optimized builds
- 🎯 **Advanced Face Detection** - TensorFlow.js BlazeFace model for optimal photo cropping
- 🎨 **Coded Template** - No image dependencies, fully CSS/SVG based design
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🚀 **High Performance** - Optimized rendering and export
- 💾 **High-Quality Downloads** - PNG export with 2x resolution
- ⚡ **Real-time Preview** - Instant badge updates as you type
- 🎭 **Auto Title Case** - Professional name formatting

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TensorFlow.js** - Face detection AI
- **BlazeFace** - Lightweight face detection model
- **html2canvas** - High-quality badge export
- **CSS3** - Modern styling with gradients and animations

## Project Structure

```
src/
├── components/
│   ├── BadgeTemplate.jsx      # Main badge design (coded, no images)
│   ├── BadgePreview.jsx       # Preview and download functionality
│   ├── NameInput.jsx          # Name input with validation
│   └── ImageUploader.jsx      # Photo upload with drag-drop
├── utils/
│   └── faceDetection.js       # TensorFlow face detection logic
├── App.jsx                    # Main app component
└── main.jsx                   # App entry point
```

## Key Improvements Over Vanilla Version

1. **Framework Benefits**
   - Component-based architecture for better maintainability
   - State management with React hooks
   - Hot module replacement for faster development

2. **AI Face Detection**
   - BlazeFace model (TensorFlow.js) replaces Face-API
   - More accurate face positioning
   - Better performance and smaller bundle size

3. **Coded Template**
   - Template rendered as React components
   - No dependency on template.jpg
   - Easier to customize colors, fonts, and layout
   - Smaller file sizes and faster loading

4. **Professional Features**
   - Auto title case formatting
   - Real-time character counter
   - Better error handling
   - Responsive scaling
   - High-resolution export (2x scale)

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT

## Credits

Powered by Solana Foundation × SuperTeam × KronosBlu × SSA
