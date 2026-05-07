import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function FloatingKakao() {
  return (
    <motion.a
      href="http://pf.kakao.com/_MxoTxbxj"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#FEE500] text-[#3c1e1e] rounded-full shadow-2xl flex items-center justify-center cursor-pointer overflow-hidden group"
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <MessageCircle size={32} fill="#3c1e1e" />
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileHover={{ width: 'auto', opacity: 1 }}
        className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap hidden md:block"
      >
        카톡 실시간 상담
      </motion.div>
    </motion.a>
  );
}
