import React from 'react';
import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Mari Azevedo",
      rating: 5,
      text: "O Gui é simplesmente o melhor filmmaker! Ele me ajuda muito com as ideias e produz conteúdos maravilhosos. O trabalho da Guizera Films eleva o nível de qualquer projeto, é uma parceria que dá muito certo.",
    },
    {
      name: "Mailane",
      rating: 5,
      text: "Quero deixar meu agradecimento especial à Guizera Films. O Gui fez um trabalho incrível e sensacional na nossa gravação! Ele foi essencial para conseguirmos criar um material super legal, profissional e de alta qualidade para compartilhar com o nosso público.",
    },
    {
      name: "Joane",
      rating: 5,
      text: "O trabalho da Guizera Films é simplesmente perfeito! Quando assisti ao meu vídeo pela primeira vez, fiquei chocada e emocionada com a qualidade. O Gui é um filmmaker muito profissional, e os resultados que ele entrega sempre rendem muitos elogios. Ele me ajuda desde o início da minha carreira no YouTube. Para quem precisa registrar aniversários, casamentos ou qualquer momento importante com vídeos e fotos de qualidade, contrate a Guizera Films. Vocês não vão se arrepender, o trabalho é incrível demais!",
    },
    {
      name: "Boracha",
      rating: 5,
      text: "Que trabalho lindo e maravilhoso! O resultado final ficou perfeito, exatamente da forma que eu imaginava. Estou super satisfeito e sem palavras para o nível de profissionalismo da Guizera Films. Com certeza vou recomendar e divulgar o trabalho do Gui para todo mundo!",
    }
  ];

  return (
    <section className="py-16 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Cabeçalho mais discreto */}
        <div className="max-w-2xl mb-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading font-light text-2xl md:text-3xl text-white uppercase tracking-[0.2em] mb-4"
          >
            Feedback dos <span className="font-bold text-white">Clientes</span>
          </motion.h2>
          <div className="h-0.5 w-10 bg-neon/50 mb-4"></div>
        </div>

        {/* Grid de Depoimentos - Cards menores e mais sóbrios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#080808] border border-white/5 p-6 md:p-8 hover:border-white/10 transition-all duration-500 rounded-px"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* Iniciais discretas */}
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 font-heading text-sm font-medium">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-gray-200 font-heading text-sm font-bold uppercase tracking-widest leading-none">
                      {testimonial.name}
                    </h3>
                    <div className="flex items-center gap-0.5 mt-1.5 opacity-40 group-hover:opacity-80 transition-opacity">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} size={10} className="fill-neon text-neon" />
                       ))}
                    </div>
                  </div>
                </div>
                <Quote size={16} className="text-gray-800 group-hover:text-neon/30 transition-colors" />
              </div>

              <p className="text-gray-500 font-sans text-xs md:text-sm leading-relaxed font-light">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Minimalista - Botão Quadrado Padrão */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-[10px] md:text-xs font-sans mb-8 tracking-[0.2em] uppercase">
            Junte-se a dezenas de clientes satisfeitos
          </p>
          <a 
            href="#contato"
            className="inline-block px-8 py-3 border border-white/30 hover:border-neon hover:bg-neon/10 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300"
          >
            Começar meu projeto
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
