import { motion } from 'motion/react';
import { Rocket, Monitor, Smartphone, Gauge, Search, Layout } from 'lucide-react';

const services = [
  {
    title: '홈페이지 제작',
    description: '브랜드 정체성을 반영한 맞춤형 프리미엄 공식 웹사이트를 제작합니다.',
    icon: Monitor,
    tags: ['Brand Site', 'Corporate', 'E-commerce']
  },
  {
    title: '랜딩페이지',
    description: '높은 전환율을 목표로 전략적 기획과 압도적인 디자인의 랜딩페이지를 제작합니다.',
    icon: Layout,
    tags: ['Marketing', 'Ads', 'Sale Focus']
  },
  {
    title: '반응형 웹',
    description: '모바일, 태블릿, 데스크탑 모든 환경에서 최적의 UI/UX를 제공합니다.',
    icon: Smartphone,
    tags: ['Mobile First', 'Cross Platform']
  },
  {
    title: '성능 최적화',
    description: '압도적인 로딩 속도와 최신 기술 스택을 통해 최상의 퍼포먼스를 보장합니다.',
    icon: Gauge,
    tags: ['Vite', 'React', 'Fast Load']
  },
  {
    title: '검색 최적화 (SEO)',
    description: '검색 엔진에서 귀하의 비즈니스가 상단에 노출될 수 있도록 기술적 SEO를 적용합니다.',
    icon: Search,
    tags: ['SEO', 'Google Search', 'Meta']
  },
  {
    title: '유지보수 & 운영',
    description: '제작 이후에도 안전하고 지속적인 사이트 운영을 위한 사후 관리를 제공합니다.',
    icon: Rocket,
    tags: ['Support', 'Update', 'Hosting']
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 bg-[#120d1f] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-violet-500 font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              Our Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black"
            >
              비즈니스를 위한<br />
              올인원 솔루션
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/50 text-lg max-w-sm mb-2"
          >
            기획부터 제작, 운영까지 전문화된 프로세스로 귀하의 성공을 돕습니다.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-violet-600/20 group-hover:text-violet-500 transition-colors">
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-tight py-1 px-2 bg-white/5 rounded-md text-white/40">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
