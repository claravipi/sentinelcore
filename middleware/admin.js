function exigirAdmin(req, res, next) {
  if (!req.session.usuario) {
    return res.status(401).json({ erro: 'Você precisa estar logado.' });
  }
  if (req.session.usuario.tipoConta !== 'empresa_admin') {
    return res.status(403).json({ erro: 'Acesso restrito a administradores de empresa.' });
  }
  next();
}

module.exports = exigirAdmin;