import mongoose from "mongoose";

// Subdocumento: Pilar
const pilarSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: String,
  descricao_pilar: String
}, { _id: false });

// Subdocumento: Categoria
const categoriaSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  nome_categoria: String,
  descricao_categoria: String,
  pilar: pilarSchema
}, { _id: false });

// Schema principal: Atividade
const atividadeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  descrição: String,
  icone: String,
  isConclued: {
    type: Boolean,
    default: false
  },
  isDiaria: {
    type: Boolean,
    default: false
  },
  categoria: categoriaSchema
});

const Atividade = mongoose.model("Atividade", atividadeSchema);
export default Atividade;
