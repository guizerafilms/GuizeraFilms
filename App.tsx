import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import PortfolioDrive from './components/PortfolioDrive';
import PortfolioInsta from './components/PortfolioInsta';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { getEmbedUrl, extractDriveId } from './utils/urlHelpers'; // Adicionei extractDriveId
import { PortfolioVideo } from './types';
import { X, Play } from 'lucide-react';

function App() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Novo estado para controlar o "play"
  const [isAdmin, setIsAdmin] = useState(false);

  // Reseta o player sempre que abrir um vídeo novo
  useEffect(() => {
    if (selectedVideo) {
      setIsPlaying(false);
    }
  }, [selectedVideo]);

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  // Detecta se é vertical
  const isVertical = selectedVideo?.id?.toString().startsWith('insta-') || 
                     selectedVideo?.category === 'REELS' || 
                     selectedVideo?.category === 'STORIES';

  // Gera a URL da thumbnail em alta resolução para o Modal
  const driveId = selectedVideo ? extractDriveId(selectedVideo.url) : null;
  const thumbnailUrl = driveId ? `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000` : '';

  return (
    <div className="bg-black min-h-screen font-sans">
      <Header />
      <Hero />
      
      {/* ORDEM CORRIGIDA: Portfólio vem logo após o Hero */}
      <PortfolioDrive isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      <PortfolioInsta isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      
      {/* ORDEM CORRIGIDA: Soluções 360 (Services) desceu para cá */}
      <Services />
      
      <About />
      <Contact />
      <Footer />

      {/* --- GLOBAL VIDEO MODAL --- */}
      {selectedVideo && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
            onClick={handleCloseVideo}
        >
            <div 
                className={`relative bg-black overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-center transition-all duration-300 ${
                    isVertical 
                    ? 'w-full max-w-[50vh] aspect-[9/16] rounded-xl' // Vertical fixo
                    : 'w-full max-w-6xl aspect-video rounded-lg'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botão Fechar */}
                <button 
                    className="absolute top-4 right-4 z-[130] bg-black/60 hover:bg-neon text-white hover:text-black rounded-full p-2 transition-all duration-300 backdrop-blur-md"
                    onClick={handleCloseVideo}
                >
                    <X size={24} />
                </button>

                {/* LOGICA DO PLAYER:
                    Se NÃO estiver tocando (!isPlaying), mostra a FOTO (Capa).
                    Se estiver tocando, mostra o IFRAME (Vídeo).
                    Isso resolve o problema do vídeo aparecer "achatado" no início.
                */}
                {!isPlaying ? (
                    <div 
                        className="absolute inset-0 w-full h-full cursor-pointer group"
                        onClick={() => setIsPlaying(true)}
                    >
                        {/* Imagem de Capa (Perfeita, sem achatar) */}
                        {thumbnailUrl && (
                            <img 
                                src={thumbnailUrl} 
                                alt={selectedVideo.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        )}
                        
                        {/* Botão de Play Gigante */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-neon/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,220,195,0.6)] group-hover:scale-110 transition-transform duration-300">
                                <Play size={40} className="text-black fill-current ml-2" />
                            </div>
                        </div>

                        {/* Título sobre a capa */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                            <p className="text-neon text-xs font-bold uppercase tracking-widest mb-2">{selectedVideo.category}</p>
                            <h3 className="text-white text-xl font-heading uppercase tracking-wide">{selectedVideo.title}</h3>
                        </div>
                    </div>
                ) : (
                    /* O Player real só carrega quando o usuário pede */
                    <iframe 
                        src={getEmbedUrl(selectedVideo.platform, selectedVideo.embedId)}
                        className="w-full h-full"
                        title={selectedVideo.title}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        style={{ border: 0 }}
                    ></iframe>
                )}

            </div>
        </div>
      )}
    </div>
  );
}

export default App;