export const extractDriveId = (url: string): string | null => {
  // Regex to match Google Drive ID
  const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const extractYoutubeId = (url: string): string | null => {
  // Regex to match YouTube ID (supports youtu.be, watch?v=, embed, etc)
  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regex);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const extractInstaId = (url: string): string | null => {
  // Try to match /p/CODE, /reel/CODE, or /tv/CODE
  const regex = /\/(p|reel|tv)\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[2] : null;
};

export const getDriveEmbedUrl = (driveId: string): string => {
  return `https://drive.google.com/file/d/${driveId}/preview`;
};

export const getYoutubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
};

export const getYoutubeThumbnailUrl = (videoId: string): string => {
  // Uses the high quality thumbnail from YouTube
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const getInstaEmbedUrl = (shortcode: string): string => {
  return `https://www.instagram.com/p/${shortcode}/embed`;
};