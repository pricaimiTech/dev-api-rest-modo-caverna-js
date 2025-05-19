const mongoose = require('mongoose');

const StatusAtividadeEnum = ['TO_DO', 'IN_PROGRESS', 'concluída'];

const atividadeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
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
    default: 'TO_DO',
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
  versionKey: false // Adicionado para remover o __v
});

const Atividade =  mongoose.model('Atividade', atividadeSchema);

module.exports = Atividade;
