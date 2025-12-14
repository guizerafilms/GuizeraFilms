import React from 'react';
import { Play } from 'lucide-react';
import { extractDriveId, extractYouTubeId } from '../utils/urlHelpers';
import { PortfolioVideo } from '../types';

interface PortfolioDriveProps {
  isAdmin: boolean;
  onVideoSelect: (video: PortfolioVideo) => void;
}

const PortfolioDrive: React.FC<PortfolioDriveProps> = ({ isAdmin, onVideoSelect }) => {
  
  const videos = [
    {
      title: "Aniversário: Nayra",
      category: "ANIVERSÁRIO",
      url: "https://drive.google.com/file/d/1_j3K-5B8hQNyBpn6dXZYhgMuBLkGuOKJ/view?usp=sharing"
    },
    {
      title: "Casamento: Kathelen & Gean",
      category: "CASAMENTO",
      url: "https://drive.google.com/file/d/1BXHON8h2UQjykxBLsmYQfC6MhZdoVVuS/view?usp=sharing"
    },
    {
      title: "Casamento: Layla & Cássio",
      category: "CASAMENTO",
      url: "https://drive.google.com/file/d/1kcRj9QdAO1EMY7H5wno4HUexhgut2aGr/view?usp=sharing"
    },
    {
      title: "Rapadura: Raiz da Economia",
      category: "DOCUMENTÁRIO",
      url: "https://youtu.be/mS5IDat0cbg"
    },
    {
      title: "Na Mochila com a G (EP04)",
      category: "SÉRIE DE TURISMO",
      url: "https://www.youtube.com/watch?v=k3y9lXdpnKk&t=88s"
    },
    {
      title: "Aftermovie: N. Sra. de Fátima",
      category: "EVENTO",
      url: "https://drive.google.com/file/d/1QuYKd2We2yQ_Cyo2yHFmXTJLpDxz2wmr/view?usp=sharing"
    }
  ];

  const handleVideoClick = (video: typeof videos[0], index: number) => {
    const ytId = extractYouTubeId(video.url);
    if (ytId) {
        onVideoSelect({
            id: `drive-${index}`,
            embedId: ytId,
            title: video.title,
            category: video.category,
            url: video.url,
            platform: 'youtube'
        });
        return;
    }

    const driveId = extractDriveId(video.url);
    if (driveId) {
        onVideoSelect({
            id: `drive-${index}`,
            embedId: driveId,
            title: video.title,
            category: video.category,
            url: video.url,
            platform: 'drive'
        });
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div className="max-w-2xl">
            <h2 className="font-heading font-light text-4xl md:text-5xl text-white uppercase tracking-tight mb-4">
              Portfólio <span className="font-bold text-neon">Select</span>
            </h2>
            <div className="h-1 w-20 bg-neon rounded-full mb-4"></div>
            <p className="text-gray-400 text-sm font-sans font-light tracking-wide uppercase">
              Produções Recentes
            </p>
          </div>
        </div>

        {/* Grid ajustado para 3 colunas (lg:grid-cols-3) para igualar o layout antigo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => {
             const ytId = extractYouTubeId(video.url);
             const driveId = extractDriveId(video.url);
             
             let thumbnailUrl = '';
             if (ytId) {
                 thumbnailUrl = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
             } else if (driveId) {
                 thumbnailUrl = `https://drive.google.com/thumbnail?id=${driveId}&sz=w800`;
             }

            return (
              <div 
                key={index}
                className="group cursor-pointer"
                onClick={() => handleVideoClick(video, index)}
              >
                {/* Container da Imagem */}
                <div className="relative aspect-video bg-gray-900 overflow-hidden border border-white/5 group-hover:border-neon/50 transition-all duration-300">
                    {thumbnailUrl ? (
                        <img 
                            src={thumbnailUrl} 
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <span className="text-gray-600">Sem Capa</span>
                        </div>
                    )}
                    
                    {/* Botão Play Centralizado (Igual ao print) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-neon group-hover:bg-black/50 transition-all duration-300">
                            <Play size={20} className="text-white fill-current ml-1 group-hover:text-neon" />
                        </div>
                    </div>
                </div>

                {/* Texto Embaixo da Imagem (Restaurado) */}
                <div className="mt-4">
                    <p className="text-neon text-[10px] font-bold uppercase tracking-widest mb-1">
                        {video.category}
                    </p>
                    <h3 className="text-white text-sm font-heading uppercase tracking-wide group-hover:text-neon transition-colors">
                        {video.title}
                    </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioDrive;