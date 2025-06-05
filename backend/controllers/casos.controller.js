const { getPool, sql } = require('../models/db');

const getCasos = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
    .request()
    .execute('SP_OBTENER_TODOS_LOS_CASOS');
       res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCasosFiscalia = async (req, res) => {
  try {
    const idFiscalia = req.params.id_fiscalia;

    const pool = await getPool();

    const result = await pool
    .request()
    .input('ID_FISCALIA', idFiscalia)
    .execute('SP_OBTENER_CASOS_POR_FISCALIA');
      
      res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const asignarFiscalACaso = async (req, res) => {
  try {
    const { id_caso, id_fiscal_nuevo } = req.body;

    const pool = await getPool();

    const result = await pool.request()
      .input('ID_CASO', id_caso)
      .input('ID_FISCAL_NUEVO', id_fiscal_nuevo)
      .execute('SP_ASIGNAR_FISCAL_A_CASO');

    res.status(200).json({ message: 'Fiscal asignado correctamente al caso.' });
  } catch (err) {
    console.error('Error al asignar fiscal:', err);
    res.status(400).json({ error: err.message });
  }
};

const getLogAsignaciones = async (req, res) => {
  try {
    const pool = await getPool();

    const result = await pool.request().execute('SP_OBTENER_LOG_ASIGNACIONES');

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error al obtener log de asignaciones:', err);
    res.status(500).json({ error: err.message });
  }
};

const cambiarEstadoCaso = async (req, res) => {
  try {
    const { id_caso, id_estado_nuevo } = req.body;

    const pool = await getPool();

    await pool.request()
      .input('ID_CASO', id_caso)
      .input('ID_ESTADO_NUEVO', id_estado_nuevo)
      .execute('SP_CAMBIAR_ESTADO_CASO');

    res.status(200).json({ message: 'Estado del caso actualizado correctamente.' });
  } catch (err) {
    console.error('Error al cambiar estado del caso:', err);
    res.status(400).json({ error: err.message });
  }
};

const eliminarLog = async (req, res) => {
  try {
    const { id_log } = req.body;

    const pool = await getPool();

    await pool.request()
      .input('ID_LOG', id_log)
      .execute('SP_ELIMINAR_LOG');

    res.status(200).json({ message: 'Registro de log eliminado correctamente.' });
  } catch (err) {
    console.error('Error al eliminar log:', err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getCasos, getCasosFiscalia, asignarFiscalACaso, getLogAsignaciones,cambiarEstadoCaso,eliminarLog };
