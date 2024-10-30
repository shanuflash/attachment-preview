export const getAttachmentType = (type) => {
  let itemType = 'unsupported';
  if (type.includes('image')) {
    itemType = 'image';
  } else if (type.includes('video')) {
    itemType = 'video';
  } else if (type.includes('audio')) {
    itemType = 'audio';
  } else if (type === 'application/pdf') {
    itemType = 'pdf';
  }
  return itemType;
};
