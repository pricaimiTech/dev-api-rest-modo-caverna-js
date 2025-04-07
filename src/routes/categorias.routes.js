import express from "express";
import fs from "fs";
import getIndex from "../utils/getItem.js";

const router = express.Router();
const categorias = JSON.parse(fs.readFileSync("./mocks/mockCategoria.json", "utf8"));

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
router.get("/", (req, res) => {
    res.status(200).json(categorias);
});

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
router.post("/", (req, res)=>{
    categorias.push(req.body);
    res.status(201).json(req.body);
})

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
router.get("/:id", (req, res) => {

    let index = getIndex(categorias, req.params.id);
    if (!categorias[index]) {
        return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.status(200).json(categorias[index]);
});

/**
 * @swagger
 * /categorias/pilar/{nome}:
 *   get:
 *     summary: Lista atividades por nome da categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da categoria
 *     responses:
 *       200:
 *         description: Lista de atividades
 *       404:
 *         description: Nenhuma atividade encontrada
 */
router.get("/pilar/:nome", (req, res) => {
    const nomeCategoria = req.params.nome.toLowerCase();

    const atividadesPorCategoria = atividades.filter(atividade =>
        atividade.categoria.nome_categoria.toLowerCase() === nomeCategoria
    );

    if (atividadesPorCategoria.length === 0) {
        return res.status(404).json({ message: "Nenhuma atividade encontrada para essa categoria" });
    }

    res.status(200).json(atividadesPorCategoria);
});

/**
 * @swagger
 * /categorias/pilar/id/{id}:
 *   get:
 *     summary: Lista categorias por ID do pilar
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pilar
 *     responses:
 *       200:
 *         description: Lista de categorias
 *       404:
 *         description: Nenhuma categoria encontrada
 */
router.get("/pilar/id/:id", (req, res) => {
    const idPilar = parseInt(req.params.id);

    const categoriaPorPilar = categorias.filter(
        categoria => categoria.pilar.id === idPilar
    );

    if (categoriaPorPilar.length === 0) {
        return res.status(404).json({ message: "Nenhuma categoria encontrada para esse pilar" });
    }

    res.status(200).json(categoriaPorPilar);
});


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
 *               title:
 *                 type: string
 *                 example: Aprender Node.js
 *     responses:
 *       200:
 *         description: Objetivo encontrado
 *       404:
 *         description: Objetivo não encontrado
 */
router.put("/:id", (req, res) => {
    const index = getIndex(categorias, req.params.id);
    if (!categorias[index]) {
        return res.status(404).json({ message: "Categoria não encontrado" });
    }
    categorias[index].title = req.body.title;
    res.status(200).json(categorias[index]);
});


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
router.delete("/:id", (req, res) => {
    const index = getIndex(categorias, req.params.id);
    if (!categorias[index]) {
        return res.status(404).json({ message: "Categoria não encontrado" });
    }
    categorias.splice(index, 1);
    res.status(200).json({message : "Categoria deletada com sucesso"});
});



export default router;
