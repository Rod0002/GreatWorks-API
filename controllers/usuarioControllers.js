// Importa o módulo de conexão com o banco de dados
const db = require('../models/db');

// Importa o módulo bcryptjs para encriptação de senhas
const bcrypt = require('bcryptjs');

// Importa o módulo jsonwebtoken (JWT) para criação de tokens
const jwt = require('jsonwebtoken');

// Definindo a chave secreta para JWT. O ideal é colocar isso em um arquivo .env
const JWT_SECRET = process.env.JWT_SECRET || 'segredo123'; // Coloque isso no .env depois

// ===============================
// FUNÇÃO: Registrar um novo usuário
// ===============================
exports.registrar = (req, res) => {
  // Desestrutura os dados recebidos no corpo da requisição (nome, email, senha)
  const { nome, email, senha } = req.body;

  // Encripta a senha recebida usando bcrypt
  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) 
      // Se houver erro na encriptação, retorna erro 500 (erro interno do servidor)
      return res.status(500).json({ erro: err });

    // Query SQL para inserir o novo usuário no banco de dados
    const query = 'INSERT INTO tb_usuario (nome, email, senha) VALUES (?, ?, ?)';

    // Executa a query para inserir o novo usuário
    db.query(query, [nome, email, hash], (err, result) => {
      if (err) 
        // Se o email já existe ou houver outro erro na inserção, retorna erro 500
        return res.status(500).json({ erro: 'Email já existe ou erro ao inserir' });

      // Retorna mensagem de sucesso com status 201 (criado)
      res.status(201).json({ msg: 'Usuário registrado com sucesso!' });
    });
  });
};

// ===============================
// FUNÇÃO: Login do usuário
// ===============================
exports.login = (req, res) => {
  // Desestrutura os dados recebidos no corpo da requisição (email e senha)
  const { email, senha } = req.body;

  // Query SQL para buscar o usuário no banco de dados pelo email
  const query = 'SELECT * FROM tb_usuario WHERE email = ?';

  // Executa a query para procurar o usuário
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      // Se não encontrar o usuário ou houver erro, retorna erro 401 (não autorizado)
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    // Se o usuário for encontrado, armazena a primeira linha do resultado
    const usuario = results[0];

    // Compara a senha recebida com a senha armazenada no banco (encriptada)
    bcrypt.compare(senha, usuario.senha, (err, match) => {
      if (!match) 
        // Se as senhas não coincidirem, retorna erro 401 (não autorizado)
        return res.status(401).json({ erro: 'Senha incorreta' });

      // Se a senha for correta, cria um token JWT
      const token = jwt.sign({ id: usuario.id_usuario, email: usuario.email }, JWT_SECRET, {
        expiresIn: '2h', // O token expira em 2 horas
      });

      // Retorna mensagem de sucesso com o token JWT gerado
      res.json({ msg: 'Login realizado', token });
    });
  });
};
