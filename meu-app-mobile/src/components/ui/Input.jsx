import { useState } from 'react';

export default function Input({ label, type = 'text', placeholder, value, onChange, className = '' }) {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs text-white/60 font-semibold uppercase tracking-[0.2em]">{label}</label>}
      <div className="relative rounded-[24px] border border-[var(--field-border)] bg-[var(--field-bg)] shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-all focus-within:border-white/20 focus-within:bg-[rgba(255,255,255,0.03)]">
        <input
          type={isPassword && showPass ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-white text-sm rounded-[24px] px-4 py-4 outline-none focus:outline-none placeholder-[var(--placeholder)]"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            {showPass ? '🙈' : '👁'}
          </button>
        )}
      </div>
    </div>
  );
}
