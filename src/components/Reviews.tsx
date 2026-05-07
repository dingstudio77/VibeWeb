import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const reviews = [
  {
    name: '김지연 대표',
    company: '루미에르 클리닉',
    text: '바이브웹 덕분으로 브랜드의 아이덴티티를 명확하게 전달할 수 있는 웹사이트를 구축할 수 있었습니다. 디자인과 기능 모두 기대 이상이었어요.',
    logo: 'L'
  },
  {
    name: '이준호 이사',
    company: 'MOODERY',
    text: '복잡한 요구사항을 빠르게 이해하고 최적의 솔루션을 제안해 주셔서 프로젝트가 순조롭게 진행되었습니다. 결과도 정말 만족스럽습니다!',
    logo: 'M'
  },
  {
    name: '박서연 대표',
    company: '메르시 스토어',
    text: '쇼핑몰 리뉴얼 후 전환율이 눈에 띄게 상승했어요. 사용성도 좋아져서 고객들의 만족도도 함께 올라간 것 같습니다. 믿고 맡길 수 있는 파트너입니다.',
    logo: 'merci'
  },
  {
    name: '최민석 팀장',
    company: '플래닛엑스',
    text: '전문적이고 체계적인 프로세스 덕분에 처음 진행하는 프로젝트도 안심하고 맡길 수 있었습니다. 앞으로도 계속 함께하고 싶어요.',
    logo: 'PX'
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 px-6 bg-[#0d0915] relative overflow-hidden">
      {/* Background Decorative Light Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="filter blur-[80px]">
          <path 
            d="M 1000 200 Q 800 400 600 200 T 200 400" 
            stroke="#7c3aed" 
            strokeWidth="60" 
            fill="none" 
            className="animate-pulse"
          />
          <path 
            d="M 0 800 Q 200 600 400 800 T 800 600" 
            stroke="#4f46e5" 
            strokeWidth="40" 
            fill="none" 
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-violet-500 font-bold tracking-[0.2em] text-sm uppercase mb-6 block"
          >
            REVIEW
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
          >
            바이브웹과 함께한<br />
            고객들의 <span className="text-[#7c3aed]">실제 후기</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            수많은 브랜드와 기업이 바이브웹과 함께 성장했습니다.<br />
            고객들의 만족이 곧 우리의 가치입니다.
          </motion.p>
        </div>

        <div className="relative w-full overflow-visible">
          <motion.div 
            className="flex gap-6"
            animate={{ x: [0, "-50%"] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, i) => (
              <div
                key={`${review.name}-${i}`}
                className="min-w-[300px] md:min-w-[400px] group bg-[#0a0514]/60 border border-white/5 p-10 rounded-[2.5rem] flex flex-col justify-between hover:border-violet-500/30 transition-all duration-500 hover:translate-y-[-8px]"
              >
                <div>
                  <Quote size={32} className="text-violet-600 mb-8 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <p className="text-white/80 leading-relaxed text-base md:text-lg mb-10 min-h-[120px]">
                    {review.text}
                  </p>
                </div>
                
                <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#1a1525] border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
                    {review.logo === 'merci' ? (
                      <span className="text-[10px] font-black text-white px-1">merci</span>
                    ) : review.logo === 'PX' ? (
                       <div className="flex flex-col items-center">
                          <div className="text-[8px] font-black text-white leading-none">PLANET X</div>
                       </div>
                    ) : (
                      <span className="text-xl font-black text-white">{review.logo}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">{review.company}</div>
                    <div className="text-xs text-white/40">{review.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>


      </div>
    </section>
  );
}
