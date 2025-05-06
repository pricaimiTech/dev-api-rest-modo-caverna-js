# Modo Caverna API Rest

Aplicativo destinado a construir uma API Rest para um aplicativo de modo caverna da Ana Jords. 

[![Vídeo Modo Caverna Ana Jords](https://img.youtube.com/vi/0pVYcWLxUSM/0.jpg)](https://www.youtube.com/watch?v=0pVYcWLxUSM)


### Neste projeto você verá

- Mockups (bem básicos, isso é projeto de backend hehehe) no figma, para verificar de forma visual se falta alguma informação ou funcionalidade para implementação via backend
- Disponibilização da análise técnica da arquitetura do projeto
- CRUD
- Autenticação
- Banco de dados criado
- Testes unitários
- Testes integrados
- Swagger

### Frameworks e Ferramentas utilizadas

- Node.js
- Figma
- Swagger
- MondoDB
- mongoose
- dotenv

### 🏗️ Arquitetura da Aplicação

Nossa API segue uma arquitetura modular e organizada em camadas, separando claramente as responsabilidades de cada parte do sistema. Isso facilita a manutenção, testes e evolução do projeto.

1. Model (Modelos)
Responsáveis por definir a estrutura dos dados e as regras de validação usando o Mongoose.
Cada entidade do sistema (ex: Pilar, Categoria, Atividade) possui seu próprio arquivo de modelo.

Exemplo: 
```js
// models/Categoria.models.js
const mongoose = require('mongoose');
const CategoriaSchema = new mongoose.Schema({
  name: String,
  descricao: String,
  pilarId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pilar' }
});
module.exports = mongoose.model('Categoria', CategoriaSchema);
```

2. Service (Serviços)

- Camada intermediária entre os controllers e os models.
- Centraliza as regras de negócio e validações complexas.
- Exemplo de responsabilidades:
    - Verificar se um pilar existe antes de criar uma categoria.
    - Impedir que categorias sejam vinculadas a pilares obrigatórios.
    - Validar limites, permissões e consistência dos dados.

- Exemplo: 
```js
// services/CategoriaService.js
const Categoria = require('../models/Categoria.models.js');
const Pilar = require('../models/Pilar.models.js');
const CategoriaService = {
  createCategoria: async (data) => {
    // validações e regras de negócio
    return await Categoria.create(data);
  }
};
module.exports = CategoriaService;
```

3. Controller (Controladores)

- Responsáveis por receber as requisições HTTP, chamar os serviços e retornar as respostas.
- Não contém regras de negócio, apenas orquestra o fluxo entre requisição, serviço e resposta.
- Exemplo:
```js
// controllers/CategoriaController.js
const CategoriaService = require('../services/CategoriaService.js');
class CategoriaController {
  static async createCategoria(req, res) {
    try {
      const categoria = await CategoriaService.createCategoria(req.body);
      res.status(201).json(categoria);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
module.exports = CategoriaController;
```

--- 
## Projeto 

### Figma 

[Acesse o protótipo pelo Link](https://www.figma.com/design/hdGjqOlZ4q626yFr2fWwuJ/modo-caverna?node-id=0-1&t=clFVGGrKDN7vOCHS-1)

### Análise 

Consulte o nosso Swagger [link](http://localhost:3000/api-docs/#/)