import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Mari Azevedo",
      text: "O Gui é simplesmente o melhor filmmaker! Ele me ajuda muito com as ideias e produz conteúdos maravilhosos. O trabalho da Guizera Films eleva o nível de qualquer projeto, é uma parceria que dá muito certo.",
      highlight: "eleva o nível de qualquer projeto"
    },
    {
      name: "Mailane",
      text: "Quero deixar meu agradecimento especial à Guizera Films. O Gui fez um trabalho incrível e sensacional na nossa gravação! Ele foi essencial para conseguirmos criar um material super legal, profissional e de alta qualidade para compartilhar com o nosso público.",
      highlight: "profissional e de alta qualidade"
    },
    {
      name: "Joane",
      text: "O trabalho da Guizera Films é simplesmente perfeito! Quando assisti ao meu vídeo pela primeira vez, fiquei chocada e emocionada com a qualidade. O Gui é um filmmaker muito profissional, e os resultados que ele entrega sempre rendem muitos elogios. Ele me ajuda desde o início da minha carreira no YouTube. Para quem precisa registrar aniversários, casamentos ou qualquer momento importante com vídeos e fotos de qualidade, contrate a Guizera Films. Vocês não vão se arrepender, o trabalho é incrível demais!",
      highlight: "chocada e emocionada com a qualidade"
    },
    {
      name: "Boracha",
      text: "Que trabalho lindo e maravilhoso! O resultado final ficou perfeito, exatamente da forma que eu imaginava. Estou super satisfeito e sem palavras para o nível de profissionalismo da Guizera Films. Com certeza vou recomendar e divulgar o trabalho do Gui para todo mundo!",
      highlight: "exatamente da forma que eu imaginava"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-heading font-light text-4xl md:text-6xl text-white uppercase tracking-tight mb-6 leading-tight">
            O Que Nossos <span className="font-bold text-neon">Clientes</span> Dizem
          </h2>
          <div className="h-1 w-20 bg-neon rounded-full mb-6"></div>
          <p className="text-gray-400 text-sm md:text-base font-sans font-light tracking-wide">
            Depoimentos reais de quem já experimentou a qualidade Guizera Films
          </p>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative bg-darkGray border border-white/5 p-8 hover:border-neon/30 transition-all duration-500"
            >
              {/* Ícone de Aspas */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-neon/10 border border-neon/30 flex items-center justify-center">
                <Quote className="text-neon" size={20} />
              </div>

              {/* Texto do Depoimento */}
              <div className="relative z-10">
                <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed mb-6 text-justify">
                  {testimonial.text}
                </p>

                {/* Destaque */}
                {testimonial.highlight && (
                  <div className="border-l-2 border-neon/50 pl-4 mb-6">
                    <p className="text-neon text-xs md:text-sm font-medium italic">
                      "{testimonial.highlight}"
                    </p>
                  </div>
                )}

                {/* Nome do Cliente */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white font-heading text-base md:text-lg font-bold uppercase tracking-widest">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
                    Cliente Guizera Films
                  </p>
                </div>
              </div>

              {/* Elemento Decorativo no Hover */}
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-r-[40px] border-b-neon/5 border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center mt-16 border-t border-white/10 pt-12">
          <p className="text-gray-400 text-sm md:text-base font-sans mb-6">
            Quer fazer parte dessa lista? Entre em contato e vamos criar algo incrível juntos.
          </p>
          <a 
            href="#contato"
            className="inline-block px-8 py-3 border border-white/30 hover:border-neon hover:bg-neon/10 text-white text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300"
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
