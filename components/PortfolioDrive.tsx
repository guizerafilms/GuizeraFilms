import React from 'react';
import { Play } from 'lucide-react';
import { extractDriveId, extractYouTubeId } from '../utils/urlHelpers';
import { PortfolioVideo } from '../types';

interface PortfolioDriveProps {
  isAdmin: boolean;
  onVideoSelect: (video: PortfolioVideo) => void;
}

const PortfolioDrive: React.FC<PortfolioDriveProps> = ({ isAdmin, onVideoSelect }) => {
  
  // Lista Completa de Vídeos Horizontais (YouTube e Drive)
  const videos = [
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
      title: "Festa N. Sra. de Fátima",
      category: "AFTERMOVIE",
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
            <h2 className="font-heading font-light text-4xl md:text-6xl text-white uppercase tracking-tight mb-4">
              Portfólio <span className="font-bold text-neon">Select</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-sans font-light tracking-wide">
              Uma curadoria dos nossos melhores filmes, documentários e campanhas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                className="group relative aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer border border-white/5 hover:border-neon/50 transition-all duration-500"
                onClick={() => handleVideoClick(video, index)}
              >
                {thumbnailUrl ? (
                    <img 
                        src={thumbnailUrl} 
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <span className="text-gray-600">Sem Capa</span>
                    </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="bg-neon text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
                      {video.category}
                    </span>
                    {ytId && <span className="text-white/50 text-[10px] uppercase tracking-widest flex items-center gap-1"><Play size={10} /> YouTube</span>}
                  </div>
                  <h3 className="text-2xl font-heading text-white uppercase tracking-wide mb-2 group-hover:text-neon transition-colors">
                    {video.title}
                  </h3>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-neon/90 flex items-center justify-center shadow-[0_0_30px_rgba(34,220,195,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-500">
                    <Play className="w-6 h-6 text-black fill-current ml-1" />
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

export default PortfolioDrive;