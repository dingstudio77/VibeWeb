import { motion } from 'motion/react';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

const values = [
  {
    title: '감각적인 디자인',
    text: '단순한 예쁨을 넘어 브랜드의 영혼을 담는 디자인을 추구합니다.',
    icon: Lightbulb
  },
  {
    title: '전략적 기획',
    text: '비즈니스 목표를 이해하고 실질적인 성과로 이어지는 구조를 설계합니다.',
    icon: Target
  },
  {
    title: '압도적인 기술력',
    text: '최신 웹 표준과 기술 스택으로 가장 빠른 속도와 안정성을 보장합니다.',
    icon: TrendingUp
  }
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-[#0a0514] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-4 block">Who We Are</span>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              디지털 세상을 향한<br />
              <span className="text-white/40">가장 스타일리시한 초대</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
              바이브웹은 1인 브랜드부터 스타트업까지, 각자의 고유한 '바이브(Vibe)'를 웹이라는 캔버스에 담아내는 크리에이티브 스튜디오입니다. 
              우리는 트렌드를 선도하며 고객의 비즈니스가 디지털 공간에서 독보적인 존재감을 가질 수 있도록 돕습니다.
            </p>

          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="glass p-8 rounded-3xl flex gap-6 hover:bg-white/10 transition-colors group"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <value.icon size={28} className="text-violet-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-white/50">{value.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
