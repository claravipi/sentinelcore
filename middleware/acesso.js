const db = require('../database/db');

function verificarAcessoLiberado(req, res, next) {
  const usuario = req.session.usuario;

  if (!usuario) {
    return res.status(401).json({ erro: 'Você precisa estar logado.' });
  }

  if (usuario.tipoConta === 'empresa_admin') {
    return next();
  }

  if (usuario.tipoConta === 'funcionario') {
    db.get(`SELECT status_pagamento FROM empresas WHERE id = ?`, [usuario.empresaId], (err, empresa) => {
      if (err) return res.status(500).json({ erro: err.message });

      if (!empresa || empresa.status_pagamento !== 'pago') {
        return res.status(402).json({ erro: 'Sua empresa ainda não liberou o acesso ao treinamento.' });
      }
      next();
    });
    return;
  }

  if (usuario.tipoConta === 'individual') {
    db.get(`SELECT pago FROM usuarios WHERE id = ?`, [usuario.id], (err, dados) => {
      if (err) return res.status(500).json({ erro: err.message });

      if (!dados || dados.pago !== 1) {
        return res.status(402).json({ erro: 'Realize o pagamento único para acessar o treinamento.' });
      }
      next();
    });
    return;
  }

  return res.status(403).json({ erro: 'Tipo de conta inválido.' });
}

module.exports = verificarAcessoLiberado;