import React from 'react';
import { Smartphone, Play } from 'lucide-react';
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
        url: "https://res.cloudinary.com/dqhyh172p/video/upload/v1765678301/Aniversario_De-64-Anos_De_Rio_Do_Pires-2_wwfcmd.mp4" 
    },
    {
        title: "Comício na Varzinha",
        category: "CAMPANHA POLÍTICA",
        url: "https://res.cloudinary.com/dqhyh172p/video/upload/v1765678282/Comicio_Varzinha_ytzuf0.mp4"
    },
    {
        title: "Retrospectiva Gestão",
        category: "INSTITUCIONAL",
        url: "https://res.cloudinary.com/dqhyh172p/video/upload/v1765678310/Aniversario_De_Rio_Do_Pires_cobsdo.mp4"
    },
    {
        title: "Joane: Growth Academia",
        category: "FITNESS / ACADEMIA",
        url: "https://res.cloudinary.com/dqhyh172p/video/upload/v1765678287/Joane--Growth_qfrgd6.mp4"
    },
    {
        title: "Lançamento: Studio Gregório",
        category: "PUBLICITÁRIO",
        url: "https://res.cloudinary.com/dqhyh172p/video/upload/v1765678289/03--Prova_Social--Depoimento_txpuzh.mp4"
    }
  ];

  const handleVideoClick = (video: typeof verticalVideos[0], index: number) => {
    onVideoSelect({
        id: `insta-${index}`,
        embedId: video.url,
        title: video.title,
        category: video.category,
        url: video.url,
        platform: 'cloudinary'
    });
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {verticalVideos.map((video, index) => {
                const thumbnailUrl = video.url.replace(/\.(mp4|mov|avi)$/, '.jpg');

                return (
                    <div 
                        key={index} 
                        className="relative w-full aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden group cursor-pointer border border-white/10 shadow-lg hover:border-neon/50 transition-all duration-300"
                        onClick={() => handleVideoClick(video, index)}
                    >
                        {thumbnailUrl ? (
                            <img 
                                src={thumbnailUrl}
                                alt={video.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                loading="lazy"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                <Smartphone className="text-gray-600" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 pointer-events-none"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                             <div className="w-10 h-10 md:w-12 md:h-12 bg-neon/80 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,220,195,0.4)] backdrop-blur-sm group-hover:scale-100 transition-transform duration-300">
                                <Play size={20} className="text-black fill-current ml-1" />
                             </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 z-30 pointer-events-none text-left">
                             <p className="text-neon text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1">{video.category}</p>
                             <h3 className="text-white text-xs md:text-sm font-heading uppercase tracking-wide leading-tight line-clamp-2 drop-shadow-md">{video.title}</h3>
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