/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingKakao from './components/FloatingKakao';
import FullPortfolio from './components/FullPortfolio';
import ScrollToTop from './components/ScrollToTop';
import { motion, useScroll, useSpring } from 'motion/react';

function MainPage() {
  return (
    <div className="space-y-0">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Reviews />
      <FAQ />
      <Contact />
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      <main className="relative bg-black selection:bg-white selection:text-black min-h-screen">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-violet-600 origin-left z-[60]"
          style={{ scaleX }}
        />

        <Navbar />
        
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/portfolio" element={<FullPortfolio />} />
        </Routes>

        <Footer />
        <FloatingKakao />
      </main>
    </BrowserRouter>
  );
}

