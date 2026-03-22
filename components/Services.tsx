import React from 'react';
import { Video, Mic2, Users, Briefcase, Share2, MonitorPlay } from 'lucide-react';
import { ServiceItem } from '../types';

const Services: React.FC = () => {
  const services: ServiceItem[] = [
    { title: 'Institucional', description: 'Construa credibilidade e conquiste clientes.', icon: <Briefcase size={24} /> },
    { title: 'Marketing Político', description: 'Conecte com eleitores e conquiste votos.', icon: <Users size={24} /> },
    { title: 'Eventos', description: 'Eternize momentos que ficam para sempre.', icon: <Video size={24} /> },
    { title: 'Conteúdo Digital', description: 'Viralização e engajamento nas redes sociais.', icon: <Share2 size={24} /> },
    { title: 'Pós-Produção', description: 'Qualidade profissional em cada frame.', icon: <MonitorPlay size={24} /> },
    { title: 'Publicidade', description: 'Vídeos que vendem e impulsionam seu negócio.', icon: <Mic2 size={24} /> },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="font-heading font-light text-3xl md:text-4xl text-white text-center mb-16 uppercase tracking-widest">
            Soluções <span className="font-bold text-neon">360º</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-10 bg-darkGray border border-white/5 hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(130,87,229,0.25)] transition-all duration-500"
            >
              <div className="text-neon group-hover:text-black transition-colors mb-6">
                {service.icon}
              </div>
              <h3 className="text-lg font-heading font-bold uppercase tracking-widest text-white mb-3 group-hover:text-black">
                {service.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed group-hover:text-black/70 font-sans uppercase tracking-wide">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;