import React, { useState, useEffect } from 'react';
import { Plus, Play, Trash2, X, ExternalLink, Loader2 } from 'lucide-react';
import { extractDriveId, getDriveEmbedUrl } from '../utils/urlHelpers';
import { DriveVideo } from '../types';

interface PortfolioDriveProps {
  isAdmin: boolean;
}

const DEFAULT_VIDEOS: DriveVideo[] = [
  { 
    id: '1', 
    driveId: '1kcRj9QdAO1EMY7H5wno4HUexhgut2aGr', 
    title: 'Casamento: Kathelen & Gean', 
    category: 'Casamento' 
  },
  { 
    id: '2', 
    driveId: '1BXHON8h2UQjykxBLsmYQfC6MhZdoVVuS', 
    title: 'Casamento: Cerimônia Completa', 
    category: 'Casamento' 
  },
  { 
    id: '3', 
    driveId: '1AagfPT9MDPoMxwWpK0Dxez18pT44OHtA', 
    title: 'Casamento: Melhores Momentos', 
    category: 'Casamento' 
  },
];

const LOCAL_STORAGE_KEY = 'guizera_drive_videos_v20';

const PortfolioDrive: React.FC<PortfolioDriveProps> = ({ isAdmin }) => {
  const [videos, setVideos] = useState<DriveVideo[]>(DEFAULT_VIDEOS);
  const [inputUrl, setInputUrl] = useState('');
  const [category, setCategory] = useState('Casamento');
  const [error, setError] = useState('');
  
  // Player state
  const [selectedVideo, setSelectedVideo] = useState<DriveVideo | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setVideos(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved videos", e);
        setVideos(DEFAULT_VIDEOS);
      }
    } else {
        setVideos(DEFAULT_VIDEOS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(videos));
  }, [videos]);

  const handleAddVideo = () => {
    setError('');
    const driveId = extractDriveId(inputUrl);
    
    if (!driveId) {
      setError('Link inválido. Certifique-se de que é um link de visualização do Google Drive.');
      return;
    }

    const newVideo: DriveVideo = {
      id: Date.now().toString(),
      driveId,
      title: `Projeto ${videos.length + 1}`,
      category: category || 'Geral'
    };

    setVideos([newVideo, ...videos]);
    setInputUrl('');
  };

  const handleDeleteVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja remover este vídeo?')) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  const openModal = (video: DriveVideo) => {
    setIsVideoLoading(true);
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsVideoLoading(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="portfolio" className="py-24 bg-[#0F031B]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Produções em <span className="text-primary">Destaque</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Confira nossa seleção de projetos recentes com qualidade cinematográfica.
          </p>
        </div>

        {/* Input Area - Only Visible to Admin */}
        {isAdmin && (
          <div className="max-w-3xl mx-auto bg-primary/10 border border-primary/30 rounded-xl p-6 mb-16 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-xs font-bold px-3 py-1 text-white rounded-bl-lg">ADMIN</div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Plus className="text-primary" /> Adicionar Vídeo do Drive
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Cole o link do Google Drive aqui..." 
                className="flex-1 bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <input 
                type="text"
                placeholder="Categoria"
                className="w-full md:w-48 bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <button 
                onClick={handleAddVideo}
                className="bg-primary hover:bg-primaryDark text-white font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
              >
                Adicionar
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div 
                key={video.id} 
                className="group bg-bgDark border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 relative cursor-pointer flex flex-col"
                onClick={() => openModal(video)}
            >
              {isAdmin && (
                <button 
                  onClick={(e) => handleDeleteVideo(video.id, e)}
                  className="absolute top-2 right-2 z-20 bg-red-500/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
              )}

              <div className="relative aspect-video bg-black w-full overflow-hidden">
                {/* Thumbnail Layer - Using iframe as thumb to ensure size match, but sanitized */}
                <div className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity">
                    <iframe
                    src={getDriveEmbedUrl(video.driveId)}
                    className="w-full h-full object-cover"
                    title={video.title}
                    tabIndex={-1}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                    ></iframe>
                </div>
                
                {/* Click Guard (Invisible layer to capture click) */}
                <div className="absolute inset-0 z-20 cursor-pointer"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                        <Play className="fill-white text-white ml-1 w-6 h-6" />
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 z-10 bg-black/70 px-3 py-1 rounded text-xs text-white backdrop-blur-sm font-bold tracking-wide pointer-events-none">
                    ASSISTIR
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">{video.category}</span>
                    <h3 className="text-white font-heading font-bold text-lg mb-2 leading-tight">{video.title}</h3>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full mt-4 group-hover:bg-primary/50 transition-colors"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedVideo && (
        <div 
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm"
            onClick={closeModal}
        >
            <div 
                className="relative w-full max-w-6xl flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top Actions Bar */}
                <div className="w-full flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <h3 className="text-white font-bold text-lg hidden md:block">{selectedVideo.title}</h3>
                        <a 
                        href={getDriveEmbedUrl(selectedVideo.driveId).replace('/preview', '/view')} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/70 hover:text-primary text-xs md:text-sm font-medium transition-colors border border-white/10 px-3 py-1 rounded-full bg-white/5"
                        >
                            <ExternalLink size={14} />
                            Abrir no Drive
                        </a>
                    </div>

                    <button 
                        onClick={closeModal}
                        className="bg-white/10 hover:bg-white hover:text-black text-white p-2 rounded-full transition-all duration-300 border border-white/20"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Video Container */}
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 relative flex items-center justify-center">
                    
                    {isVideoLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 bg-black">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                            <p className="text-gray-400 text-sm">Carregando player do Google...</p>
                        </div>
                    )}
                    
                    <iframe
                        key={selectedVideo.id} 
                        src={getDriveEmbedUrl(selectedVideo.driveId)} 
                        className="w-full h-full relative z-10 bg-black"
                        onLoad={() => setIsVideoLoading(false)}
                        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope"
                        allowFullScreen
                        width="100%"
                        height="100%"
                        loading="eager"
                        title={selectedVideo.title}
                    ></iframe>
                </div>
                
                <div className="mt-4 text-center w-full">
                    <p className="text-gray-500 text-xs">
                        * Se o player não iniciar, use o botão "Abrir no Drive" no canto superior.
                    </p>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioDrive;