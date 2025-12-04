import React from 'react';

export interface DriveVideo {
  id: string;
  driveId: string;
  title?: string;
  category: string;
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