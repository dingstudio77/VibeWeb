/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Admin from './components/Admin';
import { motion, useScroll, useSpring } from 'motion/react';

function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <div className="space-y-0">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Reviews />
        <FAQ />
        <Contact />
      </div>

      <Footer />
      <FloatingKakao />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <main className="relative bg-white selection:bg-black selection:text-white min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

