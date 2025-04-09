import express from "express";
import Atividade from "../../models/Atividade.js";

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
router.get("/", async (req, res) => {
    try {
        const atividades = await Atividade.find();
        res.status(200).json(atividades);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar atividades", error });
    }
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
router.post("/", async (req, res) => {
    try {
        const novaAtividade = await Atividade.create(req.body);
        res.status(201).json(novaAtividade);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar nova atividade", error });
    }
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
router.get("/:id", async (req, res) => {
    try {
        const atividade = await Atividade.findById(req.params.id);
        if (!atividade) return res.status(404).json({ message: "Atividade não encontrado" });
        res.status(200).json(atividade);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar atividade", error });
    }
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
router.get("/categoria/:nome", async (req, res) => {
    try {
        const nome = req.params.nome.toLowerCase().toString();
        const atividades = await Atividade.find({ 'categoria.title': nome });  // busca todos os objetivos com o status informado
    
        if (!atividades || atividades.length === 0) {
          return res.status(404).json({ message: "Nenhum categoria encontrado com esse nome" });
        }
    
        res.status(200).json(atividades);
      } catch (error) {
        res.status(500).json({
          message: "Erro ao buscar categoria pelo nome",
          error: error.message,
        });
      }
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
router.get("/categoria/id/:id", async (req, res) => {
    try {
        const categoriaID = req.params.id;
        const atividades = await Atividade.find({ "categoria.id": categoriaID }); // busca pilares que tenha o id do objetivo vinculado
    
        if (!atividades || atividades.length === 0) {
          return res.status(404).json({ message: "Nenhum categoria encontrado com esse id" });
        }
    
        res.status(200).json(atividades);
      } catch (error) {
        res.status(500).json({
          message: "Erro ao buscar categoria pelo id",
          error: error.message,
        });
      }
});

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
 *               title:
 *                 type: string
 *                 example: Aprender Node.js
 *     responses:
 *       200:
 *         description: Atividade encontrado
 *       404:
 *         description: Atividade não encontrado
 */
router.put("/:id", async (req, res) => {
    try {
        const atividade = await Atividade.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!atividade) return res.status(404).json({ message: "atividade não encontrado" });
        res.status(200).json(atividade);
      } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar atividade", error });
      }
});

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
router.delete("/:id", async (req, res) => {
    try {
        const atividade = await Atividade.findByIdAndDelete(req.params.id);
        if (!atividade) return res.status(404).json({ message: "atividade não encontrado" });
        res.status(200).json({ message: "atividade deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar atividade", error });
    }
});

export default router;
