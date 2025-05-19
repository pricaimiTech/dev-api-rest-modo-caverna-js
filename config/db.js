const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config({
  path: './environment/dev.env'
});


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("🔴 Erro ao conectar com o MongoDB:", error.message);
    throw error;
  }
};

const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ Desconectado do banco de dados.');
  } catch (error) {
    console.error("🔴 Erro ao desconectar com o MongoDB:", error.message);
    throw error;
  }
};
module.exports = {
  connectToDatabase,
  disconnectDatabase
};