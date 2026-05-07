import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Save, Trash2, Link as LinkIcon, Palette } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, setDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  img: string;
  link?: string;
  color: string;
  order: number;
  createdAt?: any;
}

interface Props {
  projects: PortfolioItem[];
  onClose: () => void;
  onRefresh: () => void;
}

export default function AdminPortfolioEditor({ projects, onClose, onRefresh }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({});
  const [loading, setLoading] = useState(false);

  const categories = ["기업 / 브랜드", "뷰티 / 헬스"];
  const colorPresets = [
    'from-blue-600/20 to-violet-600/20',
    'from-orange-600/20 to-amber-600/20',
    'from-emerald-600/20 to-teal-600/20',
    'from-indigo-600/20 to-blue-600/20',
    'from-pink-600/20 to-rose-600/20',
    'from-zinc-600/20 to-slate-600/20'
  ];

  const handleEdit = (project: PortfolioItem) => {
    setEditingId(project.id);
    setFormData(project);
  };

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({
      title: '',
      category: categories[0],
      description: '',
      img: '',
      color: colorPresets[0],
      order: projects.length,
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.img) return;
    setLoading(true);
    try {
      if (editingId === 'new') {
        const path = 'portfolio';
        try {
          await addDoc(collection(db, path), {
            ...formData,
            createdAt: serverTimestamp(),
          });
        } catch (error) {
          handleFirestoreError(error, 'create', path);
        }
      } else if (editingId) {
        const path = `portfolio/${editingId}`;
        const { id, ...data } = formData as PortfolioItem;
        
        // Final payload preparation
        const payload: any = {
          ...data,
          // Ensure we have a valid createdAt for its creation if it's a fallback ID
          createdAt: data.createdAt || serverTimestamp(),
        };

        try {
          // Use setDoc with merge: true which is safer as it handles both create and update
          // if we are transitioning from fallback to real data
          await setDoc(doc(db, 'portfolio', editingId), payload, { merge: true });
        } catch (error) {
          handleFirestoreError(error, 'update', path);
        }
      }
      setEditingId(null);
      onRefresh();
    } catch (error) {
      console.error("Save error details:", error);
      alert("저장 중 오류가 발생했습니다. 권한이 없거나 데이터 형식이 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  function handleFirestoreError(error: unknown, operationType: string, path: string | null) {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  }

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'portfolio', id));
      onRefresh();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl bg-[#110c1d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#1a1525]">
          <div>
            <h2 className="text-xl font-bold">포트폴리오 관리</h2>
            <p className="text-sm text-white/40">업로드된 프로젝트를 수정하거나 추가할 수 있습니다.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {editingId ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/5"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                {editingId === 'new' ? <Plus size={20} /> : <Save size={20} />}
                {editingId === 'new' ? '새 프로젝트 추가' : '프로젝트 수정'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase">프로젝트명</label>
                  <input 
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="프로젝트 이름을 입력하세요"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-violet-500 outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase">카테고리</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-violet-500 outline-none transition-all"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-white/40 uppercase">설명</label>
                  <input 
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="짧은 설명을 입력하세요"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-violet-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-white/40 uppercase flex items-center gap-2">
                    <LinkIcon size={14} /> 이미지 URL
                  </label>
                  <input 
                    type="text"
                    value={formData.img}
                    onChange={(e) => setFormData({...formData, img: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-violet-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-white/40 uppercase flex items-center gap-2">
                    <LinkIcon size={14} /> 프로젝트 링크 (URL)
                  </label>
                  <input 
                    type="text"
                    value={formData.link || ''}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-violet-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-white/40 uppercase flex items-center gap-2">
                    <Palette size={14} /> 배경 컬러 그라데이션
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {colorPresets.map(color => (
                      <button
                        key={color}
                        onClick={() => setFormData({...formData, color})}
                        className={`h-10 rounded-lg bg-linear-to-br ${color} border-2 ${formData.color === color ? 'border-white' : 'border-transparent'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {loading ? '저장 중...' : '저장하기'}
                </button>
                <button 
                  onClick={() => setEditingId(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all"
                >
                  취소
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <button 
                onClick={handleAddNew}
                className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/40 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/5 transition-all"
              >
                <Plus size={20} /> 새 프로젝트 추가
              </button>

              <div className="grid gap-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 group">
                    <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${project.color} flex-shrink-0 overflow-hidden`}>
                      <img src={project.img} alt="" className="w-full h-full object-cover mix-blend-overlay" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-violet-400 uppercase mb-1">{project.category}</div>
                      <h4 className="font-bold">{project.title}</h4>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(project)}
                        className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
                      >
                        <Save size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-red-400 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
