import express from "express";
import Objetivo from "../../models/objetivo.js";
const router = express.Router();

/**
 * @swagger
 * /objetivos:
 *   get:
 *     summary: Retorna todos os objetivos criados
 *     tags: [Objetivos]
 *     responses:
 *       200:
 *         description: Exibe uma lista de objetivos já cadastrados na base
 */
// router.get("/", (req, res) => {
//     res.status(200).json(objetivos);
// });
router.get("/", async (req, res) => {
    try {
      const objetivos = await Objetivo.find();
      res.status(200).json(objetivos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar objetivos", error });
    }
  });

/**
 * @swagger
 * /objetivos/status/{status}:
 *   get:
 *     summary: Lista objetivos por status
 *     tags: [Objetivos]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: Status do objetivo
 *     responses:
 *       200:
 *         description: Lista de objetivos com o status especificado
 *       404:
 *         description: Nenhum objetivo encontrado
 */
router.get("/status/:status", async(req, res) => {
  try {
    const status = req.params.status;
    const objetivos = await Objetivo.find({ status }); // busca todos os objetivos com o status informado

    if (!objetivos || objetivos.length === 0) {
      return res.status(404).json({ message: "Nenhum objetivo encontrado com esse status" });
    }

    res.status(200).json(objetivos);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar objetivo pelo status",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /objetivos/{id}:
 *   get:
 *     summary: Retorna um objetivo específico
 *     tags: [Objetivos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do objetivo
 *     responses:
 *       200:
 *         description: Objetivo encontrado
 *       404:
 *         description: Objetivo não encontrado
 */
// router.get("/:id", (req, res) => {
//     const index = getIndex(objetivos, req.params.id);
//     if (!objetivos[index]) {
//         return res.status(404).json({ message: "Objetivo não encontrado" });
//     }
//     res.status(200).json(objetivos[index]);
// });

router.get("/:id", async (req, res) => {
  try {
    const objetivo = await Objetivo.findById(req.params.id);
    if (!objetivo) return res.status(404).json({ message: "Objetivo não encontrado" });
    res.status(200).json(objetivo);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar objetivo", error });
  }
  });

/**
 * @swagger
 * /objetivos:
 *   post:
 *     summary: Cria um novo objetivo
 *     tags: [Objetivos]
 *     responses:
 *       201:
 *         description: Criou um novo objetivo
 */
router.post("/", async(req, res) => {
    try {
      const novoObjetivo = await Objetivo.create(req.body);
      res.status(201).json(novoObjetivo);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar objetivo", error });
    }
});

/**
 * @swagger
 * /objetivos:
 *   put:
 *     summary: Atualiza o titulo do objetivo
 *     tags: [Objetivos]
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
router.put("/:id", async(req, res) => {
    try {
      const objetivo = await Objetivo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!objetivo) return res.status(404).json({ message: "Objetivo não encontrado" });
      res.status(200).json(objetivo);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar objetivo", error });
    }
    
});


/**
 * @swagger
 * /objetivos/{id}:
 *   delete:
 *     summary: Deleta um objetivo
 *     tags: [Objetivos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do objetivo
 *     responses:
 *       200:
 *         description: Objetivo deletado com sucesso
 *       404:
 *         description: Objetivo não encontrado
 */
router.delete("/:id", async(req, res) => {
  try {
    const objetivo = await Objetivo.findByIdAndDelete(req.params.id);
    if (!objetivo) return res.status(404).json({ message: "Objetivo não encontrado" });
    res.status(200).json({ message: "Objetivo deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar objetivo", error });
  }
});


export default router;
