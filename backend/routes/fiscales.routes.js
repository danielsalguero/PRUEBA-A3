const express = require('express');
const router = express.Router();
const { getFiscales, getFiscalesFiscalia} = require('../controllers/fiscales.controller');

/**
 * @swagger
 * /fiscales:
 *   get:
 *     summary: Obtener todos los fiscales
 *     responses:
 *       200:
 *         description: Lista de fiscales
 */
router.get('/fiscales', getFiscales);

/**
 * @swagger
 * /fiscales/fiscalia/{id_fiscalia}:
 *   get:
 *     summary: Obtener fiscales por fiscalía
 *     parameters:
 *       - in: path
 *         name: id_fiscalia
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fiscalía
 *     responses:
 *       200:
 *         description: Lista de fiscales
 */
router.get('/fiscales/fiscalia/:id_fiscalia', getFiscalesFiscalia);

module.exports = router;
