// Importa o framework Express para criar o servidor
const express = require('express');

// Importa o driver mysql2 para conectar com o banco de dados MySQL
const mysql = require('mysql2');

// Importa o pacote CORS para permitir requisições de outros domínios (como o frontend)
const cors = require('cors');

// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Inicializa o app Express
const app = express();

// Aplica o middleware CORS (libera requisições cross-origin)
app.use(cors());

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Configura a conexão com o banco de dados MySQL usando variáveis do .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // Ex: localhost
  user: process.env.DB_USER,       // Ex: root
  password: process.env.DB_PASSWORD, // Senha do banco
  database: process.env.DB_NAME    // Nome do banco
});

// Tenta conectar ao banco de dados MySQL
db.connect(err => {
  if (err) return console.error('Erro na conexão:', err); // Se falhar, exibe erro
  console.log('Conectado ao MySQL!'); // Sucesso
});

// Importa e registra as rotas de produtos e usuários
const produtoRoutes = require('./routes/produtos');
const usuarioRoutes = require('./routes/usuarios');

// Define os prefixos das rotas da API
app.use('/produtos', produtoRoutes); // Rotas de produtos: /produtos
app.use('/usuarios', usuarioRoutes); // Rotas de usuários: /usuarios

// Define a porta em que o servidor vai rodar (usa a do .env ou padrão 3000)
const PORT = process.env.PORT || 3000;

// Inicia o servidor e exibe no console
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Exporta a conexão com o banco de dados (pode ser usada em outros arquivos)
module.exports = db;
