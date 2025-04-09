import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config({ path: './environment/dev.env' });


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("🔴 Erro ao conectar com o MongoDB:", error.message);
  }
};

export default connectToDatabase;
