import mongoose from "mongoose";

// Subdocumento: Pilar (dentro da categoria)
const pilarSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  descrição: {
    type: String
  },
  icone: {
    type: String
  }
}, { _id: false });

// Subdocumento: Atividade (vazio por enquanto)
const atividadeSchema = new mongoose.Schema({}, { _id: false });

// Schema principal: Categoria
const categoriaSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  descrição: {
    type: String
  },
  icone: {
    type: String
  },
  pilar: pilarSchema,
  isConclued: {
    type: String
  },
  atividade: [atividadeSchema]
});

const Categoria = mongoose.model("Categoria", categoriaSchema);
export default Categoria;
