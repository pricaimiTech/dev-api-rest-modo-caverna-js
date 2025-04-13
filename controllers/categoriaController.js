import Categoria from "../models/categoria.js";

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
            const novaCategoria = await Categoria.create(req.body);
            res.status(201).json(novaCategoria);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar categoria", error });
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
    static async updateCategoria(req, res) {
        try {
            const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!categoria) return res.status(404).json({ message: "Categoria não encontrado" });
            res.status(200).json(categoria);
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar categoria", error });
        }
    }
    static async deleteCategoria(req, res) {
        try {
            const categoria = await Categoria.findByIdAndDelete(req.params.id);
            if (!categoria) return res.status(404).json({ message: "Categoria não encontrada" });
            res.status(200).json({ message: "Categoria deletada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar categoria", error });
        }
    }

}

export default CategoriaController;