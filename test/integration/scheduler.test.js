    const mongoose = require('mongoose');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const { gerarAtividadesDiarias } = require('../../utils/scheduler.js'); // Importe a função
    const Atividade = require('../../models/Atividade.models.js');
    const Objetivo = require('../../models/Objetivo.models.js');
    const Pilar = require('../../models/Pilar.models.js');

    let mongoServer;

    describe('gerarAtividadesDiarias - Integração com DB', () => {
      // Falsifica o Date para controlar o tempo
      jest.useFakeTimers();

      beforeAll(async () => {
        // Inicia o servidor de banco de dados em memória
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
      });

      afterAll(async () => {
        // Para o servidor de banco de dados em memória
        await mongoose.disconnect();
        await mongoServer.stop();
        jest.useRealTimers(); // Restaura o Date original
      });

      beforeEach(async () => {
        // Limpa o banco de dados antes de cada teste
        await Atividade.deleteMany({});
        await Objetivo.deleteMany({});
        await Pilar.deleteMany({});
        jest.clearAllMocks(); // Limpa mocks, se ainda estiver usando algum
         jest.setSystemTime(new Date('2023-10-27T10.00.00Z')); // Define a data para o teste
      });

      test('deve criar atividades diárias no DB para templates que não existem hoje', async () => {
        // Cria dados de teste REAIS no banco de dados
        const objetivoId = new mongoose.Types.ObjectId();
        const pilarId = new mongoose.Types.ObjectId();
        const categoria1Id = new mongoose.Types.ObjectId();
        const categoria2Id = new mongoose.Types.ObjectId();

        await Objetivo.create({
          _id: objetivoId,
          userId: userId,
          name: 'Meu Objetivo Teste',
          status: 'IN_PROGRESS',
          pilares: [pilarId]
        });

        await Pilar.create({
          _id: pilarId,
          name: 'obrigatório',
          descricao: 'descricao pilar teste',
          categorias: [categoria1Id, categoria2Id]
        });

        await Atividade.create({
          name: 'Template Atividade 1',
          descricao: 'Desc Template 1',
          categoriaId: categoria1Id,
          objetivoId: objetivoId,
          isTemplate: true,
          // Outros campos padrão para template
        });

         await Atividade.create({
          name: 'Template Atividade 2',
          descricao: 'Desc Template 2',
          categoriaId: categoria2Id,
          objetivoId: objetivoId,
          isTemplate: true,
          // Outros campos padrão para template
        });


        // Verifica que não há atividades diárias antes da execução
        const atividadesAntes = await Atividade.find({ isTemplate: false });
        expect(atividadesAntes.length).toBe(0);

        // Executa a função
        await gerarAtividadesDiarias();

        // Consulta o banco de dados para verificar as novas atividades
        const atividadesDepois = await Atividade.find({ isTemplate: false });

        // Verifica se 2 novas atividades diárias foram criadas
        expect(atividadesDepois.length).toBe(2);

        // Verifica os dados das atividades criadas
        const atividade1 = atividadesDepois.find(a => a.name === 'Template Atividade 1');
        const atividade2 = atividadesDepois.find(a => a.name === 'Template Atividade 2');

        expect(atividade1).toBeDefined();
        expect(atividade1.status).toBe('TO_DO');
        expect(atividade1.dataExecucao.toISOString()).toBe(new Date('2023-10-27T00.00.00.000Z').toISOString());
        expect(atividade1.isConcluida).toBe(false);
        expect(atividade1.isTemplate).toBe(false);
        expect(atividade1.objetivoId.toString()).toBe(objetivoId.toString());
        expect(atividade1.categoriaId.toString()).toBe(categoria1Id.toString());
        expect(atividade1.userId.toString()).toBe(userId.toString());


        expect(atividade2).toBeDefined();
        expect(atividade2.status).toBe('TO_DO');
        expect(atividade2.dataExecucao.toISOString()).toBe(new Date('2023-10-27T00.00.00.000Z').toISOString());
        expect(atividade2.isConcluida).toBe(false);
        expect(atividade2.isTemplate).toBe(false);
        expect(atividade2.objetivoId.toString()).toBe(objetivoId.toString());
        expect(atividade2.categoriaId.toString()).toBe(categoria2Id.toString());
        expect(atividade2.userId.toString()).toBe(userId.toString());

      }, 10000); // Aumenta o tempo limite para 10 segundos

       test.skip('não deve criar atividades diárias se já existirem para hoje no DB', async () => {
         // Cria dados de teste REAIS no banco de dados
        const userId = new mongoose.Types.ObjectId();
        const objetivoId = new mongoose.Types.ObjectId();
        const pilarId = new mongoose.Types.ObjectId();
        const categoria1Id = new mongoose.Types.ObjectId();

        await Objetivo.create({
          _id: objetivoId,
          userId: userId,
          name: 'Meu Objetivo Teste',
          status: 'IN_PROGRESS',
          pilares: [pilarId]
        });

        await Pilar.create({
          _id: pilarId,
          name: 'obrigatório',
          categorias: [categoria1Id]
        });

        await Atividade.create({
          name: 'Template Atividade 1',
          descricao: 'Desc Template 1',
          categoriaId: categoria1Id,
          objetivoId: objetivoId,
          userId: userId,
          isTemplate: true,
        });

        // Cria uma atividade diária EXISTENTE para hoje
         await Atividade.create({
          name: 'Template Atividade 1',
          descricao: 'Desc Template 1', // Descrição pode ser diferente, o match é por nome e categoria
          categoriaId: categoria1Id,
          objetivoId: objetivoId,
          userId: userId,
          isTemplate: false,
          dataExecucao: new Date('2023-10-27T00.00.00.000Z'), // Data de hoje
          status: 'TO_DO', // Ou qualquer outro status
          isConcluida: false
        });


        // Verifica que há 1 atividade diária antes da execução
        const atividadesAntes = await Atividade.find({ isTemplate: false });
        expect(atividadesAntes.length).toBe(1);

        // Executa a função
        await gerarAtividadesDiarias();

        // Consulta o banco de dados para verificar as atividades
        const atividadesDepois = await Atividade.find({ isTemplate: false });

        // Verifica que NENHUMA nova atividade diária foi criada
        expect(atividadesDepois.length).toBe(1); // Continua sendo apenas a que já existia

      });

       // Adicione mais testes de integração para outros cenários (sem objetivo, sem pilar, etc.)
    });