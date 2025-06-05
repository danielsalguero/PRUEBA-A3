import { useEffect, useState } from 'react';
import { fetchFiscalias } from '../api/fiscalias';
import { fetchFiscalesByFiscalia } from '../api/fiscales';
import type { Fiscalia } from '../api/fiscalias';
import type { Fiscal } from '../api/fiscales';

export default function FiscalesPage() {
  const [fiscalias, setFiscalias] = useState<Fiscalia[]>([]);
  const [fiscales, setFiscales] = useState<Fiscal[]>([]);
  const [selectedFiscalia, setSelectedFiscalia] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFiscalias()
      .then(data => setFiscalias(data))
      .catch(err => console.error(err));
  }, []);

  const handleFiscaliaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : '';
    setSelectedFiscalia(value);

    if (value !== '') {
      setLoading(true);
      fetchFiscalesByFiscalia(value)
        .then(data => {
          setFiscales(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setFiscales([]);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-primary">Listado de Fiscales por Fiscalía</h1>

      <div className="mb-4">
        <label className="form-label">Fiscalía</label>
        <select
          className="form-select"
          value={selectedFiscalia}
          onChange={handleFiscaliaChange}
        >
          <option value="">Seleccione Fiscalía</option>
          {fiscalias.map(f => (
            <option key={f.ID_FISCALIA} value={f.ID_FISCALIA}>
              {f.NOMBRE}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center text-muted">Cargando fiscales...</p>}

      {error && (
        <p className="text-center text-danger">Error: {error}</p>
      )}

      {fiscales.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>Nombre</th>
                <th>CUI</th>
                <th>Email</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {fiscales.map(f => (
                <tr key={f.ID_FISCAL}>
                  <td>{f.NOMBRE} {f.APELLIDO}</td>
                  <td>{f.CUI}</td>
                  <td>{f.EMAIL || 'No definido'}</td>
                  <td>{f.TELEFONO || 'No definido'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {fiscales.length === 0 && selectedFiscalia !== '' && !loading && (
        <p className="text-center text-muted">No hay fiscales en esta fiscalía.</p>
      )}
    </div>
  );
}
