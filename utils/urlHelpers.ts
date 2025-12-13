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

// LÓGICA DE EMBED INTELIGENTE
export const getEmbedUrl = (platform: 'youtube' | 'drive', id: string): string => {
  if (platform === 'drive') {
    // CRUCIAL: Drive DEVE usar /preview para embed. 
    // Autoplay em Drive é limitado, mas mantemos o link limpo para load rápido.
    return `https://drive.google.com/file/d/${id}/preview`;
  }

  if (platform === 'youtube') {
    // YouTube: autoplay=1 e mute=1 aumentam drasticamente a chance do vídeo rodar de primeira.
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&showinfo=0&modestbranding=1&playsinline=1`;
  }

  return '';
};

export const getYoutubeThumbnailUrl = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const getInstaEmbedUrl = (shortcode: string): string => {
  return `https://www.instagram.com/p/${shortcode}/embed`;
};