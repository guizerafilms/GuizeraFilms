import React from 'react';

export interface PortfolioVideo {
  id: string;
  embedId: string; // ID do arquivo no Drive ou ID do vídeo no Youtube
  title: string;
  category: string;
  url: string; // URL original completa
  platform: 'youtube' | 'drive' | 'cloudinary';
}

export interface InstaVideo {
  id: string;
  embedUrl: string;
  caption?: string;
  client?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}