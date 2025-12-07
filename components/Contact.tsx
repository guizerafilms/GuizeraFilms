import React from 'react';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contato" className="py-24 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 text-center">
        
        <h2 className="font-heading font-light text-4xl md:text-6xl text-white uppercase tracking-widest mb-8">
            Vamos Criar <br />
            <span className="font-bold text-neon">Algo Épico?</span>
        </h2>
        
        <p className="text-gray-400 font-light text-sm md:text-base max-w-2xl mx-auto mb-12 tracking-wide">
            Sua marca merece um visual cinematográfico. Entre em contato e solicite um orçamento personalizado.
        </p>

        <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-4 bg-neon hover:bg-neonHover text-white font-heading font-bold text-sm px-10 py-5 uppercase tracking-widest transition-all duration-300 transform hover:scale-105"
        >
            Iniciar Conversa <ArrowRight size={18} />
        </a>
        
        <div className="mt-16 flex flex-col md:flex-row justify-center gap-8 md:gap-16 text-gray-500 text-xs uppercase tracking-widest">
            <p>contato@guizerafilms.com</p>
            <p>São Paulo - SP</p>
            <p>@guizerafilms</p>
        </div>

      </div>
    </section>
  );
};

export default Contact;