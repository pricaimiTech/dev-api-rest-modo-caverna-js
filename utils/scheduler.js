// scheduler.js
const cron = require('node-cron');
const Atividade = require('../models/Atividade.models.js'); // Ajuste o caminho conforme sua estrutura
const Objetivo = require('../models/Objetivo.models.js'); // Assumindo que você tem um modelo Objetivo
const Pilar = require('../models/Pilar.models.js'); // Assumindo que você tem um modelo Categoria

// Função para gerar as atividades diárias
async function gerarAtividadesDiarias() {
  console.log('Iniciando geração de atividades diárias...');
  const today = new Date();
  // Zera a hora, minuto, segundo e milissegundo para comparar apenas a data
  today.setHours(0, 0, 0, 0);

  try {
    // 1. Encontrar todos os objetivos ativos
    // Assumindo que não há um campo 'ativo', vamos considerar todos os objetivos existentes.
    // Se precisar filtrar (ex: por status 'IN_PROGRESS'), ajuste a query:
    const objetivos = await Objetivo.find({ 
      status: 'IN_PROGRESS' 
    });

    for (const objetivo of objetivos) {
      console.log(`Processando objetivo: ${objetivo.name} (${objetivo._id})`);

      // 2. Encontrar o Pilar Obrigatório para este objetivo
      // Como um objetivo tem um array de pilares, precisamos encontrar o que tem name 'obrigatório'.
      // Pode ser necessário popular os pilares ou fazer uma busca separada.
      // Vamos buscar o pilar obrigatório diretamente, assumindo que ele existe e está linkado ao objetivo.
      // Uma forma mais robusta seria buscar o pilar pelo ID e verificar o nome,
      // ou buscar pilares pelo objetivoId e filtrar por nome.
      // Assumindo que o Objetivo referencia os Pilares e o Pilar tem o nome:
      const pilarObrigatorio = await Pilar.findOne({
        _id: { $in: objetivo.pilares }, // Busca entre os IDs de pilares associados ao objetivo
        name: 'obrigatório'
      });

      if (!pilarObrigatorio) {
        console.warn(`Pilar obrigatório não encontrado para o objetivo ${objetivo._id}. Pulando.`);
        continue; // Pula para o próximo objetivo se não encontrar o pilar obrigatório
      }

      console.log(`Encontrado pilar obrigatório: ${pilarObrigatorio.name} (${pilarObrigatorio._id})`);

      // 3. Encontrar as Categorias associadas a este Pilar Obrigatório
      // As categorias estão referenciadas no array 'categorias' do Pilar.
      const categoriasObrigatoriasIds = pilarObrigatorio.categorias;

      if (categoriasObrigatoriasIds.length === 0) {
          console.warn(`Nenhuma categoria encontrada para o pilar obrigatório ${pilarObrigatorio._id}. Pulando.`);
          continue; // Pula para o próximo objetivo/pilar se não houver categorias
      }

      console.log(`Categorias obrigatórias IDs: ${categoriasObrigatoriasIds}`);


      // 4. Encontrar as Atividades "modelo" (isTemplate: true) para estas Categorias Obrigatórias
      // Buscamos atividades que são templates E pertencem a uma das categorias obrigatórias.
      const atividadesModelo = await Atividade.find({
        categoriaId: { $in: categoriasObrigatoriasIds }, // Atividade pertence a uma categoria obrigatória
        isTemplate: true, // Atividade é um modelo
        objetivoId: objetivo._id // Garante que o template está associado a este objetivo
      });

      console.log(`Encontradas ${atividadesModelo.length} atividades modelo para este objetivo.`);

      for (const atividadeModelo of atividadesModelo) {
        // 5. Verificar se já existe uma atividade diária gerada para este modelo hoje
        const atividadeExistenteHoje = await Atividade.findOne({
          objetivoId: objetivo._id,
          categoriaId: atividadeModelo.categoriaId, // Mesma categoria do modelo
          name: atividadeModelo.name, // Mesma nome do modelo (para identificar a "mesma" tarefa)
          dataExecucao: today, // Para a data de hoje
          isTemplate: false // Garante que não estamos comparando com o próprio template
        });

        if (!atividadeExistenteHoje) {
          // 6. Criar uma nova atividade diária baseada no modelo
          const novaAtividade = new Atividade({
            userId: objetivo.userId,
            name: atividadeModelo.name,
            descricao: atividadeModelo.descricao,
            categoriaId: atividadeModelo.categoriaId, // Mantém a referência à categoria original
            status: 'TO_DO', // Nova atividade sempre começa como TO_DO
            dataExecucao: today, // Data de execução é o dia de hoje
            dataConclusao: null, // Limpa data de conclusão
            isConcluida: false, // Nova atividade não está concluída
            objetivoId: objetivo._id,
            isTemplate: false // A nova atividade NÃO é um template
          });

          await novaAtividade.save();
          console.log(`Atividade diária "${novaAtividade.name}" criada para o Objetivo ${objetivo._id} na data ${today.toISOString()}`);
        } else {
          console.log(`Atividade diária "${atividadeModelo.name}" já existe para o Objetivo ${objetivo._id} na data ${today.toISOString()}. Pulando.`);
        }
      }
    }

    console.log('Geração de atividades diárias concluída.');

  } catch (error) {
    console.error('Erro ao gerar atividades diárias:', error);
  }
}

// Agendar a tarefa para rodar todo dia à 00.00
// A string do cron é 'segundo minuto hora diaDoMes mes diaDaSemana'
// '0 0 0 * * *' significa: no segundo 0, minuto 0, hora 0, de qualquer dia do mês, qualquer mês, qualquer dia da semana.
cron.schedule('0 0 0 * * *', () => {
  gerarAtividadesDiarias();
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo" // Ajuste o timezone conforme necessário
});


console.log('Agendador de atividades diárias iniciado.');

module.export = gerarAtividadesDiarias()
