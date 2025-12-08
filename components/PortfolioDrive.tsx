import React, { useState, useEffect } from 'react';
import { Plus, Play, Trash2 } from 'lucide-react';
import { 
    extractDriveId, 
    extractYoutubeId, 
    getYoutubeThumbnailUrl,
    getDriveEmbedUrl
} from '../utils/urlHelpers';
import { PortfolioVideo } from '../types';

interface PortfolioDriveProps {
  isAdmin: boolean;
  onVideoSelect: (video: PortfolioVideo) => void;
}

// LISTA DEFINITIVA MISTA (DRIVE & YOUTUBE)
const PRESET_VIDEOS: PortfolioVideo[] = [
  { 
    id: '1', 
    title: 'Aniversário: Nayra', 
    category: 'ANIVERSÁRIO', 
    url: 'https://drive.google.com/file/d/1_j3K-5B8hQNyBpn6dXZYhgMuBLkGuOKJ/view?usp=sharing',
    platform: 'drive',
    embedId: '1_j3K-5B8hQNyBpn6dXZYhgMuBLkGuOKJ'
  },
  { 
    id: '2', 
    title: 'Casamento: Kathelen & Gean', 
    category: 'CASAMENTO', 
    url: 'https://drive.google.com/file/d/1BXHON8h2UQjykxBLsmYQfC6MhZdoVVuS/view?usp=sharing',
    platform: 'drive',
    embedId: '1BXHON8h2UQjykxBLsmYQfC6MhZdoVVuS'
  },
  { 
    id: '3', 
    title: 'Casamento: Layla & Cassio', 
    category: 'CASAMENTO', 
    url: 'https://drive.google.com/file/d/1kcRj9QdAO1EMY7H5wno4HUexhgut2aGr/view?usp=sharing',
    platform: 'drive',
    embedId: '1kcRj9QdAO1EMY7H5wno4HUexhgut2aGr'
  },
  { 
    id: '4', 
    title: 'Doc: Rapadura e Economia', 
    category: 'DOCUMENTÁRIO', 
    url: 'https://youtu.be/mS5IDat0cbg',
    platform: 'youtube',
    embedId: 'mS5IDat0cbg'
  },
  { 
    id: '5', 
    title: 'Na Mochila com a G (Ep. 04)', 
    category: 'SÉRIE DE TURISMO', 
    url: 'https://www.youtube.com/watch?v=k3y9lXdpnKk&t=88s',
    platform: 'youtube',
    embedId: 'k3y9lXdpnKk'
  },
  { 
    id: '6', 
    title: 'Aftermovie: N. Sra. de Fátima', 
    category: 'EVENTO', 
    url: 'https://drive.google.com/file/d/1QuYKd2We2yQ_Cyo2yHFmXTJLpDxz2wmr/view?usp=sharing',
    platform: 'drive',
    embedId: '1QuYKd2We2yQ_Cyo2yHFmXTJLpDxz2wmr'
  }
];

const LOCAL_STORAGE_KEY = 'guizera_portfolio_v2';

const PortfolioDrive: React.FC<PortfolioDriveProps> = ({ isAdmin, onVideoSelect }) => {
  const [videos, setVideos] = useState<PortfolioVideo[]>(PRESET_VIDEOS);
  const [inputUrl, setInputUrl] = useState('');
  const [category, setCategory] = useState('Geral');
  
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
    // Tenta identificar Youtube
    const youtubeId = extractYoutubeId(inputUrl);
    if (youtubeId) {
        const newVideo: PortfolioVideo = {
            id: Date.now().toString(),
            embedId: youtubeId,
            title: `Projeto YT ${videos.length + 1}`,
            category: category,
            url: inputUrl,
            platform: 'youtube'
        };
        setVideos([newVideo, ...videos]);
        setInputUrl('');
        return;
    }

    // Tenta identificar Drive
    const driveId = extractDriveId(inputUrl);
    if (driveId) {
        const newVideo: PortfolioVideo = {
            id: Date.now().toString(),
            embedId: driveId,
            title: `Projeto Drive ${videos.length + 1}`,
            category: category,
            url: inputUrl,
            platform: 'drive'
        };
        setVideos([newVideo, ...videos]);
        setInputUrl('');
        return;
    }

    alert('URL inválida. Use links do Google Drive ou YouTube.');
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
            <h3 className="text-neon font-bold text-xs uppercase tracking-widest mb-4">Adicionar Projeto (YouTube ou Drive)</h3>
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Link do Vídeo" 
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
                onClick={() => onVideoSelect(video)}
            >
                {isAdmin && (
                    <button onClick={(e) => handleDeleteVideo(video.id, e)} className="absolute top-2 right-2 z-20 bg-red-600 p-1 text-white opacity-0 group-hover:opacity-100">
                        <Trash2 size={14} />
                    </button>
                )}
                
                {/* Thumbnail Container */}
                <div className="aspect-video w-full overflow-hidden relative bg-black">
                    {video.platform === 'youtube' ? (
                        <img 
                            src={getYoutubeThumbnailUrl(video.embedId)} 
                            alt={video.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                        />
                    ) : (
                        <iframe
                            src={getDriveEmbedUrl(video.embedId)}
                            className="w-full h-full object-cover pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                            title={video.title}
                            loading="lazy"
                            tabIndex={-1}
                        ></iframe>
                    )}
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-neon group-hover:text-neon transition-all duration-300 bg-black/20">
                            <Play size={20} fill="currentColor" className="text-white group-hover:text-neon transition-colors ml-1" />
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="p-6">
                    <span className="text-neon text-[10px] font-bold uppercase tracking-widest mb-2 block">{video.category}</span>
                    <h3 className="text-white font-heading font-light text-lg uppercase tracking-wide leading-tight">{video.title}</h3>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioDrive;