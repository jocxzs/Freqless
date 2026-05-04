export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95';

  const variants = {
    primary: 'bg-[#4F6EF7] hover:bg-[#3d5ce0] text-white',
    google: 'bg-transparent border border-[#333] text-white flex items-center justify-center gap-2 hover:bg-[#1e1e1e]',
    ghost: 'bg-transparent text-[#4F6EF7] hover:underline',
    danger: 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-90',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
