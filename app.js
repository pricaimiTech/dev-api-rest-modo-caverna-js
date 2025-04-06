import express from "express";
import objetivosRoutes from './src/routes/objetivos.routes.js';
import pilaresRoutes from './src/routes/pilares.routes.js';
import categoriasRoutes from './src/routes/categorias.routes.js';
import atividadesRoutes from './src/routes/atividades.routes.js';

const app = express();
app.use(express.json());


// Usando as rotas organizadas
app.use('/objetivos', objetivosRoutes);
app.use('/pilares', pilaresRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/atividades', atividadesRoutes);


export default app;
