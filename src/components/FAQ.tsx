import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: '제작 기간은 얼마나 걸리나요?',
    answer: '랜딩페이지의 경우 평균 1~2주, 일반형 홈페이지는 3~5주 정도 소요됩니다. 프로젝트의 복잡도에 따라 일정은 조율될 수 있습니다.'
  },
  {
    question: '제작 비용은 어떻게 책정되나요?',
    answer: '페이지의 수, 필요한 기능(결제 시스템, 예약 시스템 등), 디자인의 난이도에 따라 달라집니다. 자세한 비용은 상담을 통해 최적의 견적을 제안해 드립니다.'
  },
  {
    question: '도메인과 호스팅도 대행해주시나요?',
    answer: '네, 고객님께서 번거롭지 않도록 도메인 구매부터 서버 세팅, 보안 인증서(SSL) 설치까지 모두 대행해 드립니다.'
  },
  {
    question: '모바일에서도 잘 나오나요?',
    answer: '기본적으로 모든 프로젝트는 반응형 웹(Responsive Web)으로 제작됩니다. 스마트폰, 태블릿, PC 등 어떤 기기에서도 최적의 화면을 제공합니다.'
  },
  {
    question: '제작 후에 수정이 가능한가요?',
    answer: '제작 완료 후 1개월간 무상 유지보수 기간을 제공하며, 간단한 텍스트 수정 및 이미지 교체는 직접 하실 수 있도록 관리 시스템을 구축해 드립니다.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-6 bg-[#0a0514]">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black mb-4">자주 묻는 질문</h2>
          <p className="text-white/50">궁금하신 사항을 확인해 보세요.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden border-white/5"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-bold">{faq.question}</span>
                {activeIndex === i ? <Minus size={20} className="text-violet-500" /> : <Plus size={20} />}
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-6 text-white/60 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
