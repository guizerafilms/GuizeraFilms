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
    <div className="bg-black min-h-screen text-white font-sans selection:bg-neon selection:text-white">
      <Header />
      <main>
        <Hero />
        <PortfolioDrive isAdmin={isAdmin} />
        <PortfolioInsta isAdmin={isAdmin} />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
      {isAdmin && (
        <div className="fixed bottom-4 right-4 bg-neon text-white text-[10px] px-3 py-1 uppercase tracking-widest z-50 opacity-70 pointer-events-none shadow-lg font-bold">
          Admin Mode
        </div>
      )}
    </div>
  );
}

export default App;