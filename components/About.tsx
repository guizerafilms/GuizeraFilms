import React from 'react';
import { Camera, Zap, Award, Film } from 'lucide-react';

const Feature: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors duration-300">
    <div className="w-12 h-12 bg-gradient-to-br from-primary to-deepBlue rounded-lg flex items-center justify-center mb-4 text-white">
      {icon}
    </div>
    <h3 className="text-xl font-heading font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 relative bg-bgDark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            {/* Abstract visual representation of "Gui Azevedo" / Filmmaker */}
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-transparent to-transparent opacity-80 z-10"></div>
              <img 
                src="https://picsum.photos/800/1000?grayscale" 
                alt="Gui Azevedo Filmmaker" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="text-3xl font-heading font-bold text-white mb-1">Gui Azevedo</h3>
                <p className="text-primary font-medium tracking-wide">Fundador & Diretor Criativo</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-full blur-[80px] opacity-40"></div>
          </div>

          <div>
            <h4 className="text-primary font-bold tracking-widest uppercase mb-2">Sobre Nós</h4>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Mais do que vídeos, criamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">legados visuais.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              A <strong>Guizera Films</strong> nasceu da paixão de contar histórias através de lentes cinematográficas. Fundada por Gui Azevedo, unimos estratégia digital com uma estética refinada e autêntica.
            </p>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              Nosso foco não é apenas entregar um vídeo, mas provocar emoção e gerar autoridade. Seja no ambiente político, corporativo ou em grandes eventos, nossa câmera captura a essência do momento com agilidade e precisão.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Feature 
                icon={<Camera size={24} />} 
                title="Cinematografia" 
                desc="Equipamentos de ponta e olhar artístico apurado." 
              />
              <Feature 
                icon={<Zap size={24} />} 
                title="Agilidade" 
                desc="Entregas rápidas sem comprometer a qualidade final." 
              />
              <Feature 
                icon={<Award size={24} />} 
                title="Estratégia" 
                desc="Conteúdo pensado para engajar e converter." 
              />
              <Feature 
                icon={<Film size={24} />} 
                title="Pós-Produção" 
                desc="Edição dinâmica, color grading e sound design imersivo." 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;