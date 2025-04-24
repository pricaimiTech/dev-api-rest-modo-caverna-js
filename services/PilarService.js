const Pilar = require('../models/Pilar.models.js');
const Categoria = require('../models/Categoria.models.js');

const PilarService = {

    atualizarPilar: async (id, data) => {
        try {
            const pilar = await Pilar.findById(id);

            if (!pilar) {
                throw new Error('Pilar não encontrado.');
            }

            // Se o pilar for obrigatório, não permitir a atualização
            if (pilar.name === 'obrigatório') {
                throw new Error('Pilares obrigatórios não podem ser atualizados.');
            }

            // Se o pilar for flexível, validar o número de categorias
            if (pilar.name === 'flexivel' && data.categorias && data.categorias.length > 3) {
                throw new Error('Pilares flexíveis podem ter no máximo 3 categorias.');
            }

            pilar.name = data.name || pilar.name;
            pilar.descricao = data.descricao || pilar.descricao;
            pilar.tipo = data.tipo || pilar.tipo;
            pilar.categorias = data.categorias || pilar.categorias;

            return await pilar.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = PilarService;