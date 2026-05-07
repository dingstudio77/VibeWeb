import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '홈', href: '/' },
    { name: '서비스', href: '/#services' },
    { name: '포트폴리오', href: '/portfolio' },
    { name: '회사소개', href: '/#about' },
    { name: '문의하기', href: '/#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.split('#')[1];
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation and then scroll
        setTimeout(() => {
          const element = document.getElementById(id);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <Link to="/">
            <img 
              src="https://postfiles.pstatic.net/MjAyNjA1MDZfMTA1/MDAxNzc4MDMxMTU0Mjc2.Tef1fiXwgN-WoIY35h7BYFVrXmscpJenjvdwxY9yfUQg.nUAtWE5OBmSAhrU-ZB75hPqworWxSI3rSKI2n-v6NQIg.PNG/%EB%A1%9C%EA%B3%A0.png?type=w3840" 
              alt="VibeWeb Logo" 
              className="w-[120px] h-[40px] md:w-[150px] md:h-[50px] object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>
        </motion.div>

        {/* Desktop Links - Centered */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, i) => (
            link.href.startsWith('/#') ? (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[13px] font-bold text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-[13px] font-bold text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden lg:block">
          <motion.a
            href="/#contact"
            onClick={(e) => handleLinkClick(e, '/#contact')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 bg-violet-600 text-white rounded-full text-[13px] font-bold hover:bg-violet-700 transition-all flex items-center gap-2 shadow-lg shadow-violet-500/20"
          >
            상담 문의
            <ArrowRight size={14} />
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 py-6 px-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                  handleLinkClick(e, link.href);
                  setIsOpen(false);
                }}
                className="text-lg font-medium text-white/70 hover:text-white"
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-white/70 hover:text-white"
              >
                {link.name}
              </Link>
            )
          ))}
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, '/#contact')}
            className="w-full py-4 bg-violet-600 text-white rounded-xl text-center font-bold"
          >
            Start Project
          </a>
        </motion.div>
      )}
    </nav>
  );
}
