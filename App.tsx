import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import PortfolioDrive from './components/PortfolioDrive';
import PortfolioInsta from './components/PortfolioInsta';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="bg-bgDark min-h-screen text-white font-sans selection:bg-primary selection:text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <PortfolioDrive isAdmin={isAdmin} />
        <PortfolioInsta isAdmin={isAdmin} />
        <Services />
        <Contact />
      </main>
      <Footer />
      {isAdmin && (
        <div className="fixed bottom-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full z-50 opacity-70 pointer-events-none shadow-lg font-bold border border-white/20">
          MODO ADMIN ATIVO
        </div>
      )}
    </div>
  );
}

export default App;