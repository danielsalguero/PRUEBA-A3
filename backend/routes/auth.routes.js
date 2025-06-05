const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de fiscal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login correcto
 *       401:
 *         description: Usuario o contraseña incorrectos
 */
router.post('/login', login);

module.exports = router;
