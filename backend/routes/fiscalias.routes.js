const express = require('express');
const router = express.Router();
const { getFiscalias,getEstadosFiscalias } = require('../controllers/fiscalias.controller');

/**
 * @swagger
 * /fiscalias:
 *   get:
 *     summary: Obtener todas las fiscalías
 *     responses:
 *       200:
 *         description: Lista de fiscalías
 */
router.get('/fiscalias', getFiscalias);

/**
 * @swagger
 * /EstadosFiscalias:
 *   get:
 *     summary: Obtener todos los estados de caso
 *     responses:
 *       200:
 *         description: Lista de estados
 */
router.get('/EstadosFiscalias', getEstadosFiscalias);

module.exports = router;
