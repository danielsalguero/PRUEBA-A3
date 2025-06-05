import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CasosPage from './pages/CasosPage';
import LogPage from './pages/LogPage';
import LoginPage from './pages/LoginPage';
import FiscalesPage from './pages/FiscalesPage';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();

  // Determinar si estamos en login ("/") o en otra página
  const hideNavbar = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/casos" element={<CasosPage />} />
        <Route path="/fiscales" element={<FiscalesPage />} />
        <Route path="/logs" element={<LogPage />} />
      </Routes>
    </>
  );
}

export default App;
