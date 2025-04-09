import mongoose from "mongoose";

const atividadeSchema = new mongoose.Schema({}, { _id: false }); // estrutura vazia por enquanto

const categoriaSchema = new mongoose.Schema({
  id: Number,
  title: String,
  pilar: String,
  atividade: [atividadeSchema]
}, { _id: false });

const objetivoSchema = new mongoose.Schema({
  id: Number,
  title: String,
  descricao: String
}, { _id: false });

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
  },
  categoria: [categoriaSchema],
  objetivo: objetivoSchema
});

const Pilar = mongoose.model("Pilar", pilarSchema);
export default Pilar;