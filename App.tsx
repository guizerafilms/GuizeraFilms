import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import PortfolioDrive from './components/PortfolioDrive';
import PortfolioInsta from './components/PortfolioInsta';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { getEmbedUrl, extractDriveId } from './utils/urlHelpers'; // Importação corrigida
import { PortfolioVideo } from './types';
import { X, Play } from 'lucide-react';

function App() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Controla se mostra CAPA ou VÍDEO
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

  // Lógica para detectar Vertical
  const isVertical = selectedVideo?.id?.toString().startsWith('insta-') || 
                     selectedVideo?.category === 'REELS' || 
                     selectedVideo?.category === 'STORIES';

  // Gera a URL da thumbnail em alta resolução
  const driveId = selectedVideo ? extractDriveId(selectedVideo.url) : null;
  // Truque: sz=w1200 garante alta resolução para a capa não ficar pixelada
  const thumbnailUrl = driveId ? `https://drive.google.com/thumbnail?id=${driveId}&sz=w1200` : '';

  return (
    <div className="bg-black min-h-screen font-sans">
      <Header />
      <Hero />
      
      {/* 1. Portfólios */}
      <PortfolioDrive isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      <PortfolioInsta isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      
      {/* 2. Nossa Visão (Sobre) */}
      <About />

      {/* 3. Soluções 360 (Services) - POSIÇÃO CORRIGIDA */}
      {/* Agora está DEPOIS de "Nossa Visão" e ANTES de "Contato" */}
      <Services />
      
      {/* 4. Vamos criar algo épico (Contato) */}
      <Contact />
      
      <Footer />

      {/* --- GLOBAL VIDEO MODAL --- */}
      {selectedVideo && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-0 md:p-10"
            onClick={handleCloseVideo}
        >
            <div 
                className={`relative bg-black shadow-2xl flex flex-col justify-center overflow-hidden transition-all duration-300 ${
                    isVertical 
                    ? 'w-full h-[80vh] md:h-auto md:aspect-[9/16] md:max-h-[90vh] md:max-w-[50vh] md:rounded-xl' // MOBILE: Altura travada em 80% da tela
                    : 'w-full max-w-6xl aspect-video rounded-lg'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botão Fechar (Z-Index alto para ficar acima de tudo) */}
                <button 
                    className="absolute top-4 right-4 z-[130] bg-black/60 hover:bg-neon text-white hover:text-black rounded-full p-2 transition-all duration-300 backdrop-blur-md border border-white/10"
                    onClick={handleCloseVideo}
                >
                    <X size={28} />
                </button>

                {/* --- LÓGICA DE EXIBIÇÃO --- */}
                
                {/* ESTADO 1: CAPA (Mostra a foto limpa enquanto o usuário não clica) */}
                {!isPlaying ? (
                    <div 
                        className="absolute inset-0 w-full h-full cursor-pointer group z-20"
                        onClick={() => setIsPlaying(true)}
                    >
                        {/* Imagem de Fundo */}
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

                        {/* Overlay Escuro para destacar o Play */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>

                        {/* Botão Play GIGANTE Centralizado */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-neon rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,220,195,0.6)] animate-pulse group-hover:scale-110 transition-transform duration-300">
                                <Play size={40} className="text-black fill-current ml-2" />
                            </div>
                        </div>

                        {/* Título do Vídeo (Estilo Stories) */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                            <p className="text-neon text-xs font-bold uppercase tracking-widest mb-1">Assistir Agora</p>
                            <h3 className="text-white text-lg font-heading uppercase tracking-wide leading-tight">{selectedVideo.title}</h3>
                        </div>
                    </div>
                ) : (
                    /* ESTADO 2: VÍDEO (Só carrega quando o usuário clica no Play da capa) */
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