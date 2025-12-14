export const extractDriveId = (url: string): string | null => {
  if (url.includes('cloudinary.com')) return null;
  const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const extractYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const getEmbedUrl = (platform: 'drive' | 'cloudinary' | 'youtube', urlOrId: string): string => {
  if (platform === 'cloudinary') {
    return urlOrId;
  }
  
  if (platform === 'drive') {
    return `https://drive.google.com/file/d/${urlOrId}/preview`;
  }

  if (platform === 'youtube') {
    return `https://www.youtube.com/embed/${urlOrId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&showinfo=0`;
  }
  
  return '';
};