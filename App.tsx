import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import PortfolioDrive from './components/PortfolioDrive';
import PortfolioInsta from './components/PortfolioInsta';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { getEmbedUrl, extractDriveId } from './utils/urlHelpers';
import { PortfolioVideo } from './types';
import { X } from 'lucide-react';

function App() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleCloseVideo = () => setSelectedVideo(null);

  // Detecta se é vídeo vertical (Reels/Stories)
  const isVertical = selectedVideo?.id?.toString().startsWith('insta-') || 
                     selectedVideo?.category === 'REELS' || 
                     selectedVideo?.category === 'STORIES';

  // Pega o ID do Drive
  const driveId = selectedVideo ? extractDriveId(selectedVideo.url) : null;
  
  // URL DE STREAM DIRETO (O Segredo para Mobile)
  // Isso faz o navegador tratar o arquivo como um vídeo nativo, ignorando o player ruim do Drive
  const directVideoUrl = driveId ? `https://drive.google.com/uc?export=download&id=${driveId}` : '';

  return (
    <div className="bg-black min-h-screen font-sans">
      <Header />
      <Hero />
      
      {/* 1. SEÇÃO DE VÍDEOS (Portfólio) */}
      <PortfolioDrive isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      <PortfolioInsta isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      
      {/* 2. NOSSA VISÃO (About) */}
      <About />

      {/* 3. SOLUÇÕES 360 (Services) - ORDEM CORRIGIDA */}
      {/* Agora está DEPOIS de "Nossa Visão" e ANTES de "Contato" */}
      <Services />
      
      {/* 4. CONTATO (Vamos criar algo épico) */}
      <Contact />
      
      <Footer />

      {/* --- GLOBAL VIDEO MODAL --- */}
      {selectedVideo && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-0 md:p-4"
            onClick={handleCloseVideo}
        >
            <div 
                className={`relative bg-black flex flex-col justify-center overflow-hidden shadow-2xl ${
                    isVertical 
                    ? 'w-full h-full md:h-[90vh] md:w-auto md:aspect-[9/16] md:rounded-xl' // Mobile: Tela Cheia Real
                    : 'w-full max-w-6xl aspect-video rounded-lg'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botão Fechar */}
                <button 
                    className="absolute top-6 right-6 z-[150] bg-black/40 hover:bg-neon text-white hover:text-black rounded-full p-3 transition-all duration-300 backdrop-blur-md border border-white/10"
                    onClick={handleCloseVideo}
                >
                    <X size={32} />
                </button>

                {/* --- LÓGICA HÍBRIDA --- */}
                
                {isVertical ? (
                    /* PLAYER NATIVO PARA VERTICAL (Resolve o problema do iPhone) 
                       - Usa a tag <video> em vez de <iframe>.
                       - Carrega o arquivo direto.
                       - playsInline: OBRIGATÓRIO para não abrir em tela cheia nativa do iOS e quebrar o layout.
                       - object-cover: Garante que o vídeo preencha a tela sem achatar.
                    */
                    <video 
                        src={directVideoUrl}
                        className="w-full h-full object-cover" 
                        controls={true} // Controles nativos do celular (bonitos e funcionais)
                        autoPlay={true} // Tenta tocar sozinho
                        playsInline={true} // Importante para iOS
                    >
                        Seu navegador não suporta este vídeo.
                    </video>
                ) : (
                    /* PLAYER PADRÃO PARA HORIZONTAL (Iframe ainda é melhor para vídeos longos/pesados) */
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