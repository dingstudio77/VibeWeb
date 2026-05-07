import { motion } from 'motion/react';
import { Instagram, Github, Mail, Globe, Lock } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return unsubscribe;
  }, []);

  const handleAdminLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <footer className="py-20 px-6 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="https://postfiles.pstatic.net/MjAyNjA1MDZfMTA1/MDAxNzc4MDMxMTU0Mjc2.Tef1fiXwgN-WoIY35h7BYFVrXmscpJenjvdwxY9yfUQg.nUAtWE5OBmSAhrU-ZB75hPqworWxSI3rSKI2n-v6NQIg.PNG/%EB%A1%9C%EA%B3%A0.png?type=w3840" 
                alt="VibeWeb Logo" 
                className="h-10 w-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
              바이브웹은 기술과 감각의 조화를 통해 브랜드의 디지털 정체성을 구축합니다. 
              우리는 당신의 비즈니스가 웹상에서 가장 빛나는 순간을 만듭니다.
            </p>
            <div className="flex gap-4">
              {[Instagram, Mail, Github, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 hover:-translate-y-1 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-violet-500">Links</h4>
            <ul className="space-y-4 text-white/40 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              {!user && (
                <li>
                  <button onClick={handleAdminLogin} className="flex items-center gap-2 hover:text-white transition-colors text-left cursor-pointer">
                    <Lock size={12} /> Admin
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-violet-500">Legal</h4>
            <ul className="space-y-4 text-white/40 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs font-bold uppercase tracking-widest text-center">
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
