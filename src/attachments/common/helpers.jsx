import { fileTypes, previewTypes } from './constants';

export const getAttachmentType = (type) => {
  let itemType = previewTypes.unsupported;
  if (type.includes(fileTypes.image)) {
    itemType = previewTypes.image;
  } else if (type.includes(fileTypes.video)) {
    itemType = previewTypes.video;
  }
  //  else if (type.includes(fileTypes.audio)) {
  //   itemType = previewTypes.audio;
  // }
  else if (type === fileTypes.pdf) {
    itemType = previewTypes.pdf;
  }
  return itemType;
};

export const formatTime = (seconds) => {
  try {
    if (seconds === 0) return '00:00';

    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = Math.round(seconds % 60)
      .toString()
      .padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${minutes}:${secs}`;
    } else {
      return `${minutes}:${secs}`;
    }
  } catch (error) {
    console.error('Error formatting time:', error);
    return '00:00';
  }
};

export const downloadSrcAsFile = (name, url) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const createThumbnail = async ({ url }) => {
  const video = document.createElement('video');
  video.src = url || '';
  video.crossOrigin = 'anonymous';

  return new Promise((resolve) => {
    const handleError = (error) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 318;
      canvas.height = 178;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg'));
      console.log('error in createThumbnail', error);
    };

    const generateThumbnail = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return handleError('Canvas context not available');

      // Scale thumbnail down to 318x178
      const maxDimensions = { width: 318, height: 178 };

      // Return default image if no video frame available
      if (!video.videoWidth || !video.videoHeight) {
        canvas.width = maxDimensions.width;
        canvas.height = maxDimensions.height;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        resolve(dataUrl);
        return;
      }

      const scale = Math.min(
        maxDimensions.width / video.videoWidth,
        maxDimensions.height / video.videoHeight
      );

      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg'));
    };

    video.onloadedmetadata = () => {
      video.currentTime = 1;
    };
    video.onseeked = generateThumbnail;
    video.onerror = handleError;
    video.load();
  });
};
