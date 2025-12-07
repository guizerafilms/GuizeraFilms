import React from 'react';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative w-full overflow-hidden bg-black mt-20"
      style={{ height: '600px' }}
    >
      
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 
           Wrapper centralizado para simular object-fit: cover em iframes.
           Definimos dimensões grandes o suficiente para garantir o preenchimento sem barras pretas.
        */}
        <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ width: '300%', height: '300%' }} // Garante cobertura em qualquer aspect ratio
        >
          <iframe 
            className="w-full h-full object-cover opacity-80"
            src="https://www.youtube.com/embed/m3e5y3aTk3o?autoplay=1&mute=1&controls=0&loop=1&playlist=m3e5y3aTk3o&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&origin=https://guizerafilms.com" 
            title="Guizera Films Background"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ pointerEvents: 'none' }}
          ></iframe>
        </div>
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* CONTENT */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
        
        <h1 className="font-heading font-light text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-widest md:tracking-mega mb-6 leading-tight animate-slide-up">
          Visual <br className="md:hidden" />
          <span className="font-medium">Cinematográfico</span>
        </h1>
        
        <p className="text-gray-300 font-sans font-light text-sm md:text-base tracking-widest uppercase mb-12 max-w-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Estratégia e impacto em cada frame.
        </p>
        
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <a 
            href="#portfolio"
            onClick={(e) => handleScroll(e, 'portfolio')}
            className="inline-block border border-white/30 text-white font-heading font-medium text-xs px-10 py-4 uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-500"
          >
            Ver Portfólio
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;