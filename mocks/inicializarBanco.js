const {
    connectToDatabase,
    disconnectDatabase
} = require('../config/db.js')
const Categoria = require('../models/Categoria.models.js'); // Verifique os caminhos dos seus modelos
const Pilar = require('../models/Pilar.models.js'); // Verifique os caminhos dos seus modelos
const Objetivo = require('../models/Objetivo.models.js'); // Verifique os caminhos dos seus modelos
const Atividade = require('../models/Atividade.models.js'); // Verifique os caminhos dos seus modelos

async function inicializarBanco() {
    try {
        console.log('Conectando ao banco de dados...');
        await connectToDatabase(); 

        // Limpar coleções existentes
        console.log('Limpando banco de dados...');
        await Atividade.deleteMany({}); // Limpe atividades primeiro devido às referências
        await Categoria.deleteMany({});
        await Pilar.deleteMany({});
        await Objetivo.deleteMany({});
        console.log('✅ Banco de dados limpo.');

        // Criar categorias obrigatórias
        console.log('Criando categorias obrigatórias...');
        const categorias = [{
                name: 'mente',
                descricao: 'Saúde mental e emocional'
            },
            {
                name: 'corpo',
                descricao: 'Exercícios físicos diários'
            },
            {
                name: 'intelecto',
                descricao: 'Desenvolvimento intelectual'
            }
        ];

        const categoriasCriadas = await Categoria.insertMany(categorias);
        console.log('✅ Categorias obrigatórias criadas.');

        // Criar pilar obrigatório
        console.log('Criando pilar obrigatório...');
        const pilarObrigatorio = new Pilar({
            name: 'obrigatório',
            descricao: 'Pilar com categorias fixas obrigatórias',
            categorias: categoriasCriadas.map(cat => cat._id)
        });

        await pilarObrigatorio.save();
        console.log('✅ Pilar obrigatório criado.');

        // Criar pilar flexível
        console.log('Criando pilar flexível...');
        const pilarFlexivel = new Pilar({
            name: 'flexível',
            descricao: 'Pilar flexível sem categorias iniciais',
            categorias: []
        });

        await pilarFlexivel.save();
        console.log('✅ Pilar flexível criado');

        // Criar objetivo padrão
        console.log('Criando objetivo padrão...');
        const objetivoPadrao = new Objetivo({
            name: 'Objetivo Padrão',
            descricao: 'Objetivo inicial para testes',
            data_inicio: new Date(),
            prazo: 30,
            status: 'TO_DO', // Use um dos valores do ENUM StatusEnum
            pilares: [pilarObrigatorio._id, pilarFlexivel._id]
        });

        await objetivoPadrao.save();
        console.log('✅ Objetivo padrão criado.');

        // Criar atividades para categorias obrigatórias (templates)
        console.log('Criando atividades templates para categorias obrigatórias...');
        const hoje = new Date();
        // // Zera a hora, minuto, segundo para garantir que a dataExecucao seja apenas a data
        hoje.setHours(0, 0, 0, 0);

        for (const categoria of categoriasCriadas) {
            const atividade1 = new Atividade({
                name: `Atividade 1 - ${categoria.name}`,
                descricao: `Primeira atividade de ${categoria.name}`,
                dataExecucao: hoje, // Data de execução inicial (pode ser hoje ou uma data futura se preferir)
                categoriaId: categoria._id,
                objetivoId: objetivoPadrao._id,
                isTemplate: true // <-- MARCADO COMO TEMPLATE
            });

            const atividade2 = new Atividade({
                name: `Atividade 2 - ${categoria.name}`,
                descricao: `Segunda atividade de ${categoria.name}`,
                dataExecucao: hoje, // Data de execução inicial
                categoriaId: categoria._id,
                objetivoId: objetivoPadrao._id,
                isTemplate: true // <-- MARCADO COMO TEMPLATE
            });

            await atividade1.save()
            await atividade2.save()
        }

        console.log('✅ Atividades templates criadas para categorias obrigatórias.');

    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:\n', error);
    } finally {
        // Desconectar do banco de dados no final, garantindo que aconteça
        console.log('Desconectando do banco de dados...');
        await disconnectDatabase(); // <-- ADICIONADO AWAIT e movido para finally
        console.log('✅ Desconectado do banco de dados.');
    }
}

inicializarBanco();