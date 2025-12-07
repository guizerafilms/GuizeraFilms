import React, { useState } from 'react';
import { Smartphone, Plus } from 'lucide-react';

interface PortfolioInstaProps {
  isAdmin: boolean;
}

const PortfolioInsta: React.FC<PortfolioInstaProps> = ({ isAdmin }) => {
  // Placeholders para layout 9:16
  const [items, setItems] = useState([1, 2, 3, 4]);

  return (
    <section id="verticais" className="py-24 bg-darkGray border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
            <h2 className="font-heading font-light text-3xl md:text-5xl text-white uppercase tracking-widest mb-4">
                Produções <span className="font-bold text-neon">Verticais</span>
            </h2>
            <p className="text-gray-500 text-xs font-sans uppercase tracking-widest max-w-lg mx-auto">
                Reels, Stories e TikToks com qualidade cinematográfica.
            </p>
        </div>

        {/* Vertical Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {items.map((item, index) => (
                <div key={index} className="aspect-[9/16] bg-black border border-white/5 group relative overflow-hidden flex flex-col items-center justify-center hover:border-neon/30 transition-colors duration-500">
                    
                    {/* Placeholder Content */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                    
                    <Smartphone className="text-white/10 w-12 h-12 mb-4 group-hover:text-neon group-hover:scale-110 transition-all duration-300 relative z-20" />
                    
                    <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold relative z-20 group-hover:text-white transition-colors">
                        Projeto {item}
                    </span>
                    
                    <div className="absolute bottom-6 left-0 w-full text-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <span className="text-neon text-[9px] uppercase tracking-widest border border-neon px-3 py-1">Em Breve</span>
                    </div>

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-white/5 h-[1px] w-full animate-float opacity-0 group-hover:opacity-20 pointer-events-none"></div>
                </div>
            ))}
            
            {isAdmin && (
                <div className="aspect-[9/16] border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-neon hover:text-neon text-white/30 transition-all">
                    <Plus size={32} />
                </div>
            )}
        </div>
        
      </div>
    </section>
  );
};

export default PortfolioInsta;