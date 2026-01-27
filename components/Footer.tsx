import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
            <h4 className="font-heading font-bold text-lg text-white tracking-widest mb-2">
                GUIZERA<span className="text-neon">FILMS</span>
            </h4>
            <p className="text-gray-600 text-[10px] uppercase tracking-widest">
                Bahia, Brasil
            </p>
        </div>

        <p className="text-gray-600 text-[10px] uppercase tracking-widest text-center">
          &copy; 2026 GUIZERA FILMS. TODOS OS DIREITOS RESERVADOS.
        </p>
        
        <div className="flex gap-8">
            <a 
              href="https://www.instagram.com/guizerafilms/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-white text-[10px] uppercase tracking-widest transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://www.youtube.com/@guizerafilms" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-white text-[10px] uppercase tracking-widest transition-colors"
            >
              Youtube
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;