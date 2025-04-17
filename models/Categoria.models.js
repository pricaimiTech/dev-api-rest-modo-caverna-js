const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
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
    required: true, // Tornando a descrição obrigatória
    trim: true
  },
  pilarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pilar',
    required: true
  },
  atividades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Atividade'
  }]
}, {
  timestamps: true,
  collection: 'categorias',
});

const Categoria = mongoose.model("Categoria", categoriaSchema);

module.exports = Categoria;