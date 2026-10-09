import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CoreValues from './components/CoreValues';
import PillarsSection from './components/PillarsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState('zen-light');
  const [selectedPillar, setSelectedPillar] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'zen-light' ? 'zen-dark' : 'zen-light'));
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between font-sans transition-colors duration-200 bg-base-100">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 flex flex-col justify-center space-y-10 sm:space-y-12">
        <HeroSection />
        <CoreValues />
        <PillarsSection
          selectedIndex={selectedPillar}
          onSelectPillar={setSelectedPillar}
        />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
