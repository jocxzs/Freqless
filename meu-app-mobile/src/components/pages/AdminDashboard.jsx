import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Mock Data ──────────────────────────────────────────────────────────────
const students = [
  { id: 1, name: 'Pedro Almeida',    class: '9A', absences: 18, streak: 0,  risk: 'alto',  lastSeen: '12 dias atrás', trend: 'down' },
  { id: 2, name: 'Larissa Nunes',    class: '8B', absences: 14, streak: 2,  risk: 'alto',  lastSeen: '5 dias atrás',  trend: 'down' },
  { id: 3, name: 'Carlos Souza',     class: '7C', absences: 10, streak: 5,  risk: 'médio', lastSeen: '2 dias atrás',  trend: 'stable' },
  { id: 4, name: 'Marta Ferreira',   class: '9B', absences: 9,  streak: 3,  risk: 'médio', lastSeen: '3 dias atrás',  trend: 'up' },
  { id: 5, name: 'Rafael Lima',      class: '8A', absences: 6,  streak: 11, risk: 'baixo', lastSeen: 'hoje',          trend: 'up' },
  { id: 6, name: 'Beatriz Costa',    class: '7A', absences: 4,  streak: 22, risk: 'baixo', lastSeen: 'hoje',          trend: 'up' },
  { id: 7, name: 'Lucas Martins',    class: '9C', absences: 16, streak: 1,  risk: 'alto',  lastSeen: '8 dias atrás',  trend: 'down' },
  { id: 8, name: 'Aline Rodrigues',  class: '8C', absences: 11, streak: 4,  risk: 'médio', lastSeen: '1 dia atrás',   trend: 'stable' },
];

const weeklyAttendance = [
  { day: 'Seg', pct: 78 },
  { day: 'Ter', pct: 85 },
  { day: 'Qua', pct: 72 },
  { day: 'Qui', pct: 90 },
  { day: 'Sex', pct: 65 },
];

const alerts = [
  { id: 1, type: 'danger', text: 'Pedro Almeida está ausente há 12 dias consecutivos — risco crítico de evasão.' },
  { id: 2, type: 'danger', text: 'Lucas Martins perdeu mais de 30% das aulas no mês. Contato urgente.' },
  { id: 3, type: 'warning', text: 'Larissa Nunes: sequência quebrada há 5 dias. Verificar situação.' },
  { id: 4, type: 'info', text: 'Carlos Souza voltou após 3 dias ausente. Sequência retomada.' },
];

// ── Sub-components ─────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }) {
  const colors = {
    red:    'bg-red-500/10 border-red-800/30 text-red-400',
    orange: 'bg-orange-500/10 border-orange-800/30 text-orange-400',
    blue:   'bg-blue-500/10 border-blue-800/30 text-blue-400',
    green:  'bg-green-500/10 border-green-800/30 text-green-400',
  };
  return (
    <div className={`rounded-2xl border p-4 ${colors[color]}`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-black">{value}</div>
      <div className="text-xs opacity-70 mt-0.5">{label}</div>
    </div>
  );
}

