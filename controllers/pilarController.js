import Pilar from "../models/pilar.js";

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

    static async getByObjetivo(req, res) {
        try {
            const pilar = await Pilar.findOne({ 'objetivo.title': req.params.nome });
            if (!pilar) return res.status(404).json({ message: "Pilar não encontrado" });
            res.status(200).json(pilar);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar pilar", error });
        }
    }
}

export default PilarController;