import { motion } from 'motion/react';
import { ArrowRight, FileText, TrendingUp, Clock, Smartphone } from 'lucide-react';

export default function Hero() {
  const stats = [
    { icon: FileText, label: '500+', desc: '제작 완료 프로젝트' },
    { icon: TrendingUp, label: '98%', desc: '고객 만족도' },
    { icon: Clock, label: '7일~', desc: '평균 제작 기간' },
    { icon: Smartphone, label: '100%', desc: '반응형 디자인' },
  ];

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden bg-white text-zinc-900">
      {/* Background Image - Filling the entire screen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://postfiles.pstatic.net/MjAyNjA1MDZfMTk3/MDAxNzc4MDMyMTExMTYz.ZrY_oQTjUmBXou698sm2UcijctWV71lDxjswba_mkmMg.Pa8ktT7hZ7rWA7MZFseicOQbllODjg3u9oCL8rTSwqMg.PNG/%EB%B9%84%EC%A3%BC%EC%96%BC%EC%84%B9%EC%85%98_%EC%9D%B4%EB%AF%B8%EC%A7%80.png?type=w3840" 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        {/* Light gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50" />
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/[0.03] blur-[150px] rounded-full z-[1]" />
      
      {/* Grid Pattern/Lines background simulation */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-[1]" 
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-purple-600 font-bold tracking-tight mb-4"
          >
            웹사이트로 비즈니스의 바이브를 높이다
            <div className="h-[2px] w-12 bg-purple-600/30 mt-1" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-[70px] font-bold mb-8 leading-[1.05] tracking-tighter text-zinc-900"
          >
            브랜드의 첫인상을<br />
            <span className="text-zinc-900">디자인합니다</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-zinc-500 mb-10 max-w-lg leading-relaxed"
          >
            트렌디한 디자인과 높은 전환율을 갖춘 홈페이지.<br />
            바이브웹이 비즈니스의 성장을 함께합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-20"
          >
            <a
              href="#contact"
              className="group px-10 py-5 bg-purple-600 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-purple-700 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            >
              무료 상담 신청
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="px-10 py-5 bg-zinc-100 border border-black/5 rounded-full font-bold text-lg hover:bg-zinc-200 transition-all text-zinc-900"
            >
              포트폴리오 보기
            </a>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-black/5 pt-10"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center border border-black/5">
                  <stat.icon size={18} className="text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-black text-zinc-900 leading-none mb-1">{stat.label}</div>
                  <div className="text-xs font-medium text-zinc-400 uppercase tracking-tight">{stat.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
