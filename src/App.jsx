import { Route, Routes } from 'react-router-dom';
import AuthProvider from './common/AuthProvider';
import Navbar from './common/Navbar/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import ConfirmationEmail from './pages/ConfirmationEmail';
import VerifiedEmail from './pages/VerifiedEmail';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';

// TODO Sumar una ruta 'change-password' desde la cual se puede postear un cambio de pass
function App() {
  return (
    <AuthProvider>
      <Navbar id="navbar" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-created" element={<ConfirmationEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/verified" element={<VerifiedEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
