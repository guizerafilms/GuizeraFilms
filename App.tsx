import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import PortfolioDrive from './components/PortfolioDrive';
import PortfolioInsta from './components/PortfolioInsta';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { getEmbedUrl, extractDriveId } from './utils/urlHelpers'; // Importação atualizada
import { PortfolioVideo } from './types';
import { X, Play } from 'lucide-react';

function App() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Novo estado: Controla se mostra Capa ou Vídeo
  const [isAdmin, setIsAdmin] = useState(false);

  // Reseta o player para o estado "Capa" sempre que abrir um novo vídeo
  useEffect(() => {
    if (selectedVideo) {
      setIsPlaying(false);
    }
  }, [selectedVideo]);

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  // Detecta se o vídeo é vertical (Reels/Stories)
  const isVertical = selectedVideo?.id?.toString().startsWith('insta-') || 
                     selectedVideo?.category === 'REELS' || 
                     selectedVideo?.category === 'STORIES';

  // Gera a URL da imagem de capa em alta resolução (sz=w1200)
  const driveId = selectedVideo ? extractDriveId(selectedVideo.url) : null;
  const thumbnailUrl = driveId ? `https://drive.google.com/thumbnail?id=${driveId}&sz=w1200` : '';

  return (
    <div className="bg-black min-h-screen font-sans">
      <Header />
      <Hero />
      
      {/* 1. SEÇÃO DE VÍDEOS (Portfólio) */}
      <PortfolioDrive isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      <PortfolioInsta isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      
      {/* 2. NOSSA VISÃO (About) */}
      <About />

      {/* 3. SOLUÇÕES 360 (Services) - MOVIDO PARA CÁ */}
      {/* Conforme pedido: Abaixo de 'Nossa Visão' e Acima de 'Vamos criar algo épico' */}
      <Services />
      
      {/* 4. CONTATO (Vamos criar algo épico) */}
      <Contact />
      
      <Footer />

      {/* --- GLOBAL VIDEO MODAL --- */}
      {selectedVideo && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-0 md:p-10"
            onClick={handleCloseVideo} // Clicar fora fecha
        >
            <div 
                className={`relative bg-black shadow-2xl flex flex-col justify-center overflow-hidden transition-all duration-300 ${
                    isVertical 
                    ? 'w-full h-[80vh] md:h-auto md:aspect-[9/16] md:max-h-[90vh] md:max-w-[50vh] md:rounded-xl' // MOBILE: Altura fixa 80% da tela (sem achatar)
                    : 'w-full max-w-6xl aspect-video rounded-lg'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botão Fechar (Sempre visível acima de tudo) */}
                <button 
                    className="absolute top-4 right-4 z-[130] bg-black/60 hover:bg-neon text-white hover:text-black rounded-full p-2 transition-all duration-300 backdrop-blur-md border border-white/10"
                    onClick={handleCloseVideo}
                >
                    <X size={28} />
                </button>

                {/* --- LÓGICA INTELIGENTE DE EXIBIÇÃO --- */}
                
                {/* ESTADO 1: CAPA (Mostra a foto perfeita enquanto não clica no Play) */}
                {!isPlaying ? (
                    <div 
                        className="absolute inset-0 w-full h-full cursor-pointer group z-20"
                        onClick={() => setIsPlaying(true)}
                    >
                        {/* Imagem de Fundo (Cobre tudo, sem bordas pretas) */}
                        {thumbnailUrl ? (
                            <img 
                                src={thumbnailUrl} 
                                alt={selectedVideo.title}
                                className="w-full h-full object-cover opacity-100"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                <span className="text-gray-500">Carregando...</span>
                            </div>
                        )}

                        {/* Máscara escura para destacar o texto */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>

                        {/* Botão Play GIGANTE Centralizado */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-neon rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,220,195,0.6)] animate-pulse group-hover:scale-110 transition-transform duration-300">
                                <Play size={40} className="text-black fill-current ml-2" />
                            </div>
                        </div>

                        {/* Título do Vídeo (Estilo Stories) */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                            <p className="text-neon text-xs font-bold uppercase tracking-widest mb-1">Assistir Agora</p>
                            <h3 className="text-white text-lg font-heading uppercase tracking-wide leading-tight drop-shadow-lg">{selectedVideo.title}</h3>
                        </div>
                    </div>
                ) : (
                    /* ESTADO 2: VÍDEO (Só carrega quando o usuário pede) */
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