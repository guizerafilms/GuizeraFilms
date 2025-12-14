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
  // Estado para controlar qual vídeo está aberto
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  
  // Estado simples de admin (mantendo sua lógica original se houver)
  const [isAdmin, setIsAdmin] = useState(false);

  // Função para fechar o modal
  const handleCloseVideo = () => setSelectedVideo(null);

  // Lógica Inteligente: Detecta se o vídeo é vertical
  // Se o ID começar com "insta-" (definido no PortfolioInsta) ou a categoria for típica de vertical
  const isVertical = selectedVideo?.id?.toString().startsWith('insta-') || 
                     selectedVideo?.category === 'REELS' || 
                     selectedVideo?.category === 'STORIES';

  return (
    <div className="bg-black min-h-screen font-sans">
      <Header />
      <Hero />
      <Services />
      
      {/* Seção Horizontal */}
      <PortfolioDrive isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      
      {/* Seção Vertical (Reels/TikTok) */}
      <PortfolioInsta isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      
      <About />
      <Contact />
      <Footer />

      {/* --- GLOBAL VIDEO MODAL --- */}
      {selectedVideo && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
            onClick={handleCloseVideo} // Clicar fora fecha
        >
            
            {/* Container do Player */}
            <div 
                className={`relative bg-black overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-center ${
                    isVertical 
                    ? 'w-full max-w-[50vh] aspect-[9/16] max-h-[85vh] rounded-xl' // VERTICAL: Trava a proporção de celular
                    : 'w-full max-w-6xl aspect-video rounded-lg' // HORIZONTAL: Tela de cinema
                }`}
                onClick={(e) => e.stopPropagation()} // Clicar dentro NÃO fecha
            >
                
                {/* Botão Fechar (Sempre visível acima do iframe) */}
                <button 
                    className="absolute top-4 right-4 z-[120] bg-black/60 hover:bg-neon text-white hover:text-black rounded-full p-2 transition-all duration-300"
                    onClick={handleCloseVideo}
                >
                    <X size={24} />
                </button>

                {/* IFRAME: Renderização Direta */}
                <iframe 
                    src={getEmbedUrl(selectedVideo.platform, selectedVideo.embedId)}
                    className="w-full h-full"
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