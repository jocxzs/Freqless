import { useNavigate } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import Button from '../components/ui/Button';

const streakDots = ['blue', 'blue', 'blue', 'blue', 'red'];

const dotColors = {
  blue: 'bg-blue-400',
  red: 'bg-red-500',
};

export default function StreakAlert() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#141414] pb-24">
      <TopBar showSearch title="FreqlesS" />

      {/* Red danger banner */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden bg-gradient-to-b from-red-900/80 to-[#1a1a1a] border border-red-800/40 p-6 flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">
          <span className="text-3xl">⚠️</span>
        </div>
        <div className="text-center">
          <h2 className="text-orange-400 font-bold text-xl">⚠ Risco de Quebra!</h2>
          <p className="text-[#aaa] text-sm mt-1">
            Sua sequência de <strong className="text-white">12 dias</strong> está em perigo!
          </p>
        </div>
      </div>

      {/* Streak display */}
      <div className="mx-4 mt-4 bg-[#1a1a1a] rounded-2xl border border-[#252525] p-6">
        <h3 className="text-white font-bold text-lg mb-4">🔥 Sua sequencia</h3>
        <div className="flex gap-2 mb-6">
          {streakDots.map((color, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full ${dotColors[color]} ${color === 'red' ? 'animate-pulse' : ''}`}
            />
          ))}
        </div>

        <Button variant="primary" onClick={() => navigate('/feed')}>
          Registrar sua presença →
        </Button>
      </div>

      {/* Friends cheering */}
      <div className="mx-4 mt-3 bg-[#1a1a1a] rounded-2xl border border-[#252525] p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm">💬</span>
          </div>
          <p className="text-[#aaa] text-sm leading-relaxed">
            Seus amigos estão torcendo por você. Mostre que você aguenta! 💪
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
