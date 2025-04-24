const Objetivo = require("../models/Objetivo.models.js");
const ObjetivoService = require("../services/ObjetivoService.js")

class ObjetivoController {

  static async getAll(req, res) {
    try {
      const objetivos = await Objetivo.find();
      res.status(200).json(objetivos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar objetivos", error });
    }
  }

  static async createObjetivo(req, res) {
    try {
      const requestBody = req.body;
      const objetivoSalvo = await ObjetivoService.criarObjetivo(requestBody)
      res.status(201).json(objetivoSalvo);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar objetivo", error });
    }
  }

  static async getById(req, res) {
    try {
      const objetivo = await Objetivo.findById(req.params.id);
      if (!objetivo) return res.status(404).json({ message: "Objetivo não encontrado." });
      res.status(200).json(objetivo);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar objetivo.", error: error.message });
    }
  }

  static async updateObjetivo(req, res) {
    try {
      const objetivoAtualizado = await Objetivo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!objetivoAtualizado) return res.status(404).json({ message: "Objetivo não encontrado." });
      res.status(200).json(objetivoAtualizado);
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar objetivo.", error: error.message });
    }
  }

  static async deleteObjetivo(req, res) {
    try {
      const objetivoDeletado = await Objetivo.findByIdAndDelete(req.params.id);
      if (!objetivoDeletado) return res.status(404).json({ message: "Objetivo não encontrado." });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar objetivo.", error: error.message });
    }
  }

  static async getByStatus(req, res) {
    try {
      const status = req.params.status;
      const objetivos = await Objetivo.find({ status });

      if (!objetivos || objetivos.length === 0) {
        return res.status(404).json({ message: "Nenhum objetivo encontrado com esse status" });
      }

      res.status(200).json(objetivos);
    } catch (error) {
      res.status(500).json({
        message: "Erro ao buscar objetivo pelo status",
        error: error.message,
      });
    }
  }
}


module.exports = ObjetivoController;