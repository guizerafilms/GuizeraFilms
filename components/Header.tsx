import React, { useState, useEffect } from 'react';
import { Menu, X, Film } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 90; // Height of header + some padding
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Sobre', href: 'sobre' },
    { name: 'Portfólio', href: 'portfolio' },
    { name: 'Serviços', href: 'servicos' },
    { name: 'Contato', href: 'contato' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bgDark/95 backdrop-blur-md shadow-lg py-4 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group"
        >
          <Film className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
          <span className="font-heading font-bold text-xl md:text-2xl tracking-tighter text-white">
            GUIZERA <span className="text-primary">FILMS</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-gray-300 hover:text-white font-medium text-sm uppercase tracking-widest transition-colors hover:text-shadow-glow"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#portfolio"
            onClick={(e) => handleNavClick(e, 'portfolio')}
            className="px-6 py-2 bg-gradient-to-r from-primary to-deepBlue rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity hover:scale-105 transform duration-200"
          >
            Ver Projetos
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bgDark border-t border-white/10 p-6 flex flex-col gap-6 shadow-2xl animate-fade-in">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.href}`}
              className="text-white font-heading font-bold text-lg py-2 border-b border-white/5"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#portfolio"
            onClick={(e) => handleNavClick(e, 'portfolio')}
            className="text-primary font-heading font-bold text-lg py-2"
          >
            Ver Projetos
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;