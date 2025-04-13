import express from "express";
import ObjetivoController from "../../controllers/objetivoController.js";
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
router.get("/", ObjetivoController.getAll);

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
router.post("/", ObjetivoController.createObjetivo);

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
router.get("/status/:status", ObjetivoController.getByStatus);

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
router.get("/:id", ObjetivoController.getById);



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
router.put("/:id", ObjetivoController.updateObjetivo);


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
router.delete("/:id", ObjetivoController.deleteObjetivo);


export default router;
