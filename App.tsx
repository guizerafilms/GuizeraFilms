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

  // History API Handler
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setSelectedVideo(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenVideo = (video: PortfolioVideo) => {
    setSelectedVideo(video);
    window.history.pushState({ modalOpen: true }, '', window.location.pathname);
  };

  const handleCloseVideo = () => {
    if (selectedVideo) {
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10 backdrop-blur-md" 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
            onClick={handleCloseVideo}
        >
            <div 
                // DIRETRIZ 2: Modal simplificado.
                // O container mantém a proporção rígida para evitar "pulos" de layout.
                className={`
                    relative bg-black shadow-2xl shadow-neon/10 flex items-center justify-center overflow-hidden
                    ${isVertical 
                        // Vertical: Mobile = aspect-[9/16] e largura total (limitada pela altura da viewport)
                        ? 'aspect-[9/16] h-auto w-full max-h-[85vh] md:h-[90vh] md:w-auto' 
                        : 'aspect-video w-full max-w-6xl'
                    }
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                  className="absolute top-4 right-4 z-[120] bg-black/60 rounded-full p-2 text-white hover:text-neon transition-colors md:fixed md:top-10 md:right-10 md:bg-transparent" 
                  onClick={handleCloseVideo}
                >
                    <X size={24} className="md:w-10 md:h-10" />
                </button>
                
                {/* IFRAME: Renderização Direta (Sem estados intermediários) */}
                <iframe
                    src={getEmbedUrl(selectedVideo.platform, selectedVideo.embedId)}
                    className="absolute inset-0 w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={selectedVideo.title}
                ></iframe>
                
                {/* Desktop Extras */}
                <div className="hidden md:block absolute -bottom-12 right-0">
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