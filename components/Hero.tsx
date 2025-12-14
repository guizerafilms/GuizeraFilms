import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToPortfolio = () => {
    const targetElement = document.getElementById('portfolio');
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full h-[65vh] min-h-[500px] overflow-hidden flex items-center justify-center bg-black border-b border-white/10">
      
      {/* BACKGROUND VÍDEO (INTACTO) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="relative w-full h-full overflow-hidden">
             <iframe 
              className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              src="https://www.youtube.com/embed/m3e5y3aTk3o?autoplay=1&mute=1&controls=0&loop=1&playlist=m3e5y3aTk3o&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1" 
              title="Hero Background"
              style={{ border: 0 }}
              allow="autoplay; encrypted-media" 
            ></iframe>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-20 w-full px-4 text-center flex flex-col items-center justify-center">
        
        {/* TÍTULO */}
        <h1 className="font-heading text-white leading-tight">
          {/* Parte 1: VISUAL */}
          <span className="block text-sm sm:text-xl md:text-3xl lg:text-4xl font-light tracking-[0.5em] mb-2 text-gray-200">
            VISUAL
          </span>
          
          {/* Parte 2: CINEMATOGRÁFICO */}
          {/* AJUSTE: Reduzi para text-2xl no mobile (celular) para garantir que caiba. 
              Escala: Celular(2xl) -> Tablet(4xl) -> Laptop(6xl) -> Tela Grande(7xl) */}
          <span className="block text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest w-full max-w-6xl mx-auto break-words">
            CINEMATOGRÁFICO
          </span>
        </h1>

        {/* SUBTÍTULO */}
        <div className="mt-6 max-w-2xl mx-auto">
          <p className="text-gray-300 text-[10px] md:text-sm font-sans tracking-[0.2em] uppercase leading-relaxed border-t border-b border-white/20 py-3 px-4">
            Estratégia visual que constrói <span className="text-neon font-bold">autoridade</span> e valor para sua marca.
          </p>
        </div>

        {/* BOTÃO */}
        <button 
          onClick={scrollToPortfolio}
          className="mt-8 px-6 py-2 md:px-8 md:py-3 border border-white/30 hover:border-neon hover:bg-neon/10 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300"
        >
          Ver Portfólio
        </button>
      </div>

      {/* SETA SCROLL (Corrigida e Centralizada) */}
      {/* Agora ela é filha direta da Section, garantindo o centro absoluto */}
      <div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50 z-30 cursor-pointer" 
        onClick={scrollToPortfolio}
      >
        <ChevronDown className="text-white" size={24} />
      </div>

    </section>
  );
};

export default Hero;