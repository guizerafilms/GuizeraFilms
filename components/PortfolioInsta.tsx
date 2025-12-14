import React from 'react';
import { Smartphone, Play } from 'lucide-react';
import { extractDriveId } from '../utils/urlHelpers'; // Removemos getEmbedUrl pois usaremos img
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

        {/* Grid ajustado */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {verticalVideos.map((video, index) => {
                const driveId = extractDriveId(video.url);
                // URL mágica do Drive para obter a thumbnail em alta resolução (sz=w1000)
                const thumbnailUrl = driveId ? `https://drive.google.com/thumbnail?id=${driveId}&sz=w600` : '';

                return (
                    <div 
                        key={index} 
                        // Container 9:16 rígido
                        className="relative w-full aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden group cursor-pointer border border-white/10 shadow-lg hover:border-neon/50 transition-all duration-300"
                        onClick={() => handleVideoClick(video, index)}
                    >
                        
                        {/* IMAGEM ESTÁTICA (A Solução Definitiva)
                            - Substituímos o iframe por <img>
                            - object-cover: Garante que a imagem preencha tudo sem achatar
                        */}
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

                        {/* Overlay Escuro para leitura do texto */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 pointer-events-none"></div>
                        
                        {/* Botão de Play Centralizado */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                             <div className="w-10 h-10 md:w-12 md:h-12 bg-neon/80 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,220,195,0.4)] backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                <Play size={20} className="text-black fill-current ml-1" />
                             </div>
                        </div>

                        {/* Informações do Vídeo */}
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