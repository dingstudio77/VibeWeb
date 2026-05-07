import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

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

export default function FullPortfolio() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("전체");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioItem));
      setProjects(docs);
      setLoading(false);
    }, (error) => {
      console.error("Fetch error:", error);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const filteredProjects = activeCategory === "전체" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="min-h-screen bg-[#05020a] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <Link 
            to="/" 
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            메인으로 돌아가기
          </Link>
          <div className="text-right">
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">OUR PORTFOLIO</h1>
            <p className="text-white/40 max-w-xl ml-auto leading-relaxed">
              성공적인 비즈니스를 위한 최적의 디지털 솔루션을 경험해보세요.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-16 border-b border-white/5 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-violet-600 text-white shadow-xl shadow-violet-500/20' 
                  : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-white/20">
            <p className="text-xl font-bold">등록된 프로젝트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index % 3 * 0.1 }}
                viewport={{ once: true }}
                className="group bg-[#110d1f] rounded-[2.5rem] p-4 border border-white/5 hover:border-violet-500/30 transition-all duration-500"
              >
                <div className={`aspect-3/4 rounded-[2rem] bg-linear-to-br ${project.color} mb-6 overflow-hidden relative`}>
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
                    >
                      <div className="px-6 py-3 bg-white text-black rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        사이트 방문하기
                        <ExternalLink size={16} />
                      </div>
                    </a>
                  )}
                </div>
                
                <div className="px-4 pb-6">
                  <span className="inline-block px-3 py-1 bg-violet-600/10 border border-violet-500/20 rounded-md text-[10px] font-bold text-violet-400 uppercase mb-3 text-center">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-black mb-2 text-white group-hover:text-violet-400 transition-colors">{project.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
