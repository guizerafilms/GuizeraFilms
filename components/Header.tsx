import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: 'hero' },
    { name: 'Portfólio', href: 'portfolio' },
    { name: 'Verticais', href: 'verticais' },
    { name: 'Contato', href: 'contato' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-white/10 h-20">
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        
        {/* LOGO */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, 'hero')}
          className="flex items-center gap-2 group z-50"
        >
          <span className="font-heading font-bold text-xl tracking-widest text-white group-hover:text-gray-300 transition-colors">
            GUIZERA<span className="text-neon">FILMS</span>
          </span>
        </a>

        {/* DESKTOP NAV (CENTER) */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-gray-400 hover:text-white font-heading font-medium text-xs uppercase tracking-widest transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA BUTTON (RIGHT) */}
        <div className="hidden md:block">
            <a 
                href="#contato"
                onClick={(e) => handleNavClick(e, 'contato')}
                className="bg-neon hover:bg-neonHover text-white font-heading font-bold text-xs px-6 py-3 uppercase tracking-widest transition-all duration-300 transform hover:scale-105"
            >
                Orçamento
            </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden text-white z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MOBILE NAV OVERLAY */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-8 animate-fade-in">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={`#${link.href}`}
                className="text-white font-heading font-light text-2xl uppercase tracking-widest hover:text-neon transition-colors"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <a 
                href="#contato"
                onClick={(e) => handleNavClick(e, 'contato')}
                className="mt-8 bg-neon text-white font-heading font-bold text-sm px-10 py-4 uppercase tracking-widest"
            >
                Orçamento
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;