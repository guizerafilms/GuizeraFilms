import React from 'react';
import { ArrowDown, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerOffset = 90; // Altura do header para compensar
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
        console.warn(`Element with id ${targetId} not found`);
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Gradient/Texture */}
      <div className="absolute inset-0 bg-bgDark z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bgDark via-deepBlue/40 to-primary/20 opacity-60"></div>
        {/* Animated Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-deepBlue/30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block mb-4 px-4 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm animate-fade-in">
          <span className="text-sm font-medium tracking-[0.2em] text-gray-300 uppercase">Produção Audiovisual de Alto Nível</span>
        </div>
        
        <h1 className="font-heading font-extrabold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-slide-up">
          <span className="block text-white">VISUAL</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primaryDark to-white">
            CINEMATOGRÁFICO
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl mb-10 leading-relaxed font-light animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Produtora especializada em vídeos políticos, institucionais, eventos e conteúdo digital. 
          Estratégia e impacto em cada frame.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-slide-up relative z-30" style={{ animationDelay: '0.4s' }}>
          <a 
            href="#portfolio"
            onClick={(e) => handleScroll(e, 'portfolio')}
            className="px-8 py-4 bg-white text-bgDark font-bold rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2 group cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
          >
            <Play size={20} className="fill-bgDark group-hover:scale-110 transition-transform" />
            Ver Portfólio
          </a>
          <a 
            href="#contato"
            onClick={(e) => handleScroll(e, 'contato')}
            className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
          >
            Entrar em Contato
          </a>
        </div>
      </div>

      <a 
        href="#sobre" 
        onClick={(e) => handleScroll(e, 'sobre')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce cursor-pointer z-30"
      >
        <ArrowDown size={32} />
      </a>
    </section>
  );
};

export default Hero;