import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { TooltipProvider } from '@sparrowengg/twigs-react';

import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

createRoot(document.getElementById('root')).render(
  <TooltipProvider delayDuration={0}>
    <App />
  </TooltipProvider>
);
