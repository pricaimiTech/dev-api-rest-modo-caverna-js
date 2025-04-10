import mongoose from "mongoose";

const atividadeSchema = new mongoose.Schema({}, { _id: false });

const categoriaSchema = new mongoose.Schema({
  id: Number,
  title: String,
  pilar: String,
  atividade: [atividadeSchema],
}, { _id: false });

const pilarSchema = new mongoose.Schema({
  id: Number,
  title: String,
  categoria: [categoriaSchema]
}, { _id: false });

const prazoSchema = new mongoose.Schema({
  id: Number,
  descricao: String,
  prazo: Number
}, { _id: false });

const objetivoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  descricao: String,
  icone: String,
  andamento: String,
  prazo: prazoSchema,
  data_inicio: String,
  data_fim: String,
  status: String,
  pilares: [pilarSchema]
});

const Objetivo = mongoose.model("Objetivo", objetivoSchema);
export default Objetivo;

