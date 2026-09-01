const express = require('express');
const router = express.Router();
const db = require('../database/db');
const exigirAdmin = require('../middleware/admin');

router.get('/empresa', exigirAdmin, (req, res) => {
  const empresaId = req.session.usuario.empresaId;

  db.get(`SELECT * FROM empresas WHERE id = ?`, [empresaId], (err, empresa) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!empresa) return res.status(404).json({ erro: 'Empresa não encontrada.' });
    res.json(empresa);
  });
});

router.get('/funcionarios', exigirAdmin, (req, res) => {
  const empresaId = req.session.usuario.empresaId;

  db.all(
    `SELECT id, nome, email, cargo, foto, criado_em FROM usuarios WHERE empresa_id = ? AND tipo_conta = 'funcionario'`,
    [empresaId],
    (err, usuarios) => {
      if (err) return res.status(500).json({ erro: err.message });

      const promessas = usuarios.map((usuario) => {
        return new Promise((resolve, reject) => {
          db.get(
            `SELECT COUNT(*) as total_concluidos FROM progresso_usuario WHERE usuario_id = ? AND concluido = 1`,
            [usuario.id],
            (err, resultadoProgresso) => {
              if (err) return reject(err);

              db.get(
                `SELECT sequencia_atual FROM streaks WHERE usuario_id = ?`,
                [usuario.id],
                (err, resultadoStreak) => {
                  if (err) return reject(err);

                  resolve({
                    ...usuario,
                    topicos_concluidos: resultadoProgresso.total_concluidos,
                    streak_atual: resultadoStreak ? resultadoStreak.sequencia_atual : 0
                  });
                }
              );
            }
          );
        });
      });

      Promise.all(promessas)
        .then((funcionarios) => res.json(funcionarios))
        .catch((err) => res.status(500).json({ erro: err.message }));
    }
  );
});

router.get('/total-topicos', exigirAdmin, (req, res) => {
  db.get(`SELECT COUNT(*) as total FROM topicos`, [], (err, resultado) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ total: resultado.total });
  });
});

// Rota: POST /api/admin/simular-pagamento -> marca a empresa como paga (temporário, até termos gateway real)
router.post('/simular-pagamento', exigirAdmin, (req, res) => {
  const empresaId = req.session.usuario.empresaId;

  db.run(
    `UPDATE empresas SET status_pagamento = 'pago' WHERE id = ?`,
    [empresaId],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ sucesso: true });
    }
  );
});

router.post('/gerar-codigo', exigirAdmin, (req, res) => {
  const empresaId = req.session.usuario.empresaId;
  const { limiteFuncionarios, diasValidade } = req.body;

  const codigo = 'SC-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const dataExpiracao = new Date();
  dataExpiracao.setDate(dataExpiracao.getDate() + Number(diasValidade || 30));

  db.run(
    `UPDATE empresas SET codigo_convite = ?, codigo_expira_em = ?, limite_funcionarios = ? WHERE id = ?`,
    [codigo, dataExpiracao.toISOString(), Number(limiteFuncionarios || 10), empresaId],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ sucesso: true, codigo, expiraEm: dataExpiracao });
    }
  );
});

module.exports = router;