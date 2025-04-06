import express from "express";
import fs from "fs";

const router = express.Router();
const atividades = JSON.parse(fs.readFileSync("./mocks/mockAtividade.json", "utf8"));


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
router.get("/", (req, res) => {
    res.status(200).json(atividades);
});

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
router.post("/", (req, res)=>{
    atividades.push(req.body);
    res.status(201).json(req.body);
})

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
router.get("/:id", (req, res) => {

    let atividade = atividades.find(atividade => atividade.id === parseInt(req.params.id));
    if (!atividade) {
        return res.status(404).json({ message: "Atividade não encontrada" });
    }
    res.status(200).json(atividade);
});

/**
 * @swagger
 * /atividades/diarias:
 *   get:
 *     summary: Lista atividades diárias, filtrando por concluídas ou não
 *     tags: [Atividades]
 *     parameters:
 *       - in: query
 *         name: concluidas
 *         required: false
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filtrar por atividades concluídas ou não
 *     responses:
 *       200:
 *         description: Lista de tarefas diárias
 */
router.get("/diarias", (req, res) => {
    const { concluidas } = req.query;

    let tarefasDiarias = atividades.filter(atividade => atividade.isDiaria);

    if (concluidas === "true") {
        tarefasDiarias = tarefasDiarias.filter(atividade => atividade.isConclued);
    } else if (concluidas === "false") {
        tarefasDiarias = tarefasDiarias.filter(atividade => !atividade.isConclued);
    }

    res.status(200).json(tarefasDiarias);
});

/**
 * @swagger
 * /atividades/categoria/{nome}:
 *   get:
 *     summary: Lista atividades por nome da categoria
 *     tags: [Atividades]
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
router.get("/categoria/:nome", (req, res) => {
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
 * /atividades/categoria/id/{id}:
 *   get:
 *     summary: Lista atividades por ID da categoria
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Lista de atividades
 *       404:
 *         description: Nenhuma atividade encontrada
 */
router.get("/categoria/id/:id", (req, res) => {
    const idCategoria = parseInt(req.params.id);

    const atividadesPorCategoria = atividades.filter(
        atividade => atividade.categoria.id === idCategoria
    );

    if (atividadesPorCategoria.length === 0) {
        return res.status(404).json({ message: "Nenhuma atividade encontrada para essa categoria" });
    }

    res.status(200).json(atividadesPorCategoria);
});



export default router;
