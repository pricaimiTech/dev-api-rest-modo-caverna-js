const Pilar = require('../models/Pilar.models.js');
const Categoria = require('../models/Categoria.models.js');

const PilarService = {

    atualizarCategorias: async (id, data) => {
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
            if (!Array.isArray(data) || data.length > 3) {
                throw new Error('Pilares flexíveis podem ter no máximo 3 categorias.');
            }

            // Validação: se veio categorias, verifique se todas existem
            const categoriasExistentes = await Categoria.find({
                _id: { $in: data }
            });
            if (categoriasExistentes.length !== data.length) {
                throw new Error('Uma ou mais categorias informadas não existem.');
            }

            // Atualiza apenas o campo de categorias se o pilar for flexível
            pilar.categorias = data;

            return await pilar.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = PilarService;