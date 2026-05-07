import { motion } from 'motion/react';
import { Instagram, Github, Mail, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-black/5 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="https://postfiles.pstatic.net/MjAyNjA1MDZfMTA1/MDAxNzc4MDMxMTU0Mjc2.Tef1fiXwgN-WoIY35h7BYFVrXmscpJenjvdwxY9yfUQg.nUAtWE5OBmSAhrU-ZB75hPqworWxSI3rSKI2n-v6NQIg.PNG/%EB%A1%9C%EA%B3%A0.png?type=w3840" 
                alt="VibeWeb Logo" 
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-zinc-500 max-w-sm mb-8 leading-relaxed font-medium">
              바이브웹은 기술과 감각의 조화를 통해 브랜드의 디지털 정체성을 구축합니다. 
              우리는 당신의 비즈니스가 웹상에서 가장 빛나는 순간을 만듭니다.
            </p>
            <div className="flex gap-4">
              {[Instagram, Mail, Github, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white border border-black/5 shadow-sm rounded-xl flex items-center justify-center hover:bg-zinc-50 hover:-translate-y-1 transition-all text-zinc-900">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-purple-600">Links</h4>
            <ul className="space-y-4 text-zinc-400 text-sm font-medium">
              <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-black transition-colors">Portfolio</a></li>
              <li><a href="#services" className="hover:text-black transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Contact</a></li>
              <li>
                <Link to="/admin" className="flex items-center gap-2 hover:text-black transition-colors group">
                  <Shield size={14} className="text-purple-600/30 group-hover:text-purple-600 transition-colors" />
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-purple-600">Legal</h4>
            <ul className="space-y-4 text-zinc-400 text-sm font-medium">
              <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-400 text-xs font-bold uppercase tracking-widest text-center">
          <div>© 2024 VibeWeb Studio. All Rights Reserved.</div>
          <div className="flex gap-6">
            <span>Built with Innovation</span>
            <span>Based in Seoul</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
