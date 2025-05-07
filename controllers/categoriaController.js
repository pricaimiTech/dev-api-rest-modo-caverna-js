const Categoria = require("../models/Categoria.models.js");
const CategoriaService = require("../services/CategoriaService.js");

class CategoriaController {

    static async getAll(req, res) {
        try {
            const categorias = await Categoria.find();
            res.status(200).json(categorias);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar categorias", error });
        }
    }
    static async createCategoria(req, res) {
        try {
            const novaCategoria = await CategoriaService.createCategoria(req.body);
            res.status(201).json(novaCategoria);
        } catch (error) {
            res.status(500).json({
                message: error.message || "Erro ao criar categoria",
                error: error.stack
            }
            );
        }
    }
    static async getById(req, res) {
        try {
            const categoria = await Categoria.findById(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: "Categoria não encontrada" });
            }
            res.status(200).json(categoria);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar categoria", error });
        }
    }
    static async patchCategoria(req, res) {
        try {
            const categoria = await CategoriaService.atualizarCategoria(req.params.id, req.body, { new: true });
            if (!categoria) return res.status(404).json({ message: "Categoria não encontrado" });
            res.status(200).json(categoria);
        } catch (error) {
            res.status(500).json({
                message: error.message || "Erro ao atualizar uma categoria",
                error: error.stack
            }
            )
        }
    }
    static async deleteCategoria(req, res) {
        try {
            const categoria = await CategoriaService.deletarCategoria(req.params.id);
            res.status(200).json({
                message: "Categoria deletada com sucesso",
                data: categoria
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || "Erro ao deletar uma categoria",
                error: error.stack
            }
            )
        }
    }

}

module.exports = CategoriaController;