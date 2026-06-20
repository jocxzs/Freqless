import { useNavigate } from 'react-router-dom';
import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';
import Button from '../ui/Button';

const streakDots = ['white', 'white', 'white', 'white', 'white'];

const dotColors = {
  white: 'bg-white/60',
};

export default function StreakAlert() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <TopBar showSearch title="FreqlesS" />

      {/* Red danger banner */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden bg-[var(--field-bg)] border border-[var(--field-border)] p-6 flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-white/6 flex items-center justify-center">
          <span className="text-3xl">⚠️</span>
        </div>
        <div className="text-center">
          <h2 className="text-white font-bold text-xl">⚠ Risco de Quebra!</h2>
          <p className="text-white/60 text-sm mt-1">
            Sua sequência de <strong className="text-white">12 dias</strong> está em perigo!
          </p>
        </div>
      </div>

      {/* Streak display */}
      <div className="mx-4 mt-4 bg-[var(--field-bg)] rounded-2xl border border-[var(--field-border)] p-6">
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
      <div className="mx-4 mt-3 bg-[var(--field-bg)] rounded-2xl border border-[var(--field-border)] p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-white/6 flex items-center justify-center flex-shrink-0">
            <span className="text-sm">💬</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Seus amigos estão torcendo por você. Mostre que você aguenta! 💪
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
