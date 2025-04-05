import express from "express";
import fs from "fs";

const objetivos = JSON.parse(fs.readFileSync("./mocks/mockObjetivo.json", "utf8"));
const pilares = JSON.parse(fs.readFileSync("./mocks/mockPilar.json", "utf8"));
const categorias = JSON.parse(fs.readFileSync("./mocks/mockCategoria.json", "utf8"));
const atividades = JSON.parse(fs.readFileSync("./mocks/mockAtividade.json", "utf8"));



const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello World Modo Caverna!");
});

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

app.get("/objetivos/:id", (req, res) => {

    let objetivo = objetivos.find(objetivo => objetivo.id === parseInt(req.params.id));
    if (!objetivo) {
        return res.status(404).json({ message: "Objetivo não encontrada" });
    }
    res.status(200).json(objetivo);
});

app.get("/pilares", (req, res) => {
    res.status(200).json(pilares);
});

app.get("/pilares/:id", (req, res) => {

    let pilar = pilares.find(pilar => pilar.id === parseInt(req.params.id));
    if (!pilar) {
        return res.status(404).json({ message: "Pilar não encontrada" });
    }
    res.status(200).json(pilar);
});

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

// categorias 

app.get("/categorias", (req, res) => {
    res.status(200).json(categorias);
});

app.get("/categorias/:id", (req, res) => {

    let categoria = categorias.find(categoria => categoria.id === parseInt(req.params.id));
    if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.status(200).json(categoria);
});

//exibir atividades por categoria
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

// Atividades

app.get("/atividade", (req, res) => {
    res.status(200).json(atividades);
});

// pensando em visualizar e edição
app.get("/atividade/:id", (req, res) => {

    let atividade = atividades.find(atividade => atividade.id === parseInt(req.params.id));
    if (!atividade) {
        return res.status(404).json({ message: "Atividade não encontrada" });
    }
    res.status(200).json(atividade);
});

//exibir nas tarefas diarias
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

//exibir atividades por categoria
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
