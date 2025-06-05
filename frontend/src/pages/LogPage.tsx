import { useEffect, useState } from 'react';
import { fetchLogs, eliminarLog } from '../api/logs';
import type { Log } from '../api/logs';

export default function LogPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const cargarLogs = () => {
    fetchLogs()
      .then(data => {
        setLogs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarLogs();
  }, []);

  const handleEliminar = async (id_log: number) => {
    setMessage(null);
    try {
      const msg = await eliminarLog(id_log);
      setMessage(msg);
      cargarLogs();
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  // Auto-dismiss para message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) return <p className="text-center mt-5 text-muted">Cargando logs...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-primary">Logs de Reasignación</h1>

      {message && (
        <div className="alert alert-info alert-dismissible fade show mt-3 text-center" role="alert">
          {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>ID LOG</th>
              <th>ID CASO</th>
              <th>FISCAL ACTUAL</th>
              <th>FISCAL PROPUESTO</th>
              <th>FECHA</th>
              <th>OBSERVACIÓN</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.ID_LOG}>
                <td>{log.ID_LOG}</td>
                <td>{log.ID_CASO}</td>
                <td>{log.ID_FISCAL_ACTUAL}</td>
                <td>{log.ID_FISCAL_PROPUESTO}</td>
                <td>{new Date(log.FECHA_INTENTO).toLocaleString()}</td>
                <td>{log.OBSERVACION}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(log.ID_LOG)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted">No hay registros en el log</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