function RiskBadge({ risk }) {
  const styles = {
    alto:  'bg-red-500/20 text-red-400 border-red-700/30',
    médio: 'bg-orange-500/20 text-orange-400 border-orange-700/30',
    baixo: 'bg-green-500/20 text-green-400 border-green-700/30',
  };
  return (
    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${styles[risk]}`}>
      {risk}
    </span>
  );
}

function TrendIcon({ trend }) {
  if (trend === 'down')   return <span className="text-red-400 text-sm">↓</span>;
  if (trend === 'up')     return <span className="text-green-400 text-sm">↑</span>;
  return <span className="text-[#555] text-sm">→</span>;
}

function AlertBanner({ alert }) {
  const styles = {
    danger:  { border: 'border-red-800/40',    bg: 'bg-red-900/20',    icon: '🚨', text: 'text-red-300' },
    warning: { border: 'border-orange-800/40', bg: 'bg-orange-900/20', icon: '⚠️', text: 'text-orange-300' },
    info:    { border: 'border-blue-800/40',   bg: 'bg-blue-900/20',   icon: 'ℹ️', text: 'text-blue-300' },
  };
  const s = styles[alert.type];
  return (
    <div className={`flex gap-3 items-start rounded-xl border ${s.border} ${s.bg} p-3`}>
      <span className="text-base flex-shrink-0 mt-0.5">{s.icon}</span>
      <p className={`text-xs leading-relaxed ${s.text}`}>{alert.text}</p>
    </div>
  );
}

function MiniBarChart({ data }) {
  const max = Math.max(...data.map(d => d.pct));
  return (
    <div className="flex items-end gap-2 h-20">
      {data.map(({ day, pct }) => {
        const h = Math.round((pct / max) * 100);
        const color = pct >= 85 ? 'bg-green-500' : pct >= 70 ? 'bg-orange-500' : 'bg-red-500';
        return (
          <div key={day} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[9px] text-[#555]">{pct}%</span>
            <div className="w-full rounded-t-md transition-all" style={{ height: `${h}%` }}>
              <div className={`w-full h-full rounded-t-md ${color}`} />
            </div>
            <span className="text-[10px] text-[#555]">{day}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('visao-geral');
  const [filter, setFilter] = useState('todos');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const riskCounts = {
    alto:  students.filter(s => s.risk === 'alto').length,
    médio: students.filter(s => s.risk === 'médio').length,
    baixo: students.filter(s => s.risk === 'baixo').length,
  };

  const filtered = filter === 'todos' ? students : students.filter(s => s.risk === filter);

  const tabs = [
    { id: 'visao-geral', label: 'Visão Geral' },
    { id: 'alunos',      label: 'Alunos' },
    { id: 'alertas',     label: `Alertas ${alerts.filter(a => a.type === 'danger').length > 0 ? '🔴' : ''}` },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-10">

      {/* ── Header ── */}
      <div className="bg-[#141414] border-b border-[#1e1e1e] px-4 py-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-white">FreqlesS</span>
            <span className="text-[10px] bg-[#4F6EF7]/20 text-[#4F6EF7] px-2 py-0.5 rounded-full font-bold uppercase border border-[#4F6EF7]/30">Admin</span>
          </div>
          <p className="text-[#555] text-xs mt-0.5">Painel de Evasão Escolar</p>
        </div>
        <button onClick={() => navigate('/login')} className="text-[#444] text-xs hover:text-[#777] transition">
          Sair →
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex border-b border-[#1e1e1e] bg-[#141414]">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-3 text-xs font-semibold transition-all border-b-2 ${
              tab === t.id
                ? 'border-[#4F6EF7] text-[#4F6EF7]'
                : 'border-transparent text-[#444] hover:text-[#777]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* ════════════════ VISÃO GERAL ════════════════ */}
        {tab === 'visao-geral' && (
          <>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Alto risco de evasão" value={riskCounts.alto}  icon="🚨" color="red" />
              <StatCard label="Risco médio"           value={riskCounts.médio} icon="⚠️" color="orange" />
              <StatCard label="Total de alunos"       value={students.length}  icon="🎓" color="blue" />
              <StatCard label="Frequência hoje"       value="74%"              icon="📊" color="green" />
            </div>

            {/* Weekly chart */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-[#252525] p-4">
              <h3 className="text-white text-sm font-bold mb-3">Frequência semanal</h3>
              <MiniBarChart data={weeklyAttendance} />
              <p className="text-[#444] text-[10px] mt-2 text-center">Média: 78% — abaixo do ideal (85%)</p>
            </div>

            {/* Top at-risk students */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-[#252525] p-4">
              <h3 className="text-white text-sm font-bold mb-3">🚨 Alunos críticos</h3>
              <div className="space-y-3">
                {students.filter(s => s.risk === 'alto').map(s => (
                  <div key={s.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-semibold">{s.name}</p>
                      <p className="text-[#555] text-xs">{s.class} · {s.absences} faltas · visto {s.lastSeen}</p>
                    </div>
                    <TrendIcon trend={s.trend} />
                  </div>
                ))}
              </div>
            </div>

            {/* Evasion risk summary bar */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-[#252525] p-4">
              <h3 className="text-white text-sm font-bold mb-3">Distribuição de risco</h3>
              <div className="flex rounded-full overflow-hidden h-3 mb-2">
                <div className="bg-red-500"    style={{ width: `${(riskCounts.alto  / students.length) * 100}%` }} />
                <div className="bg-orange-500" style={{ width: `${(riskCounts.médio / students.length) * 100}%` }} />
                <div className="bg-green-500"  style={{ width: `${(riskCounts.baixo / students.length) * 100}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-[#555]">
                <span>🔴 Alto: {riskCounts.alto}</span>
                <span>🟠 Médio: {riskCounts.médio}</span>
                <span>🟢 Baixo: {riskCounts.baixo}</span>
              </div>
            </div>
          </>
        )}

        {/* ════════════════ ALUNOS ════════════════ */}
        {tab === 'alunos' && (
          <>
            {/* Filter pills */}
            <div className="flex gap-2">
              {['todos', 'alto', 'médio', 'baixo'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${
                    filter === f
                      ? 'bg-[#4F6EF7] text-white'
                      : 'bg-[#1e1e1e] text-[#555] border border-[#2a2a2a] hover:text-[#aaa]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Student list */}
            <div className="space-y-2">
              {filtered.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStudent(selectedStudent?.id === s.id ? null : s)}
                  className="w-full text-left bg-[#1a1a1a] rounded-2xl border border-[#252525] p-4 active:bg-[#222] transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-semibold">{s.name}</span>
                      <span className="text-[#444] text-xs">{s.class}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendIcon trend={s.trend} />
                      <RiskBadge risk={s.risk} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#555]">
                    <span>📅 {s.absences} faltas</span>
                    <span>🔥 {s.streak} dias seguidos</span>
                    <span>👁 {s.lastSeen}</span>
                  </div>

                  {/* Expanded detail */}
                  {selectedStudent?.id === s.id && (
                    <div className="mt-3 pt-3 border-t border-[#252525] space-y-2">
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-[#4F6EF7]/20 border border-[#4F6EF7]/30 rounded-xl text-[#4F6EF7] text-xs font-semibold">
                          📨 Enviar mensagem
                        </button>
                        <button className="flex-1 py-2 bg-red-500/10 border border-red-800/30 rounded-xl text-red-400 text-xs font-semibold">
                          📞 Contatar família
                        </button>
                      </div>
                      <p className="text-[#444] text-[10px]">
                        Intervenção recomendada: {s.risk === 'alto' ? 'Urgente — contato imediato com responsáveis.' : s.risk === 'médio' ? 'Monitorar e enviar notificação.' : 'Sem ação necessária.'}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ════════════════ ALERTAS ════════════════ */}
        {tab === 'alertas' && (
          <>
            <p className="text-[#555] text-xs">
              {alerts.length} alertas ativos — {alerts.filter(a => a.type === 'danger').length} críticos
            </p>
            <div className="space-y-3">
              {alerts.map(a => <AlertBanner key={a.id} alert={a} />)}
            </div>

            {/* Action button */}
            <button className="w-full mt-2 py-3 bg-[#1a1a1a] border border-[#252525] rounded-2xl text-[#4F6EF7] text-sm font-semibold hover:bg-[#1e1e1e] transition">
              📤 Exportar relatório de evasão
            </button>
          </>
        )}

      </div>
    </div>
  );
}
