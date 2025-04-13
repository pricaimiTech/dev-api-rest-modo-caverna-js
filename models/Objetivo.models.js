const mongoose = require('mongoose');

const StatusEnum = ['TO_DO', 'IN_PROGRESS', 'CONCLUED', 'ARCHIEVE'];
const PilaresEnum = ['obrigatório', 'flexível'];
const PrazosEnum = [30, 60, 90, 120, 150];

const objetivoSchema = new mongoose.Schema({
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
    trim: true
  },
  icone: {
    type: String
  },
  data_inicio: {
    type: Date,
    required: true
  },
  prazo: {
    type: Number,
    enum: PrazosEnum,
    required: true
  },
  status: {
    type: String,
    enum: StatusEnum,
    default: 'TO_DO'
  },
  pilares: [{
    type: String,
    enum: PilaresEnum,
    required: true
  }],
  categorias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria'
  }]
}, {
  timestamps: true
});


const Objetivo = mongoose.model("Objetivo", objetivoSchema);
module.exports = Objetivo;
