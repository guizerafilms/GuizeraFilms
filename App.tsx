import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import PortfolioDrive from './components/PortfolioDrive';
import PortfolioInsta from './components/PortfolioInsta';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { getEmbedUrl } from './utils/urlHelpers';
import { PortfolioVideo } from './types';
import { X } from 'lucide-react';

function App() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleCloseVideo = () => setSelectedVideo(null);

  // Detecta se é vertical
  const isVertical = selectedVideo?.id?.toString().startsWith('insta-') || 
                     selectedVideo?.category === 'REELS' || 
                     selectedVideo?.category === 'STORIES';

  return (
    <div className="bg-black min-h-screen font-sans">
      <Header />
      <Hero />
      
      {/* 1. Portfólio (Vídeos) */}
      <PortfolioDrive isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      <PortfolioInsta isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      
      {/* 2. Nossa Visão (Sobre) */}
      <About />

      {/* 3. Soluções 360 (Services) - MOVIDO PARA CÁ (Abaixo de Nossa Visão) */}
      <Services />
      
      {/* 4. Vamos criar algo épico (Contato) - (Abaixo de Soluções 360) */}
      <Contact />
      
      <Footer />

      {/* --- GLOBAL VIDEO MODAL --- */}
      {selectedVideo && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-0 md:p-10"
            onClick={handleCloseVideo}
        >
            <div 
                className={`relative bg-black shadow-2xl flex flex-col justify-center overflow-hidden ${
                    isVertical 
                    ? 'w-full h-[85vh] md:h-auto md:aspect-[9/16] md:max-h-[90vh] md:max-w-[50vh] md:rounded-xl' // MOBILE: Força altura de 85% da tela direto
                    : 'w-full max-w-6xl aspect-video rounded-lg'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botão Fechar (Fica SOBRE o vídeo, no canto superior) */}
                <button 
                    className="absolute top-4 right-4 z-[130] bg-black/50 hover:bg-neon text-white hover:text-black rounded-full p-2 transition-all duration-300 backdrop-blur-md"
                    onClick={handleCloseVideo}
                >
                    <X size={28} />
                </button>

                {/* IFRAME DIRETO (Sem clique extra de capa)
                    - h-full w-full: Preenche o container de 85vh definido acima.
                    - allow="autoplay": Tenta iniciar o mais rápido possível.
                */}
                <iframe 
                    src={getEmbedUrl(selectedVideo.platform, selectedVideo.embedId)}
                    className="w-full h-full object-cover"
                    title={selectedVideo.title}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    style={{ border: 0 }}
                ></iframe>

            </div>
        </div>
      )}
    </div>
  );
}

export default App;