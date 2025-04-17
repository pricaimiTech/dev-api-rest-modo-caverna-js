// import http from "http";
const app = require("./app.js");
const setupSwaggerDocs = require("./config/swagger.js");

const PORT = 3000;
setupSwaggerDocs(app);


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`);
});
