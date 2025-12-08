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
import { getDriveEmbedUrl, getYoutubeEmbedUrl } from './utils/urlHelpers';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const isVertical = selectedVideo?.id.startsWith('insta');

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-neon selection:text-white">
      <Header />
      <main>
        <Hero />
        <PortfolioDrive isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
        <PortfolioInsta isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-10 backdrop-blur-sm" 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
            onClick={() => setSelectedVideo(null)}
        >
            <div 
                className={`
                    bg-black border border-white/10 relative shadow-2xl shadow-neon/10 
                    ${isVertical 
                        ? 'w-full aspect-[9/16] md:w-auto md:h-[85vh]' 
                        : 'w-full aspect-video max-w-5xl'
                    }
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="absolute -top-10 right-0 text-white hover:text-neon transition-colors" onClick={() => setSelectedVideo(null)}>
                    <X size={24} />
                </button>
                
                <iframe
                    src={selectedVideo.platform === 'youtube' ? getYoutubeEmbedUrl(selectedVideo.embedId) : getDriveEmbedUrl(selectedVideo.embedId)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    title={selectedVideo.title}
                ></iframe>

                <div className="absolute -bottom-10 left-0">
                    <h3 className="text-white font-heading font-bold uppercase tracking-widest text-sm truncate max-w-[200px] md:max-w-none">{selectedVideo.title}</h3>
                </div>
                <div className="absolute -bottom-10 right-0">
                     <a 
                      href={selectedVideo.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors"
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