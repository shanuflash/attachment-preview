// Import styles
import './styles.css';

// Main component
export { default } from './attachments/index.jsx';

// Preview components
export { default as ImagePreview } from './attachments/preview/image.jsx';
export { default as VideoPreview } from './attachments/preview/video.jsx';
export { default as AudioPreview } from './attachments/preview/audio.jsx';
export { default as PdfPreview } from './attachments/preview/pdf.jsx';
export { default as UnsupportedPreview } from './attachments/preview/unsupported.jsx';

// File component
export { default as File } from './attachments/common/file.jsx';

// Re-export Preview component if needed
export { default as Preview } from './attachments/preview/index.jsx';
