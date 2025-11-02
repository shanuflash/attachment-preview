# react-attachment-kit

A complete React component kit for handling file attachments. react-attachment-kit provides both a clean, collapsible card layout to display your file list and a powerful, interactive modal to preview them.

> Check out the live demo **[here](https://react-attachment-kit.vercel.app)**.

It features specialized viewers for different file types:

- **Interactive Image Viewer**: Zoom up to 200%, pan, and drag to explore high-resolution images
- **Advanced Video Player**: Custom controls with seek, playback speed, and YouTube-style ambient mode blur effect
- **Integrated PDF Viewer**: Navigate through multi-page documents with built-in page controls
- **Graceful Fallback**: Clean unsupported file screen for documents and other file types

## Installation

Install the package along with its peer dependencies:

```bash
npm install react-attachment-kit react-pdf react-intersection-observer media-chrome
```

**Requirements:**

- React 18.3.1 or higher
- No Tailwind CSS installation required (styles are included)

## Usage

Import the component and its styles:

```jsx
import Attachments from 'react-attachment-kit';
import 'react-attachment-kit/dist/style.css';

function App() {
  const files = [
    {
      id: '1',
      name: 'vacation-photo.jpg',
      type: 'image/jpeg',
      url: 'https://example.com/photo.jpg',
    },
    {
      id: '2',
      name: 'presentation.pdf',
      type: 'application/pdf',
      url: 'https://example.com/presentation.pdf',
    },
  ];

  return <Attachments files={files} collapsible />;
}
```

**Important:** Make sure to import the CSS file (`'react-attachment-kit/dist/style.css'`) for the component to display correctly.

## Props

### `files` (required)

Array of file objects to display. Each file must have:

- `id` (string): Unique identifier
- `name` (string): Display name of the file
- `type` (string): MIME type (e.g., 'image/png', 'video/mp4', 'application/pdf')
- `url` (string): URL to access the file

### `collapsible` (optional)

Boolean to enable collapsible attachment section. Defaults to `false`.

### `handleDownload` (optional)

Custom download handler function. If not provided, files download directly from their URL.

```jsx
const customDownload = (file) => {
  // Your custom download logic
  console.log('Downloading:', file.name);
};

<Attachments files={files} handleDownload={customDownload} />;
```

## Features

**Image Preview**

- Click to open full-screen modal
- Click again to zoom in (up to 200%)
- Drag to pan when zoomed
- Zoom controls in bottom-left corner
- Blurred background for visual depth

**Video Preview**

- Auto-play on open
- Custom media controls
- Seek forward/backward 10 seconds
- Playback speed adjustment
- Volume control
- Real-time canvas blur effect synced with video

**PDF Preview**

- Page-by-page navigation
- Zoom controls
- Loading states for large documents

**Navigation**

- Arrow buttons to move between files
- Keyboard shortcuts (arrow keys, ESC to close)
- File count indicator in header

**Download**

- Hover over file cards to reveal download button
- Download button in preview modal header
- Custom download handlers supported

## Supported File Types

- **Images**: JPEG, PNG, GIF, WebP, and other browser-supported formats
- **Videos**: MP4, WebM, and other HTML5 video formats
- **Audio**: MP3, WAV, and other HTML5 audio formats (with waveform visualizer)
- **PDFs**: Full PDF viewing support
- **Documents**: Word (.doc, .docx), Excel (.xls, .xlsx), CSV, HTML, ZIP, JSON (shows file icon and download option)

## Styling

Built with Tailwind CSS and Radix UI. All styles are self-contained and scoped to avoid conflicts with your application's styles.

**Key Features:**

- ✅ No Tailwind CSS installation required in your project
- ✅ All CSS variables are prefixed with `rak-` to prevent conflicts
- ✅ Styles are scoped to `.attachment-preview` class
- ✅ Works with any CSS framework or styling solution
- ✅ Dark theme by default (light theme support coming soon)

**Customization:**
If you need to customize the appearance, you can override the CSS variables:

```css
.attachment-preview {
  --rak-radius: 0.5rem; /* Border radius */
  --rak-background: #000; /* Background color */
  --rak-foreground: #fff; /* Text color */
  --rak-primary: #fff; /* Primary color */
  /* ... and more */
}
```

## License

MIT
