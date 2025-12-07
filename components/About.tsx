import React from 'react';
import { Camera, Zap, Award, Film } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
             <div className="absolute -top-10 -left-10 w-20 h-20 border-t border-l border-neon/50"></div>
             <div className="relative z-10 aspect-[4/5] bg-darkGray overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src="https://picsum.photos/800/1000?grayscale" 
                  alt="Gui Azevedo" 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700"
                />
             </div>
             <div className="absolute -bottom-6 -right-6 bg-black border border-white/10 p-6 z-20">
                <p className="font-heading text-white text-lg font-bold uppercase tracking-widest">Gui Azevedo</p>
                <p className="text-neon text-[10px] uppercase tracking-widest mt-1">Filmmaker & Diretor</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-heading font-light text-4xl md:text-5xl text-white mb-8 uppercase tracking-widest">
              Nossa <span className="font-bold text-neon">Visão</span>
            </h2>
            
            <div className="space-y-6 text-gray-400 font-sans font-light text-sm md:text-base leading-relaxed tracking-wide text-justify">
                <p>
                A <strong className="text-white">Guizera Films</strong> opera na intersecção entre a arte cinematográfica e a estratégia digital. Não fazemos apenas vídeos; construímos ativos visuais que elevam a percepção de valor da sua marca.
                </p>
                <p>
                Com equipamentos de ponta e um olhar treinado para a narrativa, entregamos resultados que superam o convencional. Seja para o mercado corporativo, político ou eventos sociais, nossa assinatura é a sofisticação.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="border-l border-white/20 pl-6">
                    <h3 className="text-white font-heading font-bold text-2xl">4K</h3>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Qualidade Cinema</p>
                </div>
                <div className="border-l border-white/20 pl-6">
                    <h3 className="text-white font-heading font-bold text-2xl">+500</h3>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Projetos Entregues</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;