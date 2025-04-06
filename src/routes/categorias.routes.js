import express from "express";
import fs from "fs";

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

    let categoria = categorias.find(categoria => categoria.id === parseInt(req.params.id));
    if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.status(200).json(categoria);
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

export default router;
