import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Settings, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import AdminPortfolioEditor from './AdminPortfolioEditor';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  img: string;
  link?: string;
  color: string;
  order: number;
}

const categories = ["전체", "기업 / 브랜드", "뷰티 / 헬스"];

const fallbackProjects = [
  {
    id: '1',
    title: 'PLANET X',
    category: '기업 / 브랜드',
    description: 'IT 솔루션 기업 공식 홈페이지 리뉴얼',
    img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    color: 'from-blue-600/20 to-violet-600/20',
    order: 0
  },
  {
    id: '2',
    title: 'MOODERY',
    category: '쇼핑몰',
    description: '라이프스타일 쇼핑몰 구축',
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    color: 'from-orange-600/20 to-amber-600/20',
    order: 1
  },
  {
    id: '3',
    title: 'LUMIÈRE CLINIC',
    category: '병원 / 의료',
    description: '피부과 클리닉 홈페이지',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    color: 'from-emerald-600/20 to-teal-600/20',
    order: 2
  },
  {
    id: '4',
    title: 'CODEBRIDGE',
    category: '교육 / 기관',
    description: '프로그래밍 교육 기관 홈페이지',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    color: 'from-indigo-600/20 to-blue-600/20',
    order: 3
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [activeCategory, setActiveCategory] = useState("전체");
  const [loading, setLoading] = useState(true);

  // 1. Fetching Data
  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioItem));
      setProjects(docs.length > 0 ? docs : fallbackProjects);
      setLoading(false);
    }, (error) => {
      console.error("Fetch error:", error);
      setProjects(fallbackProjects);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // 2. Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Simplified admin check: check if email matches the user's email
      const adminEmail = "dingstudio77@gmail.com"; 
      setIsAdmin(user?.email === adminEmail);
    });
    return unsubscribe;
  }, []);

  // 3. One-time Admin Bootstrap (Simplified for demo)
  useEffect(() => {
    const bootstrapAdmin = async () => {
      const user = auth.currentUser;
      const adminEmail = "dingstudio77@gmail.com";
      if (user && user.email === adminEmail) {
        try {
          const { setDoc, doc } = await import('firebase/firestore');
          const path = `admins/${user.uid}`;
          try {
            await setDoc(doc(db, 'admins', user.uid), {
              email: user.email,
              role: 'admin'
            }, { merge: true });
          } catch (error) {
            const errInfo = {
              error: error instanceof Error ? error.message : String(error),
              authInfo: {
                userId: user.uid,
                email: user.email,
                emailVerified: user.emailVerified,
              },
              operationType: 'write',
              path
            };
            console.error('Firestore Error: ', JSON.stringify(errInfo));
          }
        } catch (e) {
          console.error("Import/Bootstrap error:", e);
        }
      }
    };
    if (!loading && auth.currentUser) {
      bootstrapAdmin();
    }
  }, [loading, auth.currentUser]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const filteredProjects = activeCategory === "전체" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Clone items to ensure no gaps, especially for short lists or wide screens
  const displayProjects = filteredProjects.length > 0 
    ? [...filteredProjects, ...filteredProjects, ...filteredProjects, ...filteredProjects] 
    : [];

  return (
    <section id="portfolio" className="py-32 px-6 bg-[#05020a] overflow-hidden relative">
      {/* Admin Login Portal (Discreet but visible) */}
      <div className="absolute top-12 right-12 z-[60]">
        {!auth.currentUser ? (
          <button 
            onClick={handleLogin}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white/80 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm shadow-2xl"
          >
            <LogIn size={12} /> Admin Login
          </button>
        ) : isAdmin && (
          <button 
            onClick={() => setShowEditor(true)}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-full text-xs font-bold shadow-lg shadow-violet-500/30 hover:scale-105 transition-all"
          >
            <Settings size={14} /> Manage Projects
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-violet-500 font-bold uppercase tracking-widest text-xs mb-4 block"
            >
              PORTFOLIO
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-6"
            >
              PORTFOLIO
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-white/40 text-lg leading-relaxed"
            >
              다양한 업종의 브랜드와 함께한 결과물입니다.<br />
              전략적인 디자인과 개발로 비즈니스의 성장을 만들어냅니다.
            </motion.p>
          </div>
          
          <Link
            to="/portfolio"
            className="group px-6 py-3 border border-white/10 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-all text-white"
          >
            전체 포트폴리오 보기
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-12 border-b border-white/5 pb-8">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full">
        {loading ? (
          <div className="h-[500px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div 
            className="flex gap-8"
            animate={{ x: [0, "-50%"] }}
            transition={{ 
              duration: projects.length * 20, // Slightly faster, balanced speed
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {displayProjects.map((project, i) => (
              <a
                key={`${project.id}-${i}`}
                href={project.link || '#'}
                target={project.link ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`min-w-[300px] md:min-w-[450px] group transition-all ${!project.link ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="bg-[#1a1525] rounded-[2.5rem] p-4 border border-white/5 group-hover:border-violet-500/30 transition-all duration-500 h-full">
                  <div className={`aspect-3/4 rounded-[2rem] bg-linear-to-br ${project.color} mb-6 overflow-hidden relative`}>
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                  </div>
                  
                  <div className="px-4 pb-6">
                    <div className="inline-block px-3 py-1 bg-violet-600/10 border border-violet-500/20 rounded-md text-[10px] font-bold text-violet-400 uppercase mb-3">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-black mb-2 text-white group-hover:text-violet-400 transition-colors">{project.title}</h3>
                    <p className="text-white/40 text-sm mb-6 line-clamp-1">{project.description}</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-white/60 group-hover:text-white transition-all">
                      자세히 보기
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        )}
        
      </div>



      {/* Admin Modal */}
      <AnimatePresence>
        {showEditor && (
          <AdminPortfolioEditor 
            projects={projects} 
            onClose={() => setShowEditor(false)} 
            onRefresh={() => {}} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

