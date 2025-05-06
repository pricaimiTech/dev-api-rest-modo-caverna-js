const Pilar = require("../models/Pilar.models.js");
const PilarService = require("../services/PilarService.js");

class PilarController {
    static async getAll(req, res) {
        try {
            const pilares = await Pilar.find();
            res.status(200).json(pilares);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar pilares", error });
        }
    }

    static async getById(req, res) {
        try {
            const pilar = await Pilar.findById(req.params.id);
            if (!pilar) return res.status(404).json({ message: "Pilar não encontrado" });
            res.status(200).json(pilar);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar pilar", error });
        }
    }

    static async patchCategorias(req, res) {
        try {
            const { categorias } = req.body;
            const pilarAtualizado = await PilarService.atualizarCategorias(req.params.id, categorias);
            res.status(200).json(pilarAtualizado);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = PilarController;