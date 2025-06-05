import { useState } from 'react';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem('fiscal', JSON.stringify(data.fiscal));
        window.location.href = '/casos';
      } else {
        const errData = await response.json();
        setError(errData.message || 'Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="mb-4 text-center text-primary">AppFiscalias</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="form-control"
              placeholder="Ingrese su usuario"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3 text-center" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
