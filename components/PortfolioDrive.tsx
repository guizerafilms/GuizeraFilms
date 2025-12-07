import React, { useState, useEffect } from 'react';
import { Plus, Play, Trash2, X, ExternalLink, Loader2 } from 'lucide-react';
import { extractDriveId, getDriveEmbedUrl } from '../utils/urlHelpers';
import { DriveVideo } from '../types';

interface PortfolioDriveProps {
  isAdmin: boolean;
}

// Novos Links fornecidos
const PRESET_VIDEOS = [
  { id: '1', driveId: '1_j3K-5B8hQNyBpn6dXZYhgMuBLkGuOKJ', title: 'Casamento Cinematic', category: 'Casamento' },
  { id: '2', driveId: '1BXHON8h2UQjykxBLsmYQfC6MhZdoVVuS', title: 'Filme Institucional', category: 'Institucional' },
  { id: '3', driveId: '1kcRj9QdAO1EMY7H5wno4HUexhgut2aGr', title: 'Cobertura de Evento', category: 'Evento' },
  { id: '4', driveId: '1AagfPT9MDPoMxwWpK0Dxez18pT44OHtA', title: 'Aniversário Premium', category: 'Social' },
  { id: '5', driveId: '1zb-eGCvqgnEIIVaGtCCIpXYjiwqgiWlZ', title: 'Comercial TV', category: 'Publicidade' },
];

const LOCAL_STORAGE_KEY = 'guizera_drive_videos_v2025';

const PortfolioDrive: React.FC<PortfolioDriveProps> = ({ isAdmin }) => {
  const [videos, setVideos] = useState<DriveVideo[]>(PRESET_VIDEOS);
  const [inputUrl, setInputUrl] = useState('');
  const [category, setCategory] = useState('Geral');
  
  // Player state
  const [selectedVideo, setSelectedVideo] = useState<DriveVideo | null>(null);
  
  // Initial Load Logic: Merge defaults if local storage is empty or use presets
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
            setVideos(parsed);
        } else {
            setVideos(PRESET_VIDEOS);    
        }
      } catch (e) {
        setVideos(PRESET_VIDEOS);
      }
    } else {
        setVideos(PRESET_VIDEOS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(videos));
  }, [videos]);

  const handleAddVideo = () => {
    const driveId = extractDriveId(inputUrl);
    if (driveId) {
        const newVideo: DriveVideo = {
            id: Date.now().toString(),
            driveId,
            title: `Projeto ${videos.length + 1}`,
            category: category
        };
        setVideos([newVideo, ...videos]);
        setInputUrl('');
    }
  };

  const handleDeleteVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Remover vídeo?')) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <h2 className="font-heading font-light text-3xl md:text-4xl text-white uppercase tracking-widest">
                Portfólio <span className="font-bold text-neon">Select</span>
            </h2>
            <p className="text-gray-500 font-sans text-xs uppercase tracking-widest mt-4 md:mt-0">
                Produções Recentes
            </p>
        </div>

        {/* Admin Input */}
        {isAdmin && (
          <div className="mb-12 bg-darkGray p-6 border border-white/10">
            <h3 className="text-neon font-bold text-xs uppercase tracking-widest mb-4">Adicionar Projeto</h3>
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Google Drive Link" 
                className="bg-black border border-white/20 text-white p-3 flex-1 text-sm outline-none focus:border-neon"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Categoria" 
                className="bg-black border border-white/20 text-white p-3 w-40 text-sm outline-none focus:border-neon"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <button onClick={handleAddVideo} className="bg-white text-black px-6 font-bold uppercase text-xs hover:bg-neon hover:text-white transition-colors">
                <Plus size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div 
                key={video.id} 
                className="group relative bg-darkGray cursor-pointer border border-white/5 hover:border-neon/50 transition-all duration-300"
                onClick={() => setSelectedVideo(video)}
            >
                {isAdmin && (
                    <button onClick={(e) => handleDeleteVideo(video.id, e)} className="absolute top-2 right-2 z-20 bg-red-600 p-1 text-white opacity-0 group-hover:opacity-100">
                        <Trash2 size={14} />
                    </button>
                )}
                
                {/* Thumbnail Container */}
                <div className="aspect-video w-full overflow-hidden relative">
                    <iframe
                        src={getDriveEmbedUrl(video.driveId)}
                        className="w-full h-full object-cover pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                        title={video.title}
                        loading="lazy"
                    ></iframe>
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-neon group-hover:text-neon transition-all duration-300">
                            <Play size={20} fill="currentColor" className="text-white group-hover:text-neon transition-colors ml-1" />
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="p-6">
                    <span className="text-neon text-[10px] font-bold uppercase tracking-widest mb-2 block">{video.category}</span>
                    <h3 className="text-white font-heading font-light text-lg uppercase tracking-wide">{video.title}</h3>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setSelectedVideo(null)}>
            <div className="w-full max-w-5xl aspect-video bg-black border border-white/10 relative shadow-2xl shadow-neon/10">
                <button className="absolute -top-10 right-0 text-white hover:text-neon transition-colors" onClick={() => setSelectedVideo(null)}>
                    <X size={24} />
                </button>
                <iframe
                    src={getDriveEmbedUrl(selectedVideo.driveId)}
                    className="w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={selectedVideo.title}
                ></iframe>
                <div className="absolute -bottom-10 left-0">
                    <h3 className="text-white font-heading font-bold uppercase tracking-widest text-sm">{selectedVideo.title}</h3>
                </div>
                <div className="absolute -bottom-10 right-0">
                     <a 
                      href={getDriveEmbedUrl(selectedVideo.driveId).replace('/preview', '/view')} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors"
                    >
                        Abrir no Drive <ExternalLink size={12} />
                    </a>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioDrive;