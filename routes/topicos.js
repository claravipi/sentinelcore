const express = require('express');
const router = express.Router();
const db = require('../database/db');
const exigirLogin = require('../middleware/auth');
const verificarAcessoLiberado = require('../middleware/acesso');
const { obterSemanaAtual, saoSemanasConsecutivas } = require('../utils/data');

router.get('/', exigirLogin, verificarAcessoLiberado, (req, res) => {
  db.all(`SELECT * FROM topicos ORDER BY ordem ASC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json(rows);
  });
});

router.get('/progresso/:usuarioId', exigirLogin, (req, res) => {
  const usuarioId = req.params.usuarioId;

  db.all(
    `SELECT topico_id, concluido, pontuacao FROM progresso_usuario WHERE usuario_id = ?`,
    [usuarioId],
    (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    }
  );
});

router.get('/streak/:usuarioId', exigirLogin, (req, res) => {
  const usuarioId = req.params.usuarioId;

  db.get(`SELECT * FROM streaks WHERE usuario_id = ?`, [usuarioId], (err, streak) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (!streak) {
      return res.json({ sequencia_atual: 0, maior_sequencia: 0 });
    }

    res.json(streak);
  });
});

router.get('/:id', exigirLogin, verificarAcessoLiberado, (req, res) => {
  const topicoId = req.params.id;

  db.get(`SELECT * FROM topicos WHERE id = ?`, [topicoId], (err, topico) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!topico) return res.status(404).json({ erro: 'Tópico não encontrado' });

    db.all(`SELECT * FROM perguntas WHERE topico_id = ?`, [topicoId], (err, perguntas) => {
      if (err) return res.status(500).json({ erro: err.message });

      const promessas = perguntas.map((pergunta) => {
        return new Promise((resolve, reject) => {
          db.all(`SELECT id, texto FROM alternativas WHERE pergunta_id = ?`, [pergunta.id], (err, alternativas) => {
            if (err) return reject(err);
            pergunta.alternativas = alternativas;
            resolve(pergunta);
          });
        });
      });

      Promise.all(promessas)
        .then((perguntasComAlternativas) => {
          topico.perguntas = perguntasComAlternativas;
          res.json(topico);
        })
        .catch((err) => res.status(500).json({ erro: err.message }));
    });
  });
});

router.post('/:id/verificar', exigirLogin, verificarAcessoLiberado, (req, res) => {
  const topicoId = req.params.id;
  const respostas = req.body.respostas;
  const usuarioId = req.body.usuarioId;

  db.all(`SELECT * FROM perguntas WHERE topico_id = ?`, [topicoId], (err, perguntas) => {
    if (err) return res.status(500).json({ erro: err.message });

    const promessas = perguntas.map((pergunta) => {
      return new Promise((resolve, reject) => {
        db.get(
          `SELECT id FROM alternativas WHERE pergunta_id = ? AND correta = 1`,
          [pergunta.id],
          (err, alternativaCorreta) => {
            if (err) return reject(err);
            const respostaUsuario = respostas[pergunta.id];
            const acertou = alternativaCorreta && Number(respostaUsuario) === alternativaCorreta.id;
            resolve({ perguntaId: pergunta.id, acertou });
          }
        );
      });
    });

    Promise.all(promessas).then((resultados) => {
      const totalAcertos = resultados.filter((r) => r.acertou).length;
      const passou = totalAcertos === resultados.length;
      const pontuacao = Math.round((totalAcertos / resultados.length) * 100);

      db.get(
        `SELECT * FROM progresso_usuario WHERE usuario_id = ? AND topico_id = ?`,
        [usuarioId, topicoId],
        (err, registroExistente) => {
          if (err) return res.status(500).json({ erro: err.message });

          if (registroExistente) {
            db.run(
              `UPDATE progresso_usuario SET concluido = ?, pontuacao = ?, concluido_em = CURRENT_TIMESTAMP WHERE id = ?`,
              [passou ? 1 : 0, pontuacao, registroExistente.id]
            );
          } else {
            db.run(
              `INSERT INTO progresso_usuario (usuario_id, topico_id, concluido, pontuacao, concluido_em) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
              [usuarioId, topicoId, passou ? 1 : 0, pontuacao]
            );
          }

          if (passou) {
            atualizarStreak(usuarioId);
          }

          res.json({
            totalPerguntas: resultados.length,
            totalAcertos,
            pontuacao,
            passou,
            resultados
          });
        }
      );
    }).catch((err) => res.status(500).json({ erro: err.message }));
  });
});

function atualizarStreak(usuarioId) {
  const semanaAtual = obterSemanaAtual();

  db.get(`SELECT * FROM streaks WHERE usuario_id = ?`, [usuarioId], (err, streak) => {
    if (err) return console.error('Erro ao buscar streak:', err.message);

    if (!streak) {
      db.run(
        `INSERT INTO streaks (usuario_id, semana_atual, sequencia_atual, maior_sequencia) VALUES (?, ?, 1, 1)`,
        [usuarioId, semanaAtual]
      );
      return;
    }

    if (streak.semana_atual === semanaAtual) {
      return;
    }

    let novaSequencia;
    if (saoSemanasConsecutivas(streak.semana_atual, semanaAtual)) {
      novaSequencia = streak.sequencia_atual + 1;
    } else {
      novaSequencia = 1;
    }

    const novoRecorde = Math.max(novaSequencia, streak.maior_sequencia);

    db.run(
      `UPDATE streaks SET semana_atual = ?, sequencia_atual = ?, maior_sequencia = ? WHERE usuario_id = ?`,
      [semanaAtual, novaSequencia, novoRecorde, usuarioId]
    );
  });
}

module.exports = router;