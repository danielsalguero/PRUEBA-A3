const { getPool, sql } = require('../models/db');

const getLogs = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
        SELECT 
          *
        FROM TT_LOG;
      `);   res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getLogs };
