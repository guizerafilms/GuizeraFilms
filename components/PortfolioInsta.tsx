import React, { useState, useEffect } from 'react';
import { Instagram, Plus, Trash2 } from 'lucide-react';
import { extractInstaId, getInstaEmbedUrl } from '../utils/urlHelpers';
import { InstaVideo } from '../types';

interface PortfolioInstaProps {
  isAdmin: boolean;
}

const DEFAULT_REELS: InstaVideo[] = [
  { id: '1', embedUrl: '', caption: 'Aftermovie Festival de Verão', client: 'Eventos BR' },
  { id: '2', embedUrl: '', caption: 'Fashion Film Collection', client: 'Marca X' },
  { id: '3', embedUrl: '', caption: 'Campanha Digital', client: 'Empresa Y' },
];

const PortfolioInsta: React.FC<PortfolioInstaProps> = ({ isAdmin }) => {
  const [reels, setReels] = useState<InstaVideo[]>(DEFAULT_REELS);
  const [inputUrl, setInputUrl] = useState('');
  const [caption, setCaption] = useState('');

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('guizera_insta_reels');
    if (saved) {
      try {
        setReels(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved reels", e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('guizera_insta_reels', JSON.stringify(reels));
  }, [reels]);

  const handleAddReel = () => {
    const instaId = extractInstaId(inputUrl);
    if (!instaId) return;

    const newReel: InstaVideo = {
      id: Date.now().toString(),
      embedUrl: getInstaEmbedUrl(instaId),
      caption: caption || 'Novo Projeto',
      client: 'Guizera Films'
    };
    
    setReels([newReel, ...reels]);
    setInputUrl('');
    setCaption('');
  };

  const handleDeleteReel = (id: string) => {
    if (window.confirm('Remover este reel?')) {
      setReels(reels.filter(r => r.id !== id));
    }
  };

  return (
    <section className="py-24 bg-bgDark relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#0F031B] to-bgDark pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">
                    Destaques do <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Instagram</span>
                </h2>
                <p className="text-gray-400">Reels, Teasers e Conteúdo Vertical.</p>
            </div>
            <a 
                href="https://instagram.com/guizerafilms" 
                target="_blank" 
                rel="noreferrer"
                className="mt-4 md:mt-0 flex items-center gap-2 text-white hover:text-pink-500 transition-colors"
            >
                <Instagram size={20} />
                @guizerafilms
            </a>
        </div>

        {/* Input Area - Only Visible to Admin */}
        {isAdmin && (
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-pink-500/30 rounded-xl p-6 mb-12 relative">
             <div className="absolute top-0 left-0 bg-pink-600 text-xs font-bold px-3 py-1 text-white rounded-tl-xl rounded-br-lg">ADMIN MODE</div>
             <div className="flex flex-col md:flex-row gap-4 items-end mt-2">
               <div className="flex-1 w-full">
                  <label className="text-xs text-gray-400 mb-1 block">Link do Instagram</label>
                  <input 
                      type="text" 
                      placeholder="https://www.instagram.com/p/..." 
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                  />
               </div>
               <div className="flex-1 w-full">
                  <label className="text-xs text-gray-400 mb-1 block">Legenda</label>
                  <input 
                      type="text" 
                      placeholder="Nome do projeto" 
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                  />
               </div>
               <button 
                  onClick={handleAddReel}
                  className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors h-[42px] font-bold"
               >
                  <Plus size={18} /> Add
               </button>
             </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reels.map((reel) => (
                <div key={reel.id} className="bg-[#1A0B2E] rounded-xl overflow-hidden border border-white/5 hover:border-pink-500/30 transition-all duration-300 group relative">
                    
                    {/* Delete Button for Admin */}
                    {isAdmin && (
                        <button 
                          onClick={() => handleDeleteReel(reel.id)}
                          className="absolute top-2 right-2 z-20 bg-red-500/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <Trash2 size={14} className="text-white" />
                        </button>
                    )}

                    <div className="aspect-[9/16] w-full bg-black relative">
                         {reel.embedUrl ? (
                            <iframe 
                                src={reel.embedUrl} 
                                className="w-full h-full" 
                                frameBorder="0" 
                                scrolling="no" 
                                allowTransparency={true}
                            ></iframe>
                         ) : (
                             // Placeholder for empty dummy data
                             <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-500 p-6 text-center">
                                 <Instagram size={40} className="mb-2 opacity-50" />
                                 <p className="text-sm">Link de vídeo não fornecido neste slot de demonstração.</p>
                             </div>
                         )}
                    </div>
                    <div className="p-4">
                        <h4 className="text-white font-bold truncate">{reel.caption}</h4>
                        <p className="text-xs text-gray-400">{reel.client}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioInsta;