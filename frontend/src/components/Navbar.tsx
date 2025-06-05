import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  // Leer fiscal del localStorage
  const fiscal = JSON.parse(localStorage.getItem('fiscal') || 'null');

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('fiscal');
    // Redirigir al login
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Fiscalía App</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/casos">Casos</Link>
            </li>

            {/* Solo ADMINISTRADOR puede ver Logs */}
            {fiscal?.NOMBRE_ROL === 'ADMINISTRADOR' && (
              <li className="nav-item">
                <Link className="nav-link" to="/logs">Logs</Link>
              </li>
            )}

            {/* Solo ADMINISTRADOR puede ver Fiscales */}
            {fiscal?.NOMBRE_ROL === 'ADMINISTRADOR' && (
              <li className="nav-item">
                <Link className="nav-link" to="/fiscales">Fiscales</Link>
              </li>
            )}
          </ul>

          {/* Mostrar fiscal logueado + botón Cerrar Sesión */}
          {fiscal && (
            <div className="d-flex align-items-center">
              <span className="text-white me-3">
                {fiscal.NOMBRE} {fiscal.APELLIDO} ({fiscal.NOMBRE_ROL})
              </span>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
