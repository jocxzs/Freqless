export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95';

  const variants = {
    primary: 'bg-white text-black hover:bg-gray-200',
    google: 'bg-transparent border border-[var(--field-border)] text-white flex items-center justify-center gap-2 hover:bg-white/5',
    ghost: 'bg-transparent text-white hover:underline',
    danger: 'bg-white/90 text-black hover:opacity-90',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
