import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-white font-black text-2xl tracking-tight">FreqlesS</h1>
        <button className="text-[#aaa] text-xl">⚙</button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-white font-bold text-2xl mb-8">Create an account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="balamia@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-xs text-[#aaa] font-medium">Password</label>
              <button type="button" className="text-xs text-[#4F6EF7] hover:underline">Forgot ?</button>
            </div>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" className="mt-2">
            Create account
          </Button>

          <Button
            type="button"
            variant="google"
            onClick={() => {}}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>
        </form>

        <p className="text-[#555] text-sm text-center mt-6">
          Already Have An Account?{' '}
          <button onClick={() => navigate('/login')} className="text-[#4F6EF7] font-semibold hover:underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
