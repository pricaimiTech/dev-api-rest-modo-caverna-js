import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Caminho relativo até o arquivo .env
dotenv.config({
  path: path.resolve('../environment/.env'),
});

const username = encodeURIComponent("paraujocaimi-des")
const password = encodeURIComponent("")
const cluster = "aws-brazil-sp.dgeodii"
const banco= "modo-caverna-dev"
const dbUri = 
`mongodb+srv://paraujocaimi-des:${password}@aws-brazil-sp.dgeodii.mongodb.net/${banco}?appName=aws-brazil-sp`;



const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🟢 Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("🔴 Erro ao conectar com o MongoDB:", error.message);
  }
};

export default connectToDatabase;
