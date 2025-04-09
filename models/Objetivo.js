import mongoose from "mongoose";

const objetivoSchema = new mongoose.Schema({
  id: Number,
  title: String,
  descrição: String,
  icone: String,
  andamento: String,
  prazo: {
    id: Number,
    descricao: String,
    prazo: Number,
  },
  data_inicio: String,
  data_fim: String,
  status: String,
  pilares: [
    {
      id: Number,
      title: String,
      categoria: [
        {
          id: Number,
          title: String,
          pilar: String,
          atividade: Array,
        }
      ]
    }
  ]
});

const Objetivo = mongoose.model("Objetivo", objetivoSchema);
export default Objetivo;
