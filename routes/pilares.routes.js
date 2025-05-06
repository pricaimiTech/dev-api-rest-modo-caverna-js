const express = require("express");
const PilarController = require("../controllers/pilarController.js");
const router = express.Router();


/**
 * @swagger
 * /pilares:
 *   get:
 *     summary: Lista todos os pilares
 *     tags: [Pilares]
 *     responses:
 *       200:
 *         description: Lista de pilares
 */
router.get("/", PilarController.getAll);


/**
 * @swagger
 * /pilares/{id}:
 *   get:
 *     summary: Retorna um pilar específico
 *     tags: [Pilares]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pilar
 *     responses:
 *       200:
 *         description: Pilar encontrado
 *       404:
 *         description: Pilar não encontrado
 */
router.get("/:id", PilarController.getById);


/**
 * @swagger
 * /pilares/{id}:
 *   patch:
 *     summary: Atualiza um pilar específico
 *     tags: [Pilares]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pilar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categorias:
 *                 type: array
 *                 items:
 *                   type: string
 */
router.patch("/:id/categorias", PilarController.patchCategorias);


module.exports = router;