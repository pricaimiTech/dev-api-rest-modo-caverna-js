const express = require("express");
const CategoriaController = require("../controllers/categoriaController.js");
const router = express.Router();

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
router.get("/", CategoriaController.getAll);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     responses:
 *       201:
 *         description: Criou uma nova categoria
 */
router.post("/", CategoriaController.createCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Retorna uma categoria específica
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *       404:
 *         description: Categoria não encontrada
 */
router.get("/:id", CategoriaController.getById);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza o titulo de uma categoria
 *     tags: [Categorias]
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
 *         description: Objetivo encontrado
 *       404:
 *         description: Objetivo não encontrado
 */
router.put("/:id", CategoriaController.updateCategoria);


/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     tags: [Categorias]
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
router.delete("/:id", CategoriaController.deleteCategoria);



module.exports = router;