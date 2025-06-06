const Categoria = require('../models/Categoria.models.js');
const Pilar = require('../models/Pilar.models.js');

const CategoriaService = {
    atualizarCategoria: async (id, data) => {
        try {
            const categoria = await Categoria.findById(id);

            if (!categoria) {
                throw new Error('Categoria não encontrada.');
            }

            // Verificar se a categoria é fixa de um pilar obrigatório
            const pilarObrigatorio = await Pilar.findOne({
                name: 'obrigatório',
                categorias: id
            });

            if (pilarObrigatorio) {
                categoria.atividades = data.atividades || categoria.atividades
            }else {
                // Se não for do tipo pilar obrigatório, pode alterar o nome e a descrição
                categoria.name = data.name || categoria.name;
                categoria.descricao = data.descricao || categoria.descricao;
                categoria.atividades = data.atividades || categoria.atividades
            }

            return await categoria.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deletarCategoria: async (id) => {
        try {
            const categoria = await Categoria.findById(id);

            if (!categoria) {
                throw new Error('Categoria não encontrada.');
            }

            // Verificar se a categoria é fixa de um pilar obrigatório
            const pilar = await Pilar.findOne({
                name: 'obrigatório',
                categorias: id
            });

            if (pilar) {
                throw new Error('Categoria de pilares obrigatórios não podem ser deletadas.');
            }

            return await categoria.remove();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createCategoria: async (data) => {
        try {
            const pilar = await Pilar.findById(data.pilarId);

            if (!pilar) {
                throw new Error('Pilar não encontrado.');
            }
            // Verificar se o pilar é obrigatório
            if (pilar.name === 'obrigatório') {
                throw new Error('Não é possível criar categorias para pilares obrigatórios.');
            }

            // constroi o objeto novaCategoria para enviar ao banco de dados
            const novaCategoria = {
                name: data.name,
                descricao: data.descricao,
                pilarId: data.pilarId,
            };

            return await Categoria.create(novaCategoria);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = CategoriaService;