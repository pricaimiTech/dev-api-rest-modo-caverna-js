import express from "express";
import Categoria from "../../models/Categoria.js";
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
router.get("/", async(req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar categorias", error });
    }
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
router.post("/", async (req, res) => {
    try {
      const novaCategoria = await Categoria.create(req.body);
      res.status(201).json(novaCategoria);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar categoria", error });
    }
  });

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
router.get("/:id", async(req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) return res.status(404).json({ message: "Categoria não encontrado" });
        res.status(200).json(categoria);
      } catch (error) {
        res.status(500).json({ message: "Erro a buscar categoria", error });
      }
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
router.get("/pilar/nome/:nome", async (req, res) => {
    try {
        const nome = req.params.nome.toLowerCase().toString();
        const categorias = await Categoria.find({ 'pilar.title': nome });  // busca todos os objetivos com o status informado
    
        if (!categorias || categorias.length === 0) {
          return res.status(404).json({ message: "Nenhum pilar encontrado com esse nome" });
        }
    
        res.status(200).json(categorias);
      } catch (error) {
        res.status(500).json({
          message: "Erro ao buscar Pilar pelo nome",
          error: error.message,
        });
      }
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
router.get("/pilar/id/:id", async (req, res) => {
    try {
        const pilarID = req.params.id;
        const categorias = await Categoria.find({ "pilar.id": pilarID }); // busca pilares que tenha o id do objetivo vinculado
    
        if (!categorias || categorias.length === 0) {
          return res.status(404).json({ message: "Nenhum pilar encontrado com esse status" });
        }
    
        res.status(200).json(categorias);
      } catch (error) {
        res.status(500).json({
          message: "Erro ao buscar pilar pelo status",
          error: error.message,
        });
      }
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
router.put("/:id", async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!categoria) return res.status(404).json({ message: "Categoria não encontrado" });
        res.status(200).json(categoria);
      } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar categoria", error });
      }
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
router.delete("/:id", async(req, res) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(req.params.id);
        if (!categoria) return res.status(404).json({ message: "Categoria não encontrado" });
        res.status(200).json({ message: "Categoria deletado com sucesso" });
      } catch (error) {
        res.status(500).json({ message: "Erro ao deletar categoria", error });
      }
});



export default router;
