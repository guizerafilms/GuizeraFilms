import React, { useState } from 'react';
import { Mail, Phone, Instagram, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "5511999999999"; // Substitua pelo número real se necessário
    const text = `Olá Guizera Films!%0A%0AMeu nome é *${formData.name}*.%0AEmail: ${formData.email}%0A%0A*Mensagem:*%0A${formData.message}`;
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    
    // Clear form after sending
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contato" className="py-24 bg-gradient-to-b from-bgDark to-[#0a0212] relative overflow-hidden">
      
      {/* Glow effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-deepBlue rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              Vamos criar algo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-deepBlue">extraordinário?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md">
              Entre em contato para orçamentos, parcerias ou apenas para tomar um café e falar sobre vídeo.
            </p>

            <div className="space-y-6">
              <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone size={24} />
                </div>
                <span className="text-lg font-medium">(11) 99999-9999 (WhatsApp)</span>
              </a>
              
              <a href="mailto:contato@guizerafilms.com.br" className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail size={24} />
                </div>
                <span className="text-lg font-medium">contato@guizerafilms.com</span>
              </a>

              <a href="https://instagram.com/guizerafilms" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Instagram size={24} />
                </div>
                <span className="text-lg font-medium">@guizerafilms</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
             <div className="mb-6">
               <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Nome</label>
               <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors" 
                placeholder="Seu nome" 
               />
             </div>
             <div className="mb-6">
               <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">E-mail</label>
               <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors" 
                placeholder="seu@email.com" 
               />
             </div>
             <div className="mb-6">
               <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Mensagem</label>
               <textarea 
                rows={4} 
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors" 
                placeholder="Conte sobre seu projeto..."
               ></textarea>
             </div>
             <button type="submit" className="w-full bg-gradient-to-r from-primary to-primaryDark hover:from-primaryDark hover:to-primary text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20">
               Enviar no WhatsApp <Send size={20} />
             </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;