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
  const { email, senha } = req.body;

  const query = 'SELECT * FROM tb_usuario WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    const usuario = results[0];

    bcrypt.compare(senha, usuario.senha, (err, match) => {
      if (!match) return res.status(401).json({ erro: 'Senha incorreta' });

      const token = jwt.sign({ id: usuario.id_usuario, email: usuario.email }, JWT_SECRET, {
        expiresIn: '2h',
      });

      // 🔥 Aqui está o retorno com nome e id!
      res.json({
        msg: 'Login realizado',
        token,
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email
      });
    });
  });
};
