import { motion, useSpring, useTransform, useInView } from 'motion/react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, TrendingUp, Clock, Smartphone } from 'lucide-react';

const stats = [
  { label: '제작 완료 프로젝트', target: 500, suffix: '+', icon: FileText },
  { label: '고객 만족도', target: 98, suffix: '%', icon: TrendingUp },
  { label: '평균 제작 기간', target: 7, suffix: '일~', icon: Clock },
  { label: '반응형 디자인', target: 100, suffix: '%', icon: Smartphone },
];

function CountingNumber({ target, suffix }: { target: number, suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });
  const displayValue = useTransform(spring, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(target);
    }
  }, [isInView, spring, target]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-black">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

function AnimatedTitle({ text, className, highlightWords = [] }: { text: string, className?: string, highlightWords?: string[] }) {
  const words = text.split(' ');
  
  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.2em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={letterVariants}
              className={`inline-block ${highlightWords.includes(word) ? 'text-white' : ''}`}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
  }
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3
    }
  }
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden bg-[#0a0514]">
      {/* Immersive Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://postfiles.pstatic.net/MjAyNjA1MDZfMTk3/MDAxNzc4MDMyMTExMTYz.ZrY_oQTjUmBXou698sm2UcijctWV71lDxjswba_mkmMg.Pa8ktT7hZ7rWA7MZFseicOQbllODjg3u9oCL8rTSwqMg.PNG/%EB%B9%84%EC%A3%BC%EC%96%BC%EC%84%B9%EC%85%98_%EC%9D%B4%EB%AF%B8%EC%A7%80.png?type=w3840" 
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Overlays for depth and readability */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0514] via-transparent to-[#0a0514]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0514] via-[#0a0514]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-violet-500 font-bold text-sm md:text-base tracking-wide mb-6 flex items-center gap-3"
          >
            웹사이트로 비즈니스의 바이브를 높이다
            <div className="w-12 h-[1px] bg-violet-500/50" />
          </motion.div>

          <div className="mb-8">
            <AnimatedTitle 
              text="브랜드의 첫인상을" 
              className="text-5xl md:text-7xl xl:text-[80px] font-black leading-[1.1] tracking-tighter text-white/90"
              highlightWords={["첫인상을"]}
            />
            <AnimatedTitle 
              text="디자인합니다" 
              className="text-5xl md:text-7xl xl:text-[80px] font-black leading-[1.1] tracking-tighter"
              highlightWords={[]}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-white/60 mb-12 max-w-xl leading-relaxed font-medium"
          >
            트렌디한 디자인과 높은 전환율을 갖춘 홈페이지.<br />
            바이브웹이 비즈니스의 성장을 함께합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="group px-8 py-4 bg-linear-to-r from-violet-700 to-indigo-600 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:brightness-110 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-violet-500/30"
            >
              무료 상담 신청
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all text-white/70 backdrop-blur-sm"
            >
              포트폴리오 보기
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <div className="mt-20 flex flex-wrap gap-12 md:gap-16">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex flex-col items-start gap-1"
              >
                <div className="text-violet-500 mb-2 opacity-80">
                  <stat.icon size={22} />
                </div>
                <CountingNumber target={stat.target} suffix={stat.suffix} />
                <div className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-widest whitespace-nowrap">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
