
const { getPool,sql } = require('../models/db');

const login = async (req, res) => {
  const { usuario, password } = req.body;

  try{

  const pool = await getPool();
  const result = await pool.request()
  .input('USUARIO', usuario)
  .input('PASSWORD',password)
  .execute('SP_LOGIN_FISCAL');

const user = result.recordset[0];

if (user) {
  res.json({
    success: true,
    fiscal: {
      ID_FISCAL: user.ID_FISCAL,
      NOMBRE: user.NOMBRE,
      APELLIDO: user.APELLIDO,
      ID_ROL: user.ID_ROL,
      NOMBRE_ROL: user.NOMBRE_ROL
    }
  });
} else {
  res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
}

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

module.exports = { login };
