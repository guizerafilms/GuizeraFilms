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

        {/* Vertical Grid - Atualizado para 5 colunas no desktop se possível, ou grid auto-fit */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {verticalVideos.map((video, index) => {
                const driveId = extractDriveId(video.url);
                const embedUrl = driveId ? getDriveEmbedUrl(driveId) : '';

                return (
                    <div 
                        key={index} 
                        className="aspect-[9/16] bg-black border border-white/5 group relative overflow-hidden flex flex-col items-center justify-center hover:border-neon/30 transition-colors duration-500 cursor-pointer"
                        onClick={() => handleVideoClick(video, index)}
                    >
                        
                        {/* Iframe Background */}
                        {embedUrl ? (
                            <iframe 
                                src={embedUrl}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0 pointer-events-none"
                                title={video.title}
                                loading="lazy"
                            ></iframe>
                        ) : (
                            <div className="absolute inset-0 bg-gray-900"></div>
                        )}

                        {/* Overlay Gradient (some ao passar o mouse para ver o video melhor) */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none group-hover:opacity-0 transition-opacity duration-300"></div>
                        
                        {/* Info Content */}
                        <div className="absolute bottom-4 left-0 w-full px-4 text-center z-20 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                             <div className="flex justify-center mb-2">
                                <Smartphone className="text-neon w-6 h-6" />
                             </div>
                             <p className="text-neon text-[8px] font-bold uppercase tracking-widest mb-1">{video.category}</p>
                             <h3 className="text-white text-[10px] font-heading uppercase tracking-wide leading-tight">{video.title}</h3>
                        </div>

                        {/* External Link Button (appears on hover) */}
                        <div 
                            className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]"
                        >
                            <div className="bg-neon text-white p-3 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-neon/50">
                                <Play size={20} fill="currentColor" />
                            </div>
                        </div>

                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-white/5 h-[1px] w-full animate-float opacity-0 group-hover:opacity-20 pointer-events-none"></div>
                    </div>
                );
            })}
        </div>
        
      </div>
    </section>
  );
};

export default PortfolioInsta;