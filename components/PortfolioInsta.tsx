import React from 'react';
import { Smartphone, Play } from 'lucide-react';
import { extractDriveId, getEmbedUrl } from '../utils/urlHelpers';
import { PortfolioVideo } from '../types';

interface PortfolioInstaProps {
  isAdmin: boolean;
  onVideoSelect: (video: PortfolioVideo) => void;
}

const PortfolioInsta: React.FC<PortfolioInstaProps> = ({ isAdmin, onVideoSelect }) => {
  
  const verticalVideos = [
    {
        title: "Aniversário: Rio do Pires (64 Anos)",
        category: "AFTERMOVIE",
        url: "https://drive.google.com/file/d/1FRLjHXbuwQtKIwkckwRY50jA3TVUUCvU/view?usp=sharing"
    },
    {
        title: "Comício na Varzinha",
        category: "CAMPANHA POLÍTICA",
        url: "https://drive.google.com/file/d/1Djty4MWzciUfy9vdQvGov9m9p68Fdz9n/view?usp=sharing"
    },
    {
        title: "Retrospectiva Guizera Films",
        category: "INSTITUCIONAL",
        url: "https://drive.google.com/file/d/1_O1Imx7CM5xLXzlo4EIYdf9Bxs7qgUum/view?usp=sharing"
    },
    {
        title: "Joane: Growth Academia",
        category: "FITNESS / ACADEMIA",
        url: "https://drive.google.com/file/d/1wsQWgqiQZhEo-SSZt5X0eEQDC1idTekx/view?usp=sharing"
    },
    {
        title: "Lançamento: Studio Gregório",
        category: "PUBLICITÁRIO",
        url: "https://drive.google.com/file/d/1YlE1_11mXDBktSUhOY2sU5pO1FEgjLYp/view?usp=sharing"
    }
  ];

  const handleVideoClick = (video: typeof verticalVideos[0], index: number) => {
    const driveId = extractDriveId(video.url);
    if (driveId) {
        onVideoSelect({
            id: `insta-${index}`,
            embedId: driveId,
            title: video.title,
            category: video.category,
            url: video.url,
            platform: 'drive'
        });
    }
  };

  return (
    <section id="verticais" className="py-24 bg-darkGray border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
            <h2 className="font-heading font-light text-3xl md:text-5xl text-white uppercase tracking-widest mb-4">
                Produções <span className="font-bold text-neon">Verticais</span>
            </h2>
            <p className="text-gray-500 text-xs font-sans uppercase tracking-widest max-w-lg mx-auto">
                Reels, Stories e TikToks com qualidade cinematográfica.
            </p>
        </div>

        {/* Vertical Grid - Reestruturado conforme diretriz técnica */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {verticalVideos.map((video, index) => {
                const driveId = extractDriveId(video.url);
                const embedUrl = driveId ? getEmbedUrl('drive', driveId) : '';

                return (
                    <div 
                        key={index} 
                        // DIRETRIZ 1: Container com aspect-ratio: 9/16, relative e overflow-hidden.
                        // Removemos flex/justify para evitar comportamento inesperado de alinhamento.
                        className="relative w-full aspect-[9/16] bg-black overflow-hidden group cursor-pointer border border-white/5 md:hover:border-neon/30 transition-all duration-300"
                        onClick={() => handleVideoClick(video, index)}
                    >
                        
                        {/* Iframe Background - DIRETRIZ 1: Absolute, top 0, left 0, w-full, h-full, object-cover */}
                        {embedUrl ? (
                            <iframe 
                                src={embedUrl}
                                // pointer-events-none é CRUCIAL aqui:
                                // Impede que o clique seja capturado pelo iframe (play/pause interno).
                                // O clique passa para a DIV pai, que abre o Modal.
                                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none grayscale-0 md:grayscale opacity-80 md:opacity-60 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all duration-500"
                                title={video.title}
                                loading="lazy"
                                scrolling="no"
                                style={{ border: 'none' }}
                            ></iframe>
                        ) : (
                            <div className="absolute inset-0 bg-gray-900"></div>
                        )}

                        {/* Visual Overlay (Gradiente para texto) */}
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none"></div>
                        
                        {/* Info Content */}
                        <div className="absolute bottom-3 left-0 w-full px-2 text-center z-20 pointer-events-none">
                             <div className="flex justify-center mb-1">
                                <Smartphone className="text-neon w-4 h-4 md:w-6 md:h-6" />
                             </div>
                             <p className="text-neon text-[8px] font-bold uppercase tracking-widest mb-1 truncate px-1">{video.category}</p>
                             <h3 className="text-white text-[9px] md:text-[10px] font-heading uppercase tracking-wide leading-tight line-clamp-2 px-1">{video.title}</h3>
                        </div>

                        {/* Play Button Overlay - Centralizado */}
                        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/40 backdrop-blur-sm border border-white/20 p-3 rounded-full">
                                <Play size={20} fill="currentColor" className="text-white ml-1" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        
      </div>
    </section>
  );
};

export default PortfolioInsta;