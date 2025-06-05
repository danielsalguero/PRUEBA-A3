import { useEffect, useState } from 'react';
import { fetchCasos } from '../api/casos';
import { fetchFiscalias } from '../api/fiscalias';
import { fetchFiscalesByFiscalia } from '../api/fiscales';
import { fetchEstados } from '../api/estados';
import { asignarFiscalACaso } from '../api/asignarFiscal';
import { actualizarEstadoCaso } from '../api/actualizarEstado';
import { parseDateString } from '../utils/dateUtils';

import type { Caso } from '../api/casos';
import type { Fiscalia } from '../api/fiscalias';
import type { Fiscal } from '../api/fiscales';
import type { Estado } from '../api/estados';

export default function CasosPage() {
  const [casos, setCasos] = useState<Caso[]>([]);
  const [fiscalias, setFiscalias] = useState<Fiscalia[]>([]);
  const [fiscales, setFiscales] = useState<Fiscal[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);

  const [selectedFiscalia, setSelectedFiscalia] = useState<number | ''>('');
  const [selectedFiscal, setSelectedFiscal] = useState<number | ''>('');
  const [selectedCaso, setSelectedCaso] = useState<number | ''>('');

  const [selectedCasoEstado, setSelectedCasoEstado] = useState<number | ''>('');
  const [selectedEstado, setSelectedEstado] = useState<number | ''>('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [assignMessage, setAssignMessage] = useState<string | null>(null);
  const [estadoMessage, setEstadoMessage] = useState<string | null>(null);

  const cargarCasos = () => {
    fetchCasos()
      .then(data => {
        setCasos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFiscalias()
      .then(data => setFiscalias(data))
      .catch(err => console.error(err));

    fetchEstados()
      .then(data => setEstados(data))
      .catch(err => console.error(err));

    cargarCasos();
  }, []);

  useEffect(() => {
    if (selectedFiscalia !== '') {
      fetchFiscalesByFiscalia(selectedFiscalia)
        .then(data => setFiscales(data))
        .catch(err => console.error(err));
    } else {
      setFiscales([]);
    }
  }, [selectedFiscalia]);

  const handleAssign = async () => {
    setAssignMessage(null);
    if (selectedFiscal === '' || selectedCaso === '') {
      setAssignMessage('Debe seleccionar un fiscal y un caso');
      return;
    }

    try {
      const msg = await asignarFiscalACaso(selectedCaso, selectedFiscal);
      setAssignMessage(msg);
      cargarCasos();
    } catch (err: any) {
      setAssignMessage(err.message);
    }
  };

  const handleActualizarEstado = async () => {
    setEstadoMessage(null);
    if (selectedCasoEstado === '' || selectedEstado === '') {
      setEstadoMessage('Debe seleccionar un caso y un estado');
      return;
    }

    try {
      const msg = await actualizarEstadoCaso(selectedCasoEstado, selectedEstado);
      setEstadoMessage(msg);
      cargarCasos();
    } catch (err: any) {
      setEstadoMessage(err.message);
    }
  };

  useEffect(() => {
    if (assignMessage) {
      const timer = setTimeout(() => {
        setAssignMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [assignMessage]);

  useEffect(() => {
    if (estadoMessage) {
      const timer = setTimeout(() => {
        setEstadoMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [estadoMessage]);

  if (loading) return <p className="text-center mt-5 text-muted">Cargando casos...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-primary">Listado de Casos</h1>

      {/* Card asignar fiscal */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">Asignar Fiscal a Caso</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Fiscalía</label>
            <select
              className="form-select"
              value={selectedFiscalia}
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value) : '';
                setSelectedFiscalia(value);
                setSelectedFiscal('');
              }}
            >
              <option value="">Seleccione Fiscalía</option>
              {fiscalias.map(f => (
                <option key={f.ID_FISCALIA} value={f.ID_FISCALIA}>
                  {f.NOMBRE}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Fiscal</label>
            <select
              className="form-select"
              value={selectedFiscal}
              onChange={(e) => setSelectedFiscal(e.target.value ? parseInt(e.target.value) : '')}
              disabled={fiscales.length === 0}
            >
              <option value="">Seleccione Fiscal</option>
              {fiscales.map(f => (
                <option key={f.ID_FISCAL} value={f.ID_FISCAL}>
                  {f.NOMBRE} {f.APELLIDO}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Caso</label>
            <select
              className="form-select"
              value={selectedCaso}
              onChange={(e) => setSelectedCaso(e.target.value ? parseInt(e.target.value) : '')}
            >
              <option value="">Seleccione Caso</option>
              {casos.map(c => (
                <option key={c.ID_CASO} value={c.ID_CASO}>
                  {c.CORRELATIVO} - {c.NOMBRE_ESTADO}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 text-end">
          <button className="btn btn-success" onClick={handleAssign}>
            Asignar Fiscal al Caso
          </button>
        </div>

        {assignMessage && (
          <div className="alert alert-info alert-dismissible fade show mt-3 text-center" role="alert">
            {assignMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setAssignMessage(null)}
            ></button>
          </div>
        )}
      </div>

      {/* Card actualizar estado */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">Actualizar Estado de Caso</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Caso</label>
            <select
              className="form-select"
              value={selectedCasoEstado}
              onChange={(e) => setSelectedCasoEstado(e.target.value ? parseInt(e.target.value) : '')}
            >
              <option value="">Seleccione Caso</option>
              {casos.map(c => (
                <option key={c.ID_CASO} value={c.ID_CASO}>
                  {c.CORRELATIVO} - {c.NOMBRE_ESTADO}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Estado</label>
            <select
              className="form-select"
              value={selectedEstado}
              onChange={(e) => setSelectedEstado(e.target.value ? parseInt(e.target.value) : '')}
            >
              <option value="">Seleccione Estado</option>
              {estados.map(est => (
                <option key={est.ID_ESTADO} value={est.ID_ESTADO}>
                  {est.NOMBRE_ESTADO}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 text-end">
          <button className="btn btn-warning" onClick={handleActualizarEstado}>
            Actualizar Estado
          </button>
        </div>

        {estadoMessage && (
          <div className="alert alert-info alert-dismissible fade show mt-3 text-center" role="alert">
            {estadoMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setEstadoMessage(null)}
            ></button>
          </div>
        )}
      </div>

      {/* Tabla de casos */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Correlativo</th>
              <th>Fecha Inicio</th>
              <th>Fiscalía</th>
              <th>Fiscal</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {casos.map(caso => {
              const fecha = parseDateString(caso.FECHA_INICIO);
              return (
                <tr key={caso.ID_CASO}>
                  <td>{caso.ID_CASO}</td>
                  <td>{caso.CORRELATIVO}</td>
                  <td>{fecha ? fecha.toLocaleDateString() : 'Fecha inválida'}</td>
                  <td>{caso.NOMBRE_FISCALIA}</td>
                  <td>{caso.NOMBRE_FISCAL}</td>
                  <td>{caso.NOMBRE_ESTADO}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
