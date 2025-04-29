// Importa o módulo Express
const express = require('express');

// Cria um novo roteador do Express para agrupar as rotas de usuário
const router = express.Router();

// Importa o controller que contém a lógica para registro e login de usuários
const usuarioController = require('../controllers/usuarioController.js');

// Rota POST /register
// Registra um novo usuário no sistema (recebe nome, email e senha)
router.post('/register', usuarioController.registrar);

// Rota POST /login
// Realiza o login do usuário e retorna um token JWT se as credenciais estiverem corretas
router.post('/login', usuarioController.login);

// Exporta o roteador para ser usado no app principal (index.js)
module.exports = router;
