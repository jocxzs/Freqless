export default function Avatar({ src, name, size = 'md' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-11 h-11 text-sm', lg: 'w-14 h-14 text-base' };
  const initials = name ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : '?';

  return (
    <div className={`${sizes[size]} rounded-full bg-[var(--field-bg)] border border-[var(--field-border)] flex items-center justify-center text-white/80 font-semibold flex-shrink-0 overflow-hidden`}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
    </div>
  );
}
