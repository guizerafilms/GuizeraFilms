import React from 'react';
import { Smartphone, Play } from 'lucide-react';
import { getDriveEmbedUrl, extractDriveId } from '../utils/urlHelpers';
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

        {/* Vertical Grid - Atualizado para Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {verticalVideos.map((video, index) => {
                const driveId = extractDriveId(video.url);
                const embedUrl = driveId ? getDriveEmbedUrl(driveId) : '';

                return (
                    <div 
                        key={index} 
                        // MOBILE FIX: Altura fixa (h-72 / aprox 288px) para garantir alinhamento perfeito na grade de 2 colunas.
                        // DESKTOP: aspect-[9/16] para manter proporção correta.
                        className="relative w-full h-72 md:h-auto md:aspect-[9/16] bg-black border border-white/5 group overflow-hidden flex flex-col items-center justify-center hover:border-neon/30 transition-all duration-500 cursor-pointer rounded-sm"
                        onClick={() => handleVideoClick(video, index)}
                    >
                        
                        {/* Iframe Background */}
                        {embedUrl ? (
                            <iframe 
                                src={embedUrl}
                                // MOBILE: Grayscale removido (grayscale-0) e opacidade ajustada para visibilidade.
                                // DESKTOP: Grayscale ativado por padrão, removido no hover.
                                className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-500 grayscale-0 md:grayscale opacity-70 md:opacity-60 md:group-hover:opacity-100 md:group-hover:grayscale-0"
                                title={video.title}
                                loading="lazy"
                            ></iframe>
                        ) : (
                            <div className="absolute inset-0 bg-gray-900"></div>
                        )}

                        {/* Overlay Gradient - SEMPRE VISÍVEL NO MOBILE para garantir leitura do texto */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Info Content - SEMPRE VISÍVEL NO MOBILE */}
                        <div className="absolute bottom-4 left-0 w-full px-2 text-center z-20 pointer-events-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                             <div className="flex justify-center mb-2">
                                <Smartphone className="text-neon w-4 h-4 md:w-6 md:h-6" />
                             </div>
                             <p className="text-neon text-[8px] font-bold uppercase tracking-widest mb-1 truncate">{video.category}</p>
                             <h3 className="text-white text-[9px] md:text-[10px] font-heading uppercase tracking-wide leading-tight line-clamp-2">{video.title}</h3>
                        </div>

                        {/* Play Button - PADRONIZADO (Outline) e SEMPRE VISÍVEL NO MOBILE */}
                        <div 
                            className="absolute inset-0 z-30 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <div className="border border-white/40 bg-black/20 backdrop-blur-[2px] text-white p-3 rounded-full transform scale-75 md:scale-50 md:group-hover:scale-100 transition-all duration-300 shadow-sm md:shadow-lg hover:bg-neon hover:border-neon hover:text-white">
                                <Play size={20} fill="currentColor" className="ml-1" />
                            </div>
                        </div>

                        {/* Scanline Effect - Apenas Desktop */}
                        <div className="hidden md:block absolute inset-0 bg-white/5 h-[1px] w-full animate-float opacity-0 group-hover:opacity-20 pointer-events-none"></div>
                    </div>
                );
            })}
        </div>
        
      </div>
    </section>
  );
};

export default PortfolioInsta;