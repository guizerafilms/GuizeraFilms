import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import PortfolioDrive from './components/PortfolioDrive';
import PortfolioInsta from './components/PortfolioInsta';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { PortfolioVideo } from './types';
import { X, ExternalLink } from 'lucide-react';
import { getEmbedUrl } from './utils/urlHelpers';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // History API Handler: Fecha o modal ao clicar no botão Voltar do navegador
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Se o usuário clicar em voltar, o modal fecha
      setSelectedVideo(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Wrapper para abrir vídeo e adicionar estado no histórico
  const handleOpenVideo = (video: PortfolioVideo) => {
    setSelectedVideo(video);
    // Adiciona uma entrada no histórico para que o botão "Voltar" funcione
    window.history.pushState({ modalOpen: true }, '', window.location.pathname);
  };

  // Wrapper para fechar vídeo (chama history.back para manter consistência)
  const handleCloseVideo = () => {
    if (selectedVideo) {
      // Ao invés de setar null direto, voltamos no histórico.
      // O listener 'popstate' vai capturar isso e fechar o modal.
      window.history.back();
    }
  };

  const isVertical = selectedVideo?.id.startsWith('insta');

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-neon selection:text-white">
      <Header />
      <main>
        <Hero />
        <PortfolioDrive isAdmin={isAdmin} onVideoSelect={handleOpenVideo} />
        <PortfolioInsta isAdmin={isAdmin} onVideoSelect={handleOpenVideo} />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
      {isAdmin && (
        <div className="fixed bottom-4 right-4 bg-neon text-white text-[10px] px-3 py-1 uppercase tracking-widest z-50 opacity-70 pointer-events-none shadow-lg font-bold">
          Admin Mode
        </div>
      )}

      {/* GLOBAL VIDEO MODAL */}
      {selectedVideo && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10 backdrop-blur-sm" 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
            onClick={handleCloseVideo}
        >
            <div 
                className={`
                    bg-black border-none md:border md:border-white/10 relative shadow-2xl shadow-neon/10 
                    ${isVertical 
                        // CSS FIX CRÍTICO PARA MOBILE:
                        // 1. Removido h-full. O h-full forçava o vídeo a esticar.
                        // 2. aspect-[9/16] força o formato correto do player.
                        // 3. max-h-[80vh] garante que em celulares muito altos, ele não fique gigante, e em celulares pequenos ele caiba.
                        // 4. w-full faz ele usar a largura disponível até atingir o limite de aspect ratio.
                        ? 'w-full aspect-[9/16] max-h-[85vh] md:w-auto md:h-[90vh]' 
                        : 'w-full aspect-video max-w-6xl'
                    }
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* 
                  Close Button
                  Mobile: Fixed top-right, Z-index alto.
                */}
                <button 
                  className="fixed top-4 right-4 z-[120] bg-black/60 rounded-full p-2 md:absolute md:-top-10 md:-right-10 md:bg-transparent md:p-2 text-white hover:text-neon transition-colors" 
                  onClick={handleCloseVideo}
                >
                    <X size={24} className="md:w-8 md:h-8" />
                </button>
                
                {/* IFRAME - Lógica unificada de Embed */}
                <iframe
                    src={getEmbedUrl(selectedVideo.platform, selectedVideo.embedId)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={selectedVideo.title}
                ></iframe>

                {/* Footer Info (Desktop Only) */}
                <div className="absolute -bottom-8 left-0 hidden md:block">
                    <h3 className="text-gray-400 font-heading text-xs uppercase tracking-widest">{selectedVideo.title}</h3>
                </div>
                
                {/* External Link */}
                <div className="hidden md:block absolute -bottom-10 right-0">
                     <a 
                      href={selectedVideo.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors bg-black/50 px-3 py-1 rounded-full border border-white/10"
                    >
                        Abrir Original <ExternalLink size={12} />
                    </a>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;