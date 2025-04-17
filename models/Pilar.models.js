const mongoose = require('mongoose');

const TipoPilarEnum = ['obrigatório', 'flexível'];

const pilarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    enum: TipoPilarEnum,
    required: true
  },
  descricao: {
    type: String,
    trim: true,
    default: '',
    required: true
  },
  categoria: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria'
  }]
}, {
  timestamps: true,
  collection: 'pilares',
});

const Pilar = mongoose.model("Pilar", pilarSchema);
module.exports = Pilar;