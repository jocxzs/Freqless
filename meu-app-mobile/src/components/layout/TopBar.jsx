import { useNavigate } from 'react-router-dom';

export default function TopBar({ showSearch = false, title = 'FreqlesS' }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#141414] border-b border-[#1e1e1e] flex items-center justify-between px-4 py-3">
      {showSearch ? (
        <button className="text-white text-xl">🔍</button>
      ) : (
        <span className="w-6" />
      )}

      <span className="font-bold text-white text-lg tracking-tight">{title}</span>

      <button onClick={() => navigate('/configuracoes')} className="text-white text-xl opacity-70 hover:opacity-100 transition">
        ⚙
      </button>
    </header>
  );
}
