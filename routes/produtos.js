// Importa o módulo Express para criar rotas
const express = require('express');

// Cria um "roteador" que vai gerenciar os endpoints relacionados aos produtos
const router = express.Router();

// Importa o controlador que contém as funções de lógica dos produtos (listar, criar, etc.)
const produtoController = require('../controllers/produtoController.js');

// Importa o middleware de autenticação que valida o token JWT (ainda não utilizado nas rotas abaixo)
const autenticarToken = require('../middleware/auth.js');

// Rota GET /produtos
// Lista todos os produtos disponíveis no banco de dados
router.get('/', produtoController.listar);

// Rota POST /produtos
// Cadastra um novo produto no banco de dados
router.post('/', produtoController.criar);

// Exporta o roteador para ser usado no arquivo principal (index.js)
module.exports = router;
