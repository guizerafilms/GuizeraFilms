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

  const isCloudinary = selectedVideo?.platform === 'cloudinary';

  return (
    <div className="bg-black min-h-screen font-sans">
      <Header />
      <Hero />
      
      <PortfolioDrive isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      <PortfolioInsta isAdmin={isAdmin} onVideoSelect={setSelectedVideo} />
      
      <About />
      <Services />
      <Contact />
      <Footer />

      {selectedVideo && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-0 md:p-4"
            onClick={handleCloseVideo}
        >
            <div 
                className={`relative bg-black flex flex-col justify-center overflow-hidden shadow-2xl ${
                    isCloudinary 
                    ? 'w-full h-full md:h-[90vh] md:w-auto md:aspect-[9/16] md:rounded-xl'
                    : 'w-full max-w-6xl aspect-video rounded-lg'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    className="absolute top-6 right-6 z-[150] bg-black/40 hover:bg-neon text-white hover:text-black rounded-full p-3 transition-all duration-300 backdrop-blur-md border border-white/10"
                    onClick={handleCloseVideo}
                >
                    <X size={32} />
                </button>

                {isCloudinary ? (
                    <video 
                        src={selectedVideo.url}
                        className="w-full h-full object-cover" 
                        controls 
                        autoPlay 
                        playsInline
                    >
                        Seu navegador não suporta este vídeo.
                    </video>
                ) : (
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