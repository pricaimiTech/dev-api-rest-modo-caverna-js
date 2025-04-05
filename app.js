import express from "express";
import fs from "fs";

const objetivos = JSON.parse(fs.readFileSync("./mocks/mockObjetivo.json", "utf8"));
const pilares = JSON.parse(fs.readFileSync("./mocks/mockPilar.json", "utf8"));
const categorias = JSON.parse(fs.readFileSync("./mocks/mockCategoria.json", "utf8"));
const atividades = JSON.parse(fs.readFileSync("./mocks/mockAtividade.json", "utf8"));



const app = express();
app.use(express.json());

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna mensagem inicial da API
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas
 */
app.get("/", (req, res) => {
    res.status(200).send("Hello World Modo Caverna!");
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
app.get("/objetivos/status/:status", (req, res) => {
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
app.get("/objetivos/:id", (req, res) => {

    let objetivo = objetivos.find(objetivo => objetivo.id === parseInt(req.params.id));
    if (!objetivo) {
        return res.status(404).json({ message: "Objetivo não encontrada" });
    }
    res.status(200).json(objetivo);
});

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
app.get("/pilares", (req, res) => {
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
app.get("/pilares/:id", (req, res) => {

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
app.get("/pilares/objetivo/:nome", (req, res) => {
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
app.get("/pilares/objetivo/id/:id", (req, res) => {
    const idObjetivo = parseInt(req.params.id);

    const objetivoPorPilar = pilares.filter(
        pilar => pilar.objetivo.id === idObjetivo
    );

    if (objetivoPorPilar.length === 0) {
        return res.status(404).json({ message: "Nenhuma pilar encontrado para esse objetivo" });
    }

    res.status(200).json(objetivoPorPilar);
});

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
app.get("/categorias", (req, res) => {
    res.status(200).json(categorias);
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
app.get("/categorias/:id", (req, res) => {

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
app.get("/categorias/pilar/:nome", (req, res) => {
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
app.get("/categorias/pilar/id/:id", (req, res) => {
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
 * /atividade:
 *   get:
 *     summary: Lista todas as atividades
 *     tags: [Atividades]
 *     responses:
 *       200:
 *         description: Lista de atividades
 */
app.get("/atividade", (req, res) => {
    res.status(200).json(atividades);
});

/**
 * @swagger
 * /atividade/{id}:
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
app.get("/atividade/:id", (req, res) => {

    let atividade = atividades.find(atividade => atividade.id === parseInt(req.params.id));
    if (!atividade) {
        return res.status(404).json({ message: "Atividade não encontrada" });
    }
    res.status(200).json(atividade);
});

/**
 * @swagger
 * /atividade/diarias:
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
app.get("/atividade/diarias", (req, res) => {
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
 * /atividade/categoria/{nome}:
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
app.get("/atividade/categoria/:nome", (req, res) => {
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
 * /atividade/categoria/id/{id}:
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
app.get("/atividade/categoria/id/:id", (req, res) => {
    const idCategoria = parseInt(req.params.id);

    const atividadesPorCategoria = atividades.filter(
        atividade => atividade.categoria.id === idCategoria
    );

    if (atividadesPorCategoria.length === 0) {
        return res.status(404).json({ message: "Nenhuma atividade encontrada para essa categoria" });
    }

    res.status(200).json(atividadesPorCategoria);
});



export default app;
