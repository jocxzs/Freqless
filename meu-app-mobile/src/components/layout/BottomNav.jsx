import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/feed', icon: '⊞', label: 'Feed' },
  { path: '/mensagens', icon: '✈', label: 'Messages' },
  { path: '/perfil', icon: '○', label: 'Profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black border-t border-[var(--border)] flex justify-around items-center py-4 z-50">
      {tabs.map(({ path, icon, label }) => {
        const active = pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-white' : 'text-white/60 hover:text-white'}`}
          >
            <span className="text-xl">{icon}</span>
          </button>
        );
      })}
    </nav>
  );
}
