import React from 'react';
import { Camera, Zap, Award, Film } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Gap aumentado para gap-24 (6rem) para equilibrar o tamanho dos elementos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Coluna da Imagem - Alinhada à direita no Desktop */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
             
             {/* WRAPPER RELATIVO */}
             <div className="relative group">
                {/* Elemento Decorativo - Aumentado proporcionalmente */}
                <div className="absolute -top-8 -left-8 w-32 h-32 border-t border-l border-neon/50 z-0 hidden md:block"></div>
                
                {/* Container da Imagem: Aumentado para 480px x 650px (Desktop) */}
                <div className="relative z-10 w-full max-w-[480px] lg:w-[480px] h-[550px] lg:h-[650px] bg-darkGray overflow-hidden shadow-2xl shadow-neon/5 border border-white/5">
                    <img 
                      src="https://i.postimg.cc/BQ8vjzPk/Guizera-Films.png" 
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"; 
                      }}
                      alt="Gui Azevedo" 
                      className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Box de Texto Flutuante - Overlay Fixo no Canto Inferior Direito - Ampliado */}
                    <div className="absolute bottom-0 right-0 bg-black p-8 z-20 text-right min-w-[240px] border-t border-l border-white/10">
                        <p className="font-heading text-white text-2xl font-bold uppercase tracking-widest">Gui Azevedo</p>
                        <p className="text-neon text-sm uppercase tracking-widest mt-2">Filmmaker & Diretor</p>
                    </div>
                </div>
             </div>
          </div>

          {/* Coluna de Texto */}
          <div className="order-1 lg:order-2">
            {/* Título Aumentado */}
            <h2 className="font-heading font-light text-5xl md:text-7xl text-white mb-10 uppercase tracking-widest leading-none">
              Nossa <span className="font-bold text-neon">Visão</span>
            </h2>
            
            {/* Texto Aumentado para text-lg */}
            <div className="space-y-8 text-gray-400 font-sans font-light text-base md:text-lg leading-relaxed tracking-wide text-justify max-w-xl">
                <p>
                A <strong className="text-white">Guizera Films</strong> opera na intersecção entre a arte cinematográfica e a estratégia digital. Não fazemos apenas vídeos; construímos ativos visuais que elevam a percepção de valor da sua marca.
                </p>
                <p>
                Com equipamentos de ponta e um olhar treinado para a narrativa, entregamos resultados que superam o convencional. Seja para o mercado corporativo, político ou eventos sociais, nossa assinatura é a sofisticação.
                </p>
            </div>

            {/* Stats Aumentados */}
            <div className="grid grid-cols-2 gap-10 mt-16 border-t border-white/10 pt-10 max-w-xl">
                <div>
                    <h3 className="text-white font-heading font-bold text-4xl">4K</h3>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Qualidade Cinema</p>
                </div>
                <div>
                    <h3 className="text-white font-heading font-bold text-4xl">+500</h3>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Projetos Entregues</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;