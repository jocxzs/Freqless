import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/[0.04] border border-white/[0.08] rounded-[32px] px-8 py-10 shadow-[0_40px_90px_rgba(0,0,0,0.55)] backdrop-blur-[18px]">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-white font-black text-4xl tracking-tight">FreqlesS</h1>
          <button className="text-white/70 text-xl bg-transparent border-none">⚙</button>
        </div>

        {/* Intro */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-2xl mb-1">Login to your account</h2>
          <p className="text-white/65 text-sm">Enter your credentials to access your dashboard.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-white/65 text-[0.72rem] font-semibold uppercase tracking-[0.18em]">Email</label>
            <Input
              type="email"
              placeholder="balamia@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-white/65 text-[0.72rem] font-semibold uppercase tracking-[0.18em]">Password</label>
              <button type="button" className="text-white/65 text-xs bg-transparent border-none cursor-pointer hover:text-white transition-colors">
                Forgot ?
              </button>
            </div>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="mt-1 !rounded-[28px] !py-4 !text-base tracking-wide shadow-[0_18px_50px_rgba(255,255,255,0.14)] hover:-translate-y-px"
          >
            Login now
          </Button>
        </form>

        {/* Footer */}
        <p className="text-white/65 text-sm text-center mt-7">
          Don't Have An Account?{' '}
          <button
            onClick={() => navigate('/criar-conta')}
            className="text-white font-semibold bg-transparent border-none cursor-pointer hover:underline"
          >
            Sign Up
          </button>
        </p>

        <button
          onClick={() => navigate('/admin')}
          className="w-full text-white/45 text-xs text-center mt-5 bg-transparent border-none cursor-pointer hover:text-white/70 transition-colors"
        >
          Acesso Administrador →
        </button>
      </div>
    </div>
  );
}
