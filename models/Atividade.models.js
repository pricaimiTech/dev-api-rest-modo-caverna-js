const mongoose = require('mongoose');

const StatusAtividadeEnum = ['pendente', 'em andamento', 'concluída'];

const atividadeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  descricao: {
    type: String,
    required: true,
    trim: true
  },
  categoriaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  status: {
    type: String,
    enum: StatusAtividadeEnum,
    default: 'pendente',
    required: true
  },
  dataExecucao: {
    type: Date,
    required: true
  },
  dataConclusao: {
    type: Date,  // Para registrar a data quando a atividade for concluída
  },
  isConcluida: {
    type: Boolean,
    default: false  // Para indicar se a tarefa foi concluída
  },
  objetivoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Objetivo',  // Relacionamento com o Objetivo
    required: true
  }
}, {
  timestamps: true,
  collection: 'atividades',
});

// Logica para criar atividades diárias no Pilar Obrigatório
// atividadeSchema.pre('save', async function(next) {
//   const categoria = await this.populate('categoriaId').execPopulate();
//   const pilar = categoria.pilarId;

//   if (pilar.title === 'obrigatório') {
//     // Criar atividade para cada dia
//     this.dataExecucao = new Date();  // Data do dia atual
//   }

//   next();
// });

// Função para verificar se a atividade está concluída
atividadeSchema.methods.marcarComoConcluida = function() {
  this.status = 'concluída';
  this.isConcluida = true;
  this.dataConclusao = new Date();
  return this.save();
};

const Atividade = mongoose.model("Atividade", atividadeSchema);

module.exports = Atividade;
