import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  orderBy, 
  query,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle,
  X,
  Save,
  Image as ImageIcon
} from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
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

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  url?: string;
  order?: number;
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    url: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await checkAdminStatus(user.uid);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const checkAdminStatus = async (uid: string) => {
    try {
      const adminDoc = await getDoc(doc(db, 'admins', uid));
      if (adminDoc.exists()) {
        setIsAdmin(true);
        fetchPortfolios();
      } else {
        setIsAdmin(false);
        // If it's the target email but not in DB, we'll offer the bootstrap button later
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      // Even if check fails, we might want to try fetching to see if it's a global read issue
      if (error instanceof Error && error.message.includes("permission")) {
        console.warn("Permission denied for admins collection read. User:", uid);
      }
      setIsAdmin(false);
    }
  };

  const fetchPortfolios = async () => {
    const path = 'portfolios';
    try {
      const q = query(collection(db, path), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      const items: PortfolioItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as PortfolioItem);
      });
      setPortfolios(items);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const bootstrapAdmin = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'admins', user.uid), {
        email: user.email,
        createdAt: serverTimestamp()
      });
      setIsAdmin(true);
      fetchPortfolios();
    } catch (error) {
      console.error("Failed to bootstrap admin:", error);
      alert("전용 관리자 등록은 직접 Firestore 콘솔에서 'admins' 컬렉션에 UID 문서를 만들어야 할 수도 있습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const path = 'portfolios';
    try {
      if (editingItem) {
        const docRef = doc(db, path, editingItem.id);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, path), {
          ...formData,
          order: portfolios.length,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({ title: '', category: '', description: '', image: '', url: '' });
      fetchPortfolios();
    } catch (error) {
      handleFirestoreError(error, editingItem ? OperationType.UPDATE : OperationType.CREATE, path);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const path = 'portfolios';
    try {
      await deleteDoc(doc(db, path, id));
      fetchPortfolios();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
      url: item.url || '',
    });
    setIsModalOpen(true);
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white text-zinc-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-white px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white border border-black/5 p-12 rounded-[2.5rem] text-center shadow-xl"
        >
          <div className="w-20 h-20 bg-purple-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <ShieldAlert size={40} className="text-purple-600" />
          </div>
          <h1 className="text-3xl font-black text-zinc-900 mb-4">관리자 전용</h1>
          <p className="text-zinc-500 mb-10">관리자 계정으로 로그인하여 포트폴리오를 관리하세요.</p>
          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-black text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-black/80 transition-all shadow-lg shadow-black/10"
          >
            <ImageIcon size={20} />
            Google 계정으로 로그인
          </button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center bg-white px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full bg-white border border-black/5 p-12 rounded-[2.5rem] text-center shadow-xl"
        >
          <AlertCircle size={60} className="text-yellow-500 mx-auto mb-8" />
          <h1 className="text-3xl font-black text-zinc-900 mb-4">권한이 없습니다</h1>
          <p className="text-zinc-500 mb-4">
            로그인된 계정({user.email})은 관리자 권한이 없습니다. 
          </p>
          <div className="p-6 bg-zinc-50 rounded-2xl mb-8 text-sm text-zinc-400 text-left border border-black/5">
            <p className="mb-2 font-bold text-zinc-900/60 text-xs uppercase tracking-widest">설정 방법:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Firebase 콘솔을 엽니다.</li>
              <li>'admins' 컬렉션을 생성합니다.</li>
              <li>문서 ID로 아래 UID를 입력하고 email 필드를 추가합니다.</li>
            </ol>
            <div className="mt-4 p-3 bg-white rounded-lg font-mono text-[10px] break-all border border-black/10 select-all text-zinc-900">
              {user.uid}
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={bootstrapAdmin}
              className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
            >
              임시 관리자 등록 (테스트용)
            </button>
            <button 
              onClick={handleLogout}
              className="w-full py-3 bg-zinc-100 text-zinc-500 font-bold rounded-xl hover:bg-zinc-200 transition-all"
            >
              로그아웃
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2 text-zinc-900">포트폴리오 관리</h1>
            <p className="text-zinc-400">웹사이트에 표시될 프로젝트 이미지를 관리합니다.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-full flex items-center gap-2 hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
            >
              <Plus size={20} />
              프로젝트 추가
            </button>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 bg-zinc-100 text-zinc-500 font-bold rounded-full flex items-center gap-2 hover:bg-zinc-200 transition-all border border-black/5"
            >
              <LogOut size={20} />
              로그아웃
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portfolios.map((item) => (
            <div key={item.id} className="bg-white border border-black/5 rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button 
                    onClick={() => openEditModal(item)}
                    className="p-3 bg-white text-zinc-900 rounded-xl hover:scale-110 transition-transform shadow-lg"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-red-600 text-white rounded-xl hover:scale-110 transition-transform shadow-lg shadow-red-600/20"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block mb-2">{item.category}</span>
                <h3 className="font-bold text-lg mb-1 text-zinc-900">{item.title}</h3>
                <p className="text-xs text-zinc-500 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
          {portfolios.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-black/5 rounded-3xl bg-zinc-50">
              <ImageIcon size={48} className="mx-auto mb-4 text-zinc-200" />
              <p className="text-zinc-400">등록된 프로젝트가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsModalOpen(false); setEditingItem(null); }}
              className="absolute inset-0 bg-white/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white border border-black/10 p-10 rounded-[2.5rem] shadow-2xl"
            >
              <button 
                onClick={() => { setIsModalOpen(false); setEditingItem(null); }}
                className="absolute top-8 right-8 text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-black mb-8 text-zinc-900">
                {editingItem ? '프로젝트 수정' : '새 프로젝트 추가'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-2">프로젝트명</label>
                    <input 
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="예: PLANET X"
                      className="w-full h-14 bg-zinc-50 border border-black/5 rounded-2xl px-6 text-zinc-900 focus:border-purple-600 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-2">카테고리</label>
                    <input 
                      required
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="예: 기업 / 브랜드"
                      className="w-full h-14 bg-zinc-50 border border-black/5 rounded-2xl px-6 text-zinc-900 focus:border-purple-600 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-2">설명</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="프로젝트에 대한 간단한 설명을 입력하세요."
                    className="w-full h-32 bg-zinc-50 border border-black/5 rounded-2xl p-6 text-zinc-900 focus:border-purple-600 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-2">이미지 URL</label>
                  <input 
                    required
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://..."
                    className="w-full h-14 bg-zinc-50 border border-black/5 rounded-2xl px-6 text-zinc-900 focus:border-purple-600 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-2">프로젝트 링크 (선택사항)</label>
                  <input 
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    placeholder="https://..."
                    className="w-full h-14 bg-zinc-50 border border-black/5 rounded-2xl px-6 text-zinc-900 focus:border-purple-600 outline-none transition-colors"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit"
                    className="flex-1 h-16 bg-purple-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
                  >
                    <Save size={20} />
                    저장하기
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setIsModalOpen(false); setEditingItem(null); }}
                    className="px-10 h-16 bg-zinc-100 text-zinc-500 font-bold rounded-2xl hover:bg-zinc-200 transition-all"
                  >
                    취소
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
