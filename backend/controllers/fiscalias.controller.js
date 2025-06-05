const { getPool, sql } = require('../models/db');

const getFiscalias = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().execute('SP_OBTENER_TODAS_LAS_FISCALIAS');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEstadosFiscalias = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().execute('SP_OBTENER_TODOS_LOS_ESTADOS_CASO');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getFiscalias,getEstadosFiscalias};
