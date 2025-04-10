import Atividade from "../models/atividade.js";

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
        try {
            const novaAtividade = await Atividade.create(req.body);
            res.status(201).json(novaAtividade);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar nova atividade", error });
        }
    }
    static async getDiarias(req, res) {
        try {
            const { concluidas } = req.query;

            // Cria o filtro base: atividades diárias
            const filtro = { isDiaria: true };

            // Aplica filtro adicional se o parâmetro 'concluidas' for passado
            if (concluidas === "true") {
                filtro.isConclued = true;
            } else if (concluidas === "false") {
                filtro.isConclued = false;
            }

            // Busca no banco usando o filtro
            const tarefasDiarias = await Atividade.find(filtro);
            res.status(200).json(tarefasDiarias);

        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar atividades diárias", error: error.message });
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

export default AtividadeController;