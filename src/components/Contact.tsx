import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-[#05020a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side: Info */}
          <div className="flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black mb-8"
            >
              성장의 도약을<br />
              지속할 준비가 되셨나요?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-white/60 text-lg mb-12 max-w-md"
            >
              아이디어만 가져오세요. 바이브웹이 현실로 만들어 드립니다. 24시간 이내에 전문가가 직접 회신 드립니다.
            </motion.p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-violet-500">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-sm text-white/40 font-bold uppercase tracking-wider">Call Us</div>
                  <div className="text-lg font-bold">010-1234-5678</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-violet-500">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm text-white/40 font-bold uppercase tracking-wider">Email Us</div>
                  <div className="text-lg font-bold">hello@vibeweb.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-violet-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-sm text-white/40 font-bold uppercase tracking-wider">Visit Us</div>
                  <div className="text-lg font-bold">서울특별시 강남구 테헤란로 123 (바이브빌딩)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass p-10 rounded-[3rem] border-white/20"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">이름 / 업체명</label>
                  <input type="text" placeholder="홍길동" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">연락처</label>
                  <input type="tel" placeholder="010-0000-0000" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 ml-1">문의 유형</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition-colors appearance-none">
                  <option className="bg-zinc-900">홈페이지 제작</option>
                  <option className="bg-zinc-900">랜딩페이지 제작</option>
                  <option className="bg-zinc-900">유지보수 문의</option>
                  <option className="bg-zinc-900">기타</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 ml-1">상세 내용</label>
                <textarea rows={5} placeholder="제작하고 싶으신 사이트에 대해 간단히 적어주세요." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-colors resize-none mb-2"></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-5 bg-white text-black rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-95"
              >
                상담 신청하기
                <Send size={20} />
              </button>
              <div className="text-center text-xs text-white/30">
                상담 신청 시 개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
