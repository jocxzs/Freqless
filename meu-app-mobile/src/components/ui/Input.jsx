import { useState } from 'react';

export default function Input({ label, type = 'text', placeholder, value, onChange, className = '' }) {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs text-[#aaa] font-medium">{label}</label>}
      <div className="relative">
        <input
          type={isPassword && showPass ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-[#1e1e1e] border border-[#333] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#4F6EF7] transition-colors placeholder-[#555]"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors"
          >
            {showPass ? '🙈' : '👁'}
          </button>
        )}
      </div>
    </div>
  );
}
