import React from 'react';
import Attachments from './attachments';

// Auto-generate IDs for files
let fileIdCounter = 0;
const generateId = () => `file-${++fileIdCounter}`;

const testImages = [
  {
    id: generateId(),
    name: 'free-photo-of-blue-and-white-lighthouse.jpeg',
    type: 'image/png',
    url: 'https://images.pexels.com/photos/27095526/pexels-photo-27095526/free-photo-of-blue-and-white-lighthouse.jpeg',
  },
  {
    id: generateId(),
    name: 'Screenshot-2024-09-19-at-12-16-02-PM.png',
    type: 'image/png',
    url: 'https://i.ibb.co/W5BFS4h/Screenshot-2024-09-19-at-12-16-02-PM.png',
  },
  {
    id: generateId(),
    name: 'free-photo-of-green-big-leaves-of-plant.jpeg',
    type: 'image/jpg',
    url: 'https://images.pexels.com/photos/27745133/pexels-photo-27745133/free-photo-of-green-big-leaves-of-plant.jpeg',
  },
  {
    id: generateId(),
    name: 'free-photo-of-silhouette-shadow-on-vibrant-green-leaf.jpeg',
    type: 'image/jpg',
    url: 'https://images.pexels.com/photos/28398729/pexels-photo-28398729/free-photo-of-silhouette-shadow-on-vibrant-green-leaf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: generateId(),
    name: 'free-photo-of-green-big-leaves-of-plant.jpeg',
    type: 'image/png',
    url: 'https://images.pexels.com/photos/27745133/pexels-photo-27745133/free-photo-of-green-big-leaves-of-plant.jpeg',
  },
];

const testVideos = [
  {
    id: generateId(),
    name: 'sample-mp4.mp4',
    type: 'video/mp4',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-mp4.mp4',
  },
  {
    id: generateId(),
    name: 'sample-mp4-2.mp4',
    type: 'video/mp4',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-mp4-2.mp4',
  },
  {
    id: generateId(),
    name: 'sample-mp4-3.mp4',
    type: 'video/mp4',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-mp4-3.mp4',
  },
];

const testAudios = [
  {
    id: generateId(),
    name: 'sample-mp3.mp3',
    type: 'audio/mp3',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-mp3.mp3',
  },
  {
    id: generateId(),
    name: 'sample-mp3.mp3',
    type: 'audio/mp3',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-mp3.mp3',
  },
];

const otherFiles = [
  {
    id: generateId(),
    name: 'Sample-pdf.pdf',
    type: 'application/pdf',
    url: 'https://ss-staging-public.s3.amazonaws.com/temp-pdfs/ilovepdf_merged.pdf',
  },
  {
    id: generateId(),
    name: 'Sample-pdf+Password.pdf',
    type: 'application/pdf',
    url: 'https://ss-staging-public.s3.amazonaws.com/temp-pdfs/Sample-pdf+Password.pdf',
  },
  {
    id: generateId(),
    name: 'sample-docx.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-docx.docx',
  },
  {
    id: generateId(),
    name: 'sample-json.json',
    type: 'application/json',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-json.json',
  },
  {
    id: generateId(),
    name: 'sample-zip.zip',
    type: 'application/zip',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-zip.zip',
  },
  {
    id: generateId(),
    name: 'sample-doc.doc',
    type: 'application/msword',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-doc.doc',
  },
  {
    id: generateId(),
    name: 'sample-html.html',
    type: 'text/html',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-html.html',
  },
  {
    id: generateId(),
    name: 'sample-csv.csv',
    type: 'text/csv',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-csv.csv',
  },
  {
    id: generateId(),
    name: 'sample-xlsx.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-xlsx.xlsx',
  },
  {
    id: generateId(),
    name: 'sample-xls.xls',
    type: 'application/vnd.ms-excel',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-xls.xls',
  },
];

const testAttachments = [
  ...testImages,
  ...testVideos,
  ...testAudios,
  ...otherFiles,
];

function App() {
  return (
    <div className="p-8 min-h-screen bg-background">
      <Attachments files={testAttachments} collapsible />
    </div>
  );
}

export default App;
