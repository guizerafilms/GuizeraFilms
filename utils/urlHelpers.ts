export const extractDriveId = (url: string): string | null => {
  // Regex to match Google Drive ID
  const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
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

export const getInstaEmbedUrl = (shortcode: string): string => {
  return `https://www.instagram.com/p/${shortcode}/embed`;
};