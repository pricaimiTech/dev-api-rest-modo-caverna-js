import express from "express";
import fs from "fs";

const router = express.Router();
const pilares = JSON.parse(fs.readFileSync("./mocks/mockPilar.json", "utf8"));


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
router.get("/", (req, res) => {
    res.status(200).json(pilares);
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
router.get("/:id", (req, res) => {

    let pilar = pilares.find(pilar => pilar.id === parseInt(req.params.id));
    if (!pilar) {
        return res.status(404).json({ message: "Pilar não encontrada" });
    }
    res.status(200).json(pilar);
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
router.get("/objetivo/:nome", (req, res) => {
    const nomeObjetivo = req.params.nome.toLowerCase();

    const pilarePorObjetivo = pilares.filter(pilar =>
        pilar.objetivo.title.toLowerCase() === nomeObjetivo
    );

    if (pilarePorObjetivo.length === 0) {
        return res.status(404).json({ message: "Nenhuma pilar encontrada para esse objetivo" });
    }

    res.status(200).json(pilarePorObjetivo);
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
router.get("/objetivo/id/:id", (req, res) => {
    const idObjetivo = parseInt(req.params.id);

    const objetivoPorPilar = pilares.filter(
        pilar => pilar.objetivo.id === idObjetivo
    );

    if (objetivoPorPilar.length === 0) {
        return res.status(404).json({ message: "Nenhuma pilar encontrado para esse objetivo" });
    }

    res.status(200).json(objetivoPorPilar);
});

export default router;
