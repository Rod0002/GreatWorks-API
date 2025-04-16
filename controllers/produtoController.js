// Importa a conexão com o banco de dados MySQL, que foi configurada em '../models/db'
const db = require('../models/db');

// ===============================
// ROTA: GET /produtos
// Descrição: Lista todos os produtos cadastrados no banco de dados
// ===============================
exports.listar = (req, res) => {
  // Consulta SQL que seleciona os campos desejados da tabela de produtos
  const query = `
    SELECT id_produto, ds_categoria, nm_produto, ds_marca, vl_preco, qtd_disponivel, ds_medida, img_produto 
    FROM tb_produto
  `;

  // Executa a query no banco
  db.query(query, (err, results) => {
    if (err) 
      // Se houver erro na consulta, retorna erro 500 (erro interno do servidor)
      return res.status(500).json({ erro: err });

    // Se a consulta for bem-sucedida, retorna os resultados em formato JSON
    res.json(results);
  });
};

// ===============================
// ROTA: POST /produtos
// Descrição: Cadastra um novo produto no banco de dados
// ===============================
exports.criar = (req, res) => {
  // Desestrutura os campos enviados no corpo da requisição
  const { ds_categoria, nm_produto, ds_marca, vl_preco, qtd_disponivel, ds_medida, img_produto } = req.body;

  // Query SQL com placeholders (?) para evitar SQL Injection
  const query = `
    INSERT INTO tb_produto 
    (ds_categoria, nm_produto, ds_marca, vl_preco, qtd_disponivel, ds_medida, img_produto)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  // Executa a inserção no banco com os dados enviados no body
  db.query(
    query,
    [ds_categoria, nm_produto, ds_marca, vl_preco, qtd_disponivel, ds_medida, img_produto],
    (err, result) => {
      if (err) 
        // Se der erro ao inserir, retorna status 500
        return res.status(500).json({ erro: err });

      // Retorna o ID gerado e os dados enviados no body com status 201 (criado)
      res.status(201).json({ id_produto: result.insertId, ...req.body });
    }
  );
};
