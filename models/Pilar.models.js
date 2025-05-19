const mongoose = require('mongoose');

const PilaresEnum = ['obrigatório', 'flexível'];

const pilarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: {
    type: String,
    enum: PilaresEnum,
    required: true
  },
  descricao: {
    type: String,
    trim: true,
    default: '',
    required: true
  },
  categorias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria'
  }]
}, {
  timestamps: true,
  collection: 'pilares',
  versionKey: false // Adicionado para remover o __v
});

const Pilar = mongoose.model('Pilar', pilarSchema);
module.exports = Pilar;