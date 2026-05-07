import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

const categories = [
  '전체', '기업 / 브랜드', '쇼핑몰', '병원 / 의료', '교육 / 기관', '뷰티 / 헬스', '기타'
];

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  url?: string;
}

const fallbackProjects: PortfolioItem[] = [
  {
    id: 'f1',
    title: 'PLANET X',
    category: '기업 / 브랜드',
    description: 'IT 솔루션 기업 공식 홈페이지 리뉴얼',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f2',
    title: 'MOODERY',
    category: '쇼핑몰',
    description: '라이프스타일 쇼핑몰 구축',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f3',
    title: 'LUMIÈRE CLINIC',
    category: '병원 / 의료',
    description: '피부과 클리닉 홈페이지',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'f4',
    title: 'CODEBRIDGE',
    category: '교육 / 기관',
    description: '프로그래밍 교육 기관 홈페이지',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [projects, setProjects] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'portfolios'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: PortfolioItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as PortfolioItem);
      });
      setProjects(items.length > 0 ? items : fallbackProjects);
    }, (error) => {
      console.error("Error fetching portfolios:", error);
      setProjects(fallbackProjects);
    });

    return () => unsubscribe();
  }, []);

  const filteredProjects = activeCategory === '전체' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="text-left">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-purple-600 font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              PORTFOLIO
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-6 text-zinc-900"
            >
              바이브웹의 포트폴리오
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-zinc-500 text-lg max-w-xl leading-relaxed"
            >
              다양한 업종의 브랜드와 함께한 결과물입니다.<br />
              전략적인 디자인과 개발로 비즈니스의 성장을 만들어냅니다.
            </motion.p>
          </div>
          
          <motion.a
            href="#"
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 px-8 py-3 rounded-full border border-black/10 text-zinc-600 font-bold hover:bg-zinc-50 transition-all"
          >
            전체 포트폴리오 보기
            <ArrowRight size={20} className="text-purple-600" />
          </motion.a>
        </div>

        {/* Category Filter */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max border-b border-black/5 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                  activeCategory === cat 
                    ? 'bg-purple-600/10 border-purple-600/20 text-purple-600' 
                    : 'border-transparent text-zinc-400 hover:text-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Marquee Section */}
        <div className="relative overflow-hidden py-10 -mx-6 px-6">
          
          <motion.div 
            className="flex gap-6"
            animate={{
              x: [0, "-50%"]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: "fit-content" }}
          >
            {(projects.length < 5 ? [...projects, ...projects, ...projects] : [...projects, ...projects]).map((project, i) => {
              const Content = (
                <div className="flex flex-col h-full">
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="inline-block px-3 py-1 bg-purple-600/10 text-purple-600 text-[10px] font-bold rounded-md mb-4 w-fit">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-black text-zinc-900 mb-2">{project.title}</h3>
                    <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-zinc-400 font-bold group/link hover:text-zinc-900 transition-colors mt-auto">
                      자세히 보기
                      <ArrowRight size={18} className="translate-y-[1px] group-hover/link:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={`${project.id}-${i}`}
                  className="w-[320px] md:w-[400px] flex-shrink-0 group bg-white rounded-3xl overflow-hidden border border-black/5 flex flex-col shadow-sm hover:shadow-xl transition-all"
                >
                  {project.url ? (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {Content}
                    </a>
                  ) : (
                    Content
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-16">
          <div className="w-2 h-2 rounded-full bg-purple-600" />
          <div className="w-2 h-2 rounded-full bg-zinc-200" />
          <div className="w-2 h-2 rounded-full bg-zinc-200" />
          <div className="w-2 h-2 rounded-full bg-zinc-200" />
        </div>
      </div>
    </section>
  );
}

