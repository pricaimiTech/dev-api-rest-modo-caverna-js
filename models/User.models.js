const mongoose = require('mongoose');

const ProviderEnum = ['google', 'github', 'apple', 'discord']; // você pode expandir

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // SSO precisa dessa garantia
    lowercase: true
  },
  foto: {
    type: String // URL do avatar
  },
  provider: {
    type: String,
    enum: ProviderEnum,
    required: true
  },
  providerId: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'users',
  versionKey: false // Adicionado para remover o __v
});

const User = mongoose.model("User", userSchema);
module.exports = User;