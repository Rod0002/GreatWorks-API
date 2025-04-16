// Importa o módulo 'mysql2', que permite conectar e interagir com bancos de dados MySQL
const mysql = require('mysql2');

// Carrega variáveis de ambiente do arquivo .env (como DB_HOST, DB_USER, etc.)
require('dotenv').config();

// Cria uma conexão com o banco de dados usando os dados das variáveis de ambiente
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // Endereço do servidor MySQL (ex: 'localhost')
  user: process.env.DB_USER,       // Nome do usuário do banco (ex: 'root')
  password: process.env.DB_PASSWORD, // Senha do banco
  database: process.env.DB_NAME    // Nome do banco de dados (ex: 'greatworks')
});

// Conecta ao banco e mostra no terminal se houve sucesso ou erro
db.connect(err => {
  if (err) 
    console.error('Erro na conexão:', err); // Exibe erro, se ocorrer
  else 
    console.log('Conectado ao MySQL!');     // Mensagem de sucesso
});

// Exporta a conexão para ser usada em outras partes do projeto (ex: controllers)
module.exports = db;
