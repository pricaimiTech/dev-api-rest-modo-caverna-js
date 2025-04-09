import express from "express";
import Pilar from "../../models/Pilar.js";
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
router.get("/", async(req, res) => {
    try {
        const pilares = await Pilar.find();
        res.status(200).json(pilares);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pilares", error });
        
    }
});


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
router.get("/:id", async(req, res) => {
    try {
        const pilar = await Pilar.findById(req.params.id);
        if (!pilar) return res.status(404).json({ message: "Pilar não encontrado" });
        res.status(200).json(pilar);
      } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pilar", error });
      }
    
});

/**
 * @swagger
 * /pilares/objetivo/{nome}:
 *   get:
 *     summary: Lista pilares por nome do objetivo
 *     tags: [Pilares]
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do objetivo
 *     responses:
 *       200:
 *         description: Lista de pilares encontrados
 *       404:
 *         description: Nenhum pilar encontrado
 */
router.get("/objetivo/:nome", async(req, res) => {
      try {
        const nome = req.params.nome.toLowerCase();
        const pilares = await Pilar.find({ 'objetivo.title': nome }); // busca todos os objetivos com o status informado
    
        if (!pilares || pilares.length === 0) {
          return res.status(404).json({ message: "Nenhum Pilar encontrado com esse status" });
        }
    
        res.status(200).json(pilares);
      } catch (error) {
        res.status(500).json({
          message: "Erro ao buscar pilar pelo nome",
          error: error.message,
        });
      }
});

/**
 * @swagger
 * /pilares/objetivo/id/{id}:
 *   get:
 *     summary: Lista pilares por ID do objetivo
 *     tags: [Pilares]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do objetivo
 *     responses:
 *       200:
 *         description: Lista de pilares encontrados
 *       404:
 *         description: Nenhum pilar encontrado
 */
router.get("/objetivo/id/:id", async(req, res) => {
    try {
        const objetivo = req.params.id;
        const pilares = await Pilar.find({ "objetivo.id": objetivo }); // busca pilares que tenha o id do objetivo vinculado
    
        if (!pilares || pilares.length === 0) {
          return res.status(404).json({ message: "Nenhum pilar encontrado com esse status" });
        }
    
        res.status(200).json(pilares);
      } catch (error) {
        res.status(500).json({
          message: "Erro ao buscar pilar pelo status",
          error: error.message,
        });
      }
});

export default router;
