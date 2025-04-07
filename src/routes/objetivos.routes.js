import express from "express";
import fs from "fs";
import getIndex from "../utils/getItem.js";

const router = express.Router();

const objetivos = JSON.parse(fs.readFileSync("./mocks/mockObjetivo.json", "utf8"));

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
router.get("/", (req, res) => {
    res.status(200).json(objetivos);
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
router.get("/status/:status", (req, res) => {
    const status = req.params.status.toLowerCase();

    const objetivoPorStatus = objetivos.filter(objetivo =>
        objetivo.status.toLowerCase() === status
    );

    if (objetivoPorStatus.length === 0) {
        return res.status(404).json({ message: `Nenhuma pilar encontrada para o status ${status}` });
    }

    res.status(200).json(objetivoPorStatus);
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
router.get("/:id", (req, res) => {
    const index = getIndex(objetivos, req.params.id);
    if (!objetivos[index]) {
        return res.status(404).json({ message: "Objetivo não encontrado" });
    }
    res.status(200).json(objetivos[index]);
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
router.post("/", (req, res) => {
    objetivos.push(req.body);
    res.status(201).json(req.body);
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
router.put("/:id", (req, res) => {
    const index = getIndex(objetivos, req.params.id);
    if (!objetivos[index]) {
        return res.status(404).json({ message: "Objetivo não encontrado" });
    }
    objetivos[index].title = req.body.title;
    res.status(200).json(objetivos[index]);
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
router.delete("/:id", (req, res) => {
    const index = getIndex(objetivos, req.params.id);
    if (!objetivos[index]) {
        return res.status(404).json({ message: "Objetivo não encontrado" });
    }
    objetivos.splice(index, 1);
    res.status(200).json({message : "Objetivo deletado com sucesso"});
});


export default router;
