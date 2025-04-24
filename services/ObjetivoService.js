const Objetivo = require('../models/Objetivo.models.js');
const Categoria = require('../models/Categoria.models.js');
const Pilar = require("../models/Pilar.models.js")

const ObjetivoService = {
    criarObjetivo: async (data) => {
        try {
            const {
                name,
                descricao,
                data_inicio,
                prazo,
                pilares,
            } = data;

            // 1. Buscar os pilares e categorias obrigatórias no banco
            const categoriasObrigatorias = await Categoria.find({
                name: {
                    $in: ['mente', 'corpo', 'intelecto']
                }
            });

            if (categoriasObrigatorias.length !== 3) {
                throw new Error('Categorias obrigatórias não encontradas.');
            }

            const pilaresObrigatorios = await Pilar.find({
                name: {
                    $in: ['obrigatório', 'flexivel']
                }
            });

            if (pilaresObrigatorios.length !== 2) {
                throw new Error('Pilares obrigatórios não encontrados.');
            }

            // 2. Extrair os IDs das categorias obrigatórias
            const categoriasObrigatoriasIds = categoriasObrigatorias.map(cat => cat._id);
            const pilaresObrigatoriosIds = pilaresObrigatorios.map(cat => cat._id);

            // 3. Associar as categorias obrigatórias aos pilares obrigatórios
            for (const pilar of pilaresObrigatorios) {
                if (pilar.name === 'obrigatório') {
                    pilar.categorias = categoriasObrigatoriasIds;
                    await pilar.save(); // Salvar as alterações no pilar
                }
            }

            // 4. Criar o novo objetivo
            const novoObjetivo = new Objetivo({
                name,
                descricao,
                data_inicio,
                prazo,
                pilares: pilaresObrigatoriosIds
            });

            // 5. Salvar o objetivo no banco
            const objetivoSalvo = await novoObjetivo.save();

            // 6. Buscar os detalhes completos dos pilares
            const pilaresCompletos = await Pilar.find({
                _id: {
                    $in: objetivoSalvo.pilares
                }
            });

            // 7. Detalhar as categorias dentro dos pilares
            for (const pilar of pilaresCompletos) {
                const categoriasDoPilar = await Categoria.find({
                    _id: {
                        $in: pilar.categorias
                    }
                });
                pilar.categorias = categoriasDoPilar; // Substituir os IDs pelos objetos completos
            }

            // 8. Adicionar os detalhes completos dos pilares ao objetivo
            objetivoSalvo.pilares = pilaresCompletos;

            return objetivoSalvo;
        } catch (error) {
            console.error(error);
            throw error; // Rejeitar o erro para ser tratado no controller
        }
    }
};

module.exports = ObjetivoService;