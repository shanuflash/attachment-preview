import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import './index.css';
import { ThemeProvider } from './components/theme-provider';

createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme="dark" storageKey="attachment-preview-theme">
    <App />
  </ThemeProvider>
);
