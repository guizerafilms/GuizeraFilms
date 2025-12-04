import React from 'react';
import { Video, Mic2, Users, Briefcase, Share2, MonitorPlay } from 'lucide-react';
import { ServiceItem } from '../types';

const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      title: 'Vídeos Institucionais',
      description: 'Fortaleça a identidade da sua marca com vídeos corporativos que transmitem profissionalismo e confiança.',
      icon: <Briefcase size={32} />,
    },
    {
      title: 'Marketing Político',
      description: 'Campanhas eleitorais e gestão de imagem pública com narrativa estratégica e impacto emocional.',
      icon: <Users size={32} />,
    },
    {
      title: 'Cobertura de Eventos',
      description: 'Aftermovies e registros dinâmicos de eventos sociais, corporativos e shows.',
      icon: <Video size={32} />,
    },
    {
      title: 'Conteúdo para Redes',
      description: 'Reels, TikToks e vídeos verticais otimizados para alta retenção e viralização.',
      icon: <Share2 size={32} />,
    },
    {
      title: 'Edição Profissional',
      description: 'Pós-produção de alto nível com color grading, motion graphics e sound design.',
      icon: <MonitorPlay size={32} />,
    },
    {
      title: 'Publicidade & TV',
      description: 'Comerciais para televisão e internet com qualidade cinematográfica broadcast.',
      icon: <Mic2 size={32} />,
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-bgDark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-deepBlue mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 bg-[#1A0B2E] border border-white/5 hover:border-primary/50 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
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