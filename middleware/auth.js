// Importa o módulo jsonwebtoken (JWT) para verificar o token
const jwt = require('jsonwebtoken');

// Middleware para autenticação de token
function autenticarToken(req, res, next) {
  // Obtém o header 'Authorization' da requisição
  const authHeader = req.headers['authorization'];
  
  // Se o header 'Authorization' existe, o token é a segunda parte após 'Bearer'
  const token = authHeader && authHeader.split(' ')[1]; // Formato esperado: 'Bearer TOKEN'

  // Se não houver token, retorna erro 401 (não autorizado)
  if (!token) return res.status(401).json({ msg: 'Token não fornecido' });

  // Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) 
      // Se houver erro ao verificar o token, retorna erro 403 (proibido)
      return res.status(403).json({ msg: 'Token inválido' });

    // Se o token for válido, armazena os dados do usuário no objeto req
    // Agora você pode acessar req.usuario.id em outras rotas
    req.usuario = usuario;

    // Chama a próxima função/middleware
    next();
  });
}

// Exporta a função para ser usada em outras partes do projeto
module.exports = autenticarToken;
