const express = require("express");
const connectDB = require("./config/db.js"); // Ajuste o caminho conforme a estrutura do seu projeto

const objetivosRoutes = require('./routes/objetivos.routes.js');
const pilaresRoutes = require('./routes/pilares.routes.js');
const categoriasRoutes = require('./routes/categorias.routes.js');
const atividadesRoutes = require('./routes/atividades.routes.js');

const app = express();
app.use(express.json());
connectDB(); // ⬅️ Isso inicia a conexão com o banco de dados


// Usando as rotas organizadas
app.use('/objetivos', objetivosRoutes);
app.use('/pilares', pilaresRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/atividades', atividadesRoutes);


module.exports = app;
