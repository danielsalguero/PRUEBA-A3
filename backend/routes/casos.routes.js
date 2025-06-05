const express = require('express');
const router = express.Router();
const { getCasos,getCasosFiscalia, asignarFiscalACaso, getLogAsignaciones, cambiarEstadoCaso,eliminarLog } = require('../controllers/casos.controller');

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Obtener todos los casos
 *     responses:
 *       200:
 *         description: Lista de casos
 */
router.get('/casos', getCasos);

/**
 * @swagger
 * /casos/fiscalia/{id_fiscalia}:
 *   get:
 *     summary: Obtener casos por fiscalía
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
router.get('/casos/fiscalia/:id_fiscalia', getCasosFiscalia);

/**
 * @swagger
 * /casos/asignar-fiscal:
 *   post:
 *     summary: Asignar un fiscal a un caso
 *     description: Asigna un fiscal a un caso, validando que pertenezca a la misma fiscalía. Si no pertenece, se registra en TT_LOG.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_caso:
 *                 type: integer
 *                 example: 5
 *               id_fiscal_nuevo:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Fiscal asignado correctamente al caso.
 *       400:
 *         description: Error al asignar el fiscal (por ejemplo, fiscal de fiscalía diferente).
 */

router.post('/casos/asignar-fiscal', asignarFiscalACaso);

/**
 * @swagger
 * /logsAsignaciones:
 *   get:
 *     summary: Obtener el log de intentos de asignación de fiscales
 *     description: Devuelve el historial de intentos fallidos o exitosos de asignación de fiscales (registrados en TT_LOG).
 *     responses:
 *       200:
 *         description: Lista de registros en TT_LOG
 */
router.get('/casos/logsAsignaciones', getLogAsignaciones);

/**
 * @swagger
 * /casos/cambiar-estado:
 *   post:
 *     summary: Cambiar el estado de un caso
 *     description: Cambia el estado de un caso a un nuevo estado válido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_caso:
 *                 type: integer
 *                 example: 5
 *               id_estado_nuevo:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Estado del caso actualizado correctamente.
 *       400:
 *         description: Error al cambiar el estado del caso.
 */
router.post('/casos/cambiar-estado', cambiarEstadoCaso);

// Nueva ruta para eliminar log
/**
 * @swagger
 * /casos/eliminarLog:
 *   post:
 *     summary: Eliminar un registro del log
 *     description: Elimina un registro de TT_LOG por su ID_LOG.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_log:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Registro de log eliminado correctamente.
 *       400:
 *         description: Error al eliminar el registro de log.
 */
router.post('/casos/eliminarLog', eliminarLog);

module.exports = router;
