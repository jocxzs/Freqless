import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateAccount from './components/pages/CreateAccount';
import Login from './components/pages/Login';
import Feed from './components/pages/Feed';
import Messages from './components/pages/Messages';
import StreakAlert from './components/pages/StreakAlert';
import AdminDashboard from './components/pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#141414] flex justify-center">
        <div className="w-full max-w-[430px] relative">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/criar-conta" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/mensagens" element={<Messages />} />
            <Route path="/streak" element={<StreakAlert />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
