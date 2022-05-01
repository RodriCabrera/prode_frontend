import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './common/AuthProvider';
import Navbar from './common/Navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/LoginPage/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

// const RouterContainer = styled.div`
//   width: 100%;
// `;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar id="navbar" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
