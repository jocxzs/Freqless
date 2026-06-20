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
    <div className="login-page min-h-screen flex items-center justify-center px-4 py-10">
      <div className="login-card w-full max-w-md">
        <div className="login-header mb-10">
          <h1 className="login-title">FreqlesS</h1>
          <button className="login-icon">⚙</button>
        </div>

        <div className="login-intro mb-8">
          <h2 className="login-heading">Login to your account</h2>
          <p className="login-description">Enter your credentials to access your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="field-label">Email</label>
            <Input
              type="email"
              placeholder="balamia@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>

          <div className="login-field">
            <div className="login-field-header">
              <label className="field-label">Password</label>
              <button type="button" className="forgot-link">Forgot ?</button>
            </div>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="login-submit"
          >
            Login now
          </Button>
        </form>

        <p className="login-footer-text">
          Don't Have An Account?{' '}
          <button onClick={() => navigate('/criar-conta')} className="signup-link">
            Sign Up
          </button>
        </p>

        <button
          onClick={() => navigate('/admin')}
          className="admin-link"
        >
          Acesso Administrador →
        </button>
      </div>
    </div>
  );
}
