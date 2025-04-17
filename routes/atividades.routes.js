const express = require("express");
const AtividadeController = require("../controllers/atividadeController.js");

const router = express.Router();


/**
 * @swagger
 * /atividades:
 *   get:
 *     summary: Lista todas as atividades
 *     tags: [Atividades]
 *     responses:
 *       200:
 *         description: Lista de atividades
 */
router.get("/", AtividadeController.getAll);

/**
 * @swagger
 * /atividades:
 *   post:
 *     summary: Cria uma nova atividade
 *     tags: [Atividades]
 *     responses:
 *       201:
 *         description: Criou uma nova atividade
 */
router.post("/", AtividadeController.createAtividade);

/**
 * @swagger
 * /atividades/{id}:
 *   get:
 *     summary: Retorna uma atividade específica
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da atividade
 *     responses:
 *       200:
 *         description: Atividade encontrada
 *       404:
 *         description: Atividade não encontrada
 */
router.get("/:id", AtividadeController.getById);

/**
 * @swagger
 * /atividades/{id}:
 *   put:
 *     summary: Atualiza o titulo de uma atividade
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do objetivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Aprender Node.js
 *     responses:
 *       200:
 *         description: Atividade encontrado
 *       404:
 *         description: Atividade não encontrado
 */
router.put("/:id", AtividadeController.updateAtividade);

/**
 * @swagger
 * /atividades/{id}:
 *   delete:
 *     summary: Deleta uma atividade
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do objetivo
 *     responses:
 *       200:
 *         description: Atividade deletada com sucesso
 *       404:
 *         description: Atividade não encontrado
 */
router.delete("/:id", AtividadeController.deleteAtividade);


module.exports = router;