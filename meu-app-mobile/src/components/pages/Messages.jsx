import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';
import Avatar from '../ui/Avatar';

const contacts = [
  { id: 1, name: 'joaquim ferreira', time: '12min', preview: 'Lorem ipsum is simply dummy text of printing and typesetting...', streak: 12 },
  { id: 2, name: 'gabriel alves', time: '12min', preview: 'Lorem ipsum is simply dummy text of printing and typesetting...', streak: 6 },
  { id: 3, name: 'gustavo gomes', time: '12min', preview: 'Lorem ipsum is simply dummy text of printing and typesetting...', streak: 9 },
  { id: 4, name: 'ana silva', time: '12min', preview: 'Lorem ipsum is simply dummy text of printing and typesetting...', streak: 12 },
  { id: 5, name: 'carlos prates', time: '10min', preview: 'Lorem ipsum is simply dummy text of printing and typesetting...', streak: 4 },
  { id: 6, name: 'jair trancoso', time: '12min', preview: 'Lorem ipsum is simply dummy text of printing and typesetting...', streak: 3 },
  { id: 7, name: 'rafael rocha', time: '12min', preview: 'Lorem ipsum is simply dummy text of printing and typesetting...', streak: 10 },
];

export default function Messages() {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <TopBar showSearch title="FreqlesS" />

      <div className="px-4 pt-2">
        {contacts.map(c => (
            <button key={c.id} className="w-full flex items-center gap-3 py-4 border-b border-[var(--border)] active:bg-[var(--field-bg)] transition">
            <Avatar name={c.name} size="md" />
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-white text-sm font-semibold capitalize">{c.name}</span>
                <span className="text-white/60 text-xs">• {c.time}</span>
              </div>
              <p className="text-white/60 text-xs mt-0.5 truncate">{c.preview}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-white text-sm font-semibold">{c.streak}</span>
              <span className="text-white/80 text-sm">🔥</span>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
