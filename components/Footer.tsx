import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05010a] py-8 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Guizera Films. Todos os direitos reservados.
        </p>
        <p className="text-gray-600 text-xs mt-2 md:mt-0">
          Design por Guizera Films.
        </p>
      </div>
    </footer>
  );
};

export default Footer;