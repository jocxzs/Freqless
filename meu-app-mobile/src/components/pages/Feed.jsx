import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import Avatar from '../components/ui/Avatar';

const posts = [
  {
    id: 1,
    user: 'joão gomes',
    streak: 22,
    message: 'Alcançou recorde pessoal !!',
    reactions: ['❤️', '😮', '😊', '🌙'],
  },
  {
    id: 2,
    user: 'ana silva',
    streak: 49,
    message: 'Ranking 9 geral !!',
    reactions: ['❤️', '😮', '😊', '🌙'],
  },
];

const ranking = [
  { pos: 1, name: 'Maria Santos', streak: 82, color: 'from-yellow-400 to-orange-400' },
  { pos: 2, name: 'Lucas Ferreira', streak: 21, color: 'from-slate-300 to-slate-400' },
  { pos: 3, name: 'João Silva', streak: 15, color: 'from-orange-400 to-amber-600' },
  { pos: 4, name: 'Pedro Costa', streak: 7, color: '' },
  { pos: 5, name: 'Ana Lima', streak: 5, color: '' },
];

function PostCard({ post }) {
  const [reacted, setReacted] = useState(null);

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-3 border border-[#252525]">
      <div className="flex items-center gap-2 mb-3">
        <Avatar name={post.user} size="sm" />
        <div className="flex items-center gap-1">
          <span className="text-white text-sm font-semibold">{post.user}</span>
          <span className="text-[#555] text-xs">•</span>
          <span className="text-orange-400 text-xs">🔥 {post.streak} dias</span>
        </div>
      </div>
      <p className="text-white font-bold text-center text-base mb-3">{post.message}</p>
      <div className="flex gap-2">
        {post.reactions.map((emoji, i) => (
          <button
            key={i}
            onClick={() => setReacted(i)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all
              ${reacted === i ? 'bg-[#4F6EF7]/30 scale-110' : 'bg-[#252525] hover:bg-[#2e2e2e]'}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Feed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#141414] pb-24">
      <TopBar showSearch title="FreqlesS" />

      <div className="px-4 pt-4">
        {/* Posts */}
        {posts.map(p => <PostCard key={p.id} post={p} />)}

        {/* School Ranking */}
        <div className="mt-4">
          <h3 className="text-white font-bold text-base text-center mb-3">Ranking escolar</h3>
          <div className="flex flex-col gap-2">
            {ranking.map(({ pos, name, streak, color }) => (
              <div key={pos} className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl px-4 py-3 border border-[#252525]">
                {pos <= 3 ? (
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-black`}>
                    {pos}
                  </div>
                ) : (
                  <span className="w-7 text-center text-[#555] text-sm font-semibold">{pos}</span>
                )}
                <span className="flex-1 text-white text-sm">{name}</span>
                <div className="flex items-center gap-1 bg-[#252525] rounded-full px-2 py-0.5">
                  <span className="text-orange-400 text-xs">🔥</span>
                  <span className="text-orange-400 text-xs font-bold">{streak}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak alert button */}
        <button
          onClick={() => navigate('/streak')}
          className="w-full mt-4 py-3 bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-800/40 rounded-2xl text-orange-400 text-sm font-semibold"
        >
          🔥 Ver alerta de sequência
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
