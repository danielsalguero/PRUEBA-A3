const { getPool, sql } = require('../models/db');

const getFiscales = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().execute('SP_OBTENER_TODOS_LOS_FISCALES');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFiscalesFiscalia = async (req, res) => {
  try {
    const idFiscalia = req.params.id_fiscalia;

    const pool = await getPool();

    const result = await pool
    .request()
    .input('ID_FISCALIA', idFiscalia)
    .execute('SP_OBTENER_FISCALES_POR_FISCALIA');
      
      res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getFiscales,getFiscalesFiscalia };
