// Mantendo helpers do Youtube para não quebrar o PortfolioDrive
export const extractYoutubeId = (url: string): string | null => {
  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regex);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const getYoutubeThumbnailUrl = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const extractInstaId = (url: string): string | null => {
  const regex = /\/(p|reel|tv)\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[2] : null;
};

export const getInstaEmbedUrl = (shortcode: string): string => {
  return `https://www.instagram.com/p/${shortcode}/embed`;
};

// CÓDIGO SOLICITADO:

export const extractDriveId = (url: string): string | null => {
  if (url.includes('cloudinary.com')) return null;
  const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Ajustei a tipagem para incluir 'youtube' para manter compatibilidade com PortfolioDrive
export const getEmbedUrl = (platform: 'drive' | 'cloudinary' | 'youtube', urlOrId: string): string => {
  if (platform === 'cloudinary') {
    return urlOrId;
  }
  
  if (platform === 'drive') {
    return `https://drive.google.com/file/d/${urlOrId}/preview`;
  }

  // Fallback simples para Youtube caso seja chamado pelo PortfolioDrive
  if (platform === 'youtube') {
     return `https://www.youtube.com/embed/${urlOrId}?autoplay=1&mute=1&rel=0&showinfo=0&modestbranding=1`;
  }
  
  return '';
};