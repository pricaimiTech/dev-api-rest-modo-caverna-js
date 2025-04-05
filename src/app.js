import express from "express";

const app = express();
app.use(express.json()); 


app.get("/", (req, res) => {
    res.status(200).send("Hello World Modo Caverna!");
});

app.get("/objetivo", (req, res) => {
    res.status(200).send("Hello World Objetivo - Modo Caverna!");
});

app.get("/pilar", (req, res) => {
    res.status(200).send("Hello World Pilar - Modo Caverna!");
});

app.get("/categoria", (req, res) => {
    res.status(200).send("Hello World Categorias - Modo Caverna!");
});

app.get("/atividade", (req, res) => {
    res.status(200).send("Hello World Atividade - Modo Caverna!");
});

export default app