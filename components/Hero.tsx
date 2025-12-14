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
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* BACKGROUND: YouTube Video (Iframe) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/50 z-10" /> {/* Camada escura para o texto aparecer */}
        
        {/* Truque para deixar o vídeo do YouTube em tela cheia como background */}
        <div className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/m3e5y3aTk3o?autoplay=1&mute=1&controls=0&loop=1&playlist=m3e5y3aTk3o&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1" 
              title="Hero Background"
              allow="autoplay; encrypted-media" 
              allowFullScreen
              style={{ pointerEvents: 'none', border: 0 }}
            ></iframe>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-20 w-full px-4 text-center flex flex-col items-center justify-center">
        
        {/* TÍTULO ORIGINAL (Com ajuste de tamanho para mobile) */}
        <h1 className="font-heading text-white leading-tight">
          {/* Parte 1: VISUAL */}
          <span className="block text-xl md:text-3xl lg:text-4xl font-light tracking-[0.5em] mb-2 md:mb-4 text-gray-200">
            VISUAL
          </span>
          
          {/* Parte 2: CINEMATOGRÁFICO */}
          {/* A classe 'break-words' e os tamanhos (text-3xl até text-7xl) garantem que ele caiba no celular sem perder o estilo */}
          <span className="block text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest break-words w-full max-w-6xl mx-auto">
            CINEMATOGRÁFICO
          </span>
        </h1>

        {/* SUBTÍTULO (Nova Copy de Vendas) */}
        <div className="mt-8 max-w-2xl mx-auto">
          <p className="text-gray-300 text-[10px] md:text-sm font-sans tracking-[0.2em] uppercase leading-relaxed border-t border-b border-white/20 py-4 px-4">
            Estratégia visual que constrói <span className="text-neon font-bold">autoridade</span> e valor para sua marca.
          </p>
        </div>

        {/* BOTÃO (Estilo Original) */}
        <button 
          onClick={scrollToPortfolio}
          className="mt-12 px-8 py-3 border border-white/30 hover:border-neon hover:bg-neon/10 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300"
        >
          Ver Portfólio
        </button>

        {/* SETA SCROLL */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 cursor-pointer" onClick={scrollToPortfolio}>
          <ChevronDown className="text-white" size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;