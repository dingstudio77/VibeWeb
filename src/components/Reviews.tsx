import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const reviews = [
  {
    name: '김지연 대표',
    company: '루미에르 클리닉',
    text: '바이브웹 덕분에 브랜드의 아이덴티티를 명확하게 전달할 수 있는 웹사이트를 구축할 수 있었습니다. 디자인과 기능 모두 기대 이상이었어요.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    logo: 'LUMIÈRE'
  },
  {
    name: '이준호 이사',
    company: 'MOODERY',
    text: '복잡한 요구사항을 빠르게 이해하고 최적의 솔루션을 제안해 주셔서 프로젝트가 순조롭게 진행되었습니다. 결과도 정말 만족스럽습니다!',
    avatar: null,
    logo: 'M'
  },
  {
    name: '박서연 대표',
    company: '메르시 스토어',
    text: '쇼핑몰 리뉴얼 후 전환율이 눈에 띄게 상승했어요. 사용성도 좋아져서 고객들의 만족도도 함께 올라간 것 같습니다. 믿고 맡길 수 있는 파트너입니다.',
    avatar: null,
    logo: 'merci'
  },
  {
    name: '최민석 팀장',
    company: '플래닛엑스',
    text: '전문적이고 체계적인 프로세스 덕분에 처음 진행하는 프로젝트도 안심하고 맡길 수 있었습니다. 앞으로도 계속 함께하고 싶어요.',
    avatar: null,
    logo: 'PLANET X'
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 -right-1/4 w-[800px] h-[600px] bg-purple-600/[0.03] blur-[150px] rotate-45 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-purple-600 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            REVIEW
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-8 text-zinc-900 leading-tight"
          >
            바이브웹과 함께한<br />
            고객들의 <span className="text-purple-600">실제 후기</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 text-lg max-w-xl leading-relaxed"
          >
            수많은 브랜드와 기업이 바이브웹과 함께 성장했습니다.<br />
            고객들의 만족이 곧 우리의 가치입니다.
          </motion.p>
        </div>

        {/* Marquee Section */}
        <div className="relative overflow-hidden py-10 -mx-6 px-6">
          
          <motion.div 
            className="flex gap-6"
            animate={{
              x: [0, "-50%"]
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: "fit-content" }}
          >
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, i) => (
              <motion.div
                key={`${review.name}-${i}`}
                className="w-[350px] md:w-[450px] flex-shrink-0 bg-zinc-50 backdrop-blur-sm border border-black/5 rounded-[2rem] p-10 flex flex-col hover:border-purple-600/20 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="mb-8">
                  <Quote size={48} className="text-purple-600/50 mb-6 scale-x-[-1]" />
                  <p className="text-zinc-600 leading-relaxed text-[15px] min-h-[120px]">
                    {review.text}
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-black/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 border border-black/5 flex items-center justify-center overflow-hidden shrink-0">
                    {review.avatar ? (
                      <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-[10px] font-black tracking-tighter text-zinc-400 uppercase text-center px-1 font-display">
                        {review.logo}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="text-zinc-900 font-bold text-sm tracking-tight">{review.company}</div>
                    <div className="text-zinc-400 text-[13px]">{review.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-20">
          <div className="w-2 h-2 rounded-full bg-zinc-200" />
          <div className="w-2 h-2 rounded-full bg-zinc-200" />
          <div className="w-2 h-2 rounded-full bg-purple-600" />
          <div className="w-2 h-2 rounded-full bg-zinc-200" />
          <div className="w-2 h-2 rounded-full bg-zinc-200" />
        </div>
      </div>
    </section>
  );
}
