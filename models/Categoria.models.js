const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
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
  versionKey: false // Adicionado para remover o __v
});

const Categoria = mongoose.model("Categoria", categoriaSchema);

module.exports = Categoria;