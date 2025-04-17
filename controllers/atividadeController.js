const Atividade = require("../models/Atividade.models.js");
const Objetivo = require("../models/Objetivo.models.js");
const Categoria = require("../models/Categoria.models.js");
const mongoose = require('mongoose');

class AtividadeController {
    static async getAll(req, res) {
        try {
            const atividades = await Atividade.find();
            res.status(200).json(atividades);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar atividades", error });
        }
    }
    static async createAtividade(req, res) {
        mongoose.set('debug', true);        
        try {

            // 1. Verifique se a categoria existe
            const categoria = await Categoria.findById(req.body.categoriaId);
            console.log("categoria", categoria);
            if (!categoria) {
                return res.status(400).json({ message: 'Categoria não encontrada' });
            }

            // 2. Verifique se o objetivo existe
            const objetivo = await Objetivo.findById(req.body.objetivoId);
            console.log("objetivo", objetivo);
            if (!objetivo) return res.status(404).json({ message: "Objetivo não encontrado" });

            //3. no futuro validar o user também

            const atividadeBody = {
                userId: req.body.userId,
                name: req.body.name,
                descricao: req.body.descricao,
                categoriaId: categoria._id,
                status: req.body.status,
                dataExecucao: req.body.dataExecucao,
                dataConclusao: req.body.dataConclusao,
                isConcluida: req.body.isConcluida,
                objetivoId: objetivo._id,
            }

            console.log("atividadeBody", atividadeBody);
            // 4. Crie a nova atividade
            const novaAtividade = new Atividade(atividadeBody)
            const atividadeSalva = await novaAtividade.save();
            res.status(201).json(atividadeSalva);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar nova atividade", error });
        }
    }
    
    static async getById(req, res) {
        try {
            const atividade = await Atividade.findById(req.params.id);
            if (!atividade) return res.status(404).json({ message: "Atividade não encontrada" });
            res.status(200).json(atividade);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar atividade", error });
        }
    }
    static async updateAtividade(req, res) {
        try {
            const atividade = await Atividade.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!atividade) return res.status(404).json({ message: "atividade não encontrado" });
            res.status(200).json(atividade);
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar atividade", error });
        }
    }
    static async deleteAtividade(req, res) {
        try {
            const atividade = await Atividade.findByIdAndDelete(req.params.id);
            if (!atividade) return res.status(404).json({ message: "atividade não encontrado" });
            res.status(200).json({ message: "atividade deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar atividade", error });
        }
    }
}

module.exports = AtividadeController;