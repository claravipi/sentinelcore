// Middleware que verifica se o usuário está logado antes de deixar passar
function exigirLogin(req, res, next) {
  if (!req.session.usuario) {
    return res.status(401).json({ erro: 'Você precisa estar logado.' });
  }
  next(); // deixa a requisição continuar para a rota de verdade
}

module.exports = exigirLogin;