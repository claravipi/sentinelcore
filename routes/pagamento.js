const express = require('express');
const router = express.Router();
const db = require('../database/db');
const exigirLogin = require('../middleware/auth');

router.post('/simular-individual', exigirLogin, (req, res) => {
  const usuario = req.session.usuario;

  if (usuario.tipoConta !== 'individual') {
    return res.status(400).json({ erro: 'Esta ação é apenas para contas individuais.' });
  }

  db.run(`UPDATE usuarios SET pago = 1 WHERE id = ?`, [usuario.id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });

    req.session.usuario.pago = true;

    res.json({ sucesso: true });
  });
});

module.exports = router;