const express = require('express');
const router = express.Router();
const db = require('../database/db');
const verificarAcessoLiberado = require('../middleware/acesso');

const CATEGORIAS_PAGAS = ['evento', 'conteudo'];

router.get('/:categoria', (req, res) => {
  const { categoria } = req.params;

  if (CATEGORIAS_PAGAS.includes(categoria)) {
    if (!req.session.usuario) {
      return res.status(401).json({ erro: 'Você precisa estar logado para ver este conteúdo.' });
    }
    return verificarAcessoLiberado(req, res, () => buscarConteudos(req, categoria, res));
  }

  buscarConteudos(req, categoria, res);
});

router.get('/:categoria/:id', (req, res) => {
  const { categoria, id } = req.params;

  function retornarConteudo() {
    db.get(`SELECT * FROM conteudos WHERE id = ? AND categoria = ?`, [id, categoria], (err, conteudo) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!conteudo) return res.status(404).json({ erro: 'Conteúdo não encontrado.' });
      res.json(conteudo);
    });
  }

  if (CATEGORIAS_PAGAS.includes(categoria)) {
    if (!req.session.usuario) {
      return res.status(401).json({ erro: 'Você precisa estar logado para ver este conteúdo.' });
    }
    return verificarAcessoLiberado(req, res, retornarConteudo);
  }

  retornarConteudo();
});

function buscarConteudos(req, categoria, res) {
  const { mes, estado } = req.query; // ex: ?mes=09&estado=SP

  let sql = `SELECT id, titulo, resumo, imagem, data_evento, estado, link_ingresso, criado_em
             FROM conteudos WHERE categoria = ?`;
  const parametros = [categoria];

  if (categoria === 'evento') {
    // Oculta automaticamente eventos cuja data já passou; mantém os itinerantes
    // / sem data fixa (data_evento IS NULL).
    sql += ` AND (data_evento IS NULL OR data_evento >= date('now'))`;
  }

  if (mes) {
    sql += ` AND strftime('%m', data_evento) = ?`;
    parametros.push(mes.padStart(2, '0'));
  }

  if (estado) {
    sql += ` AND estado = ?`;
    parametros.push(estado);
  }

  // Eventos com data primeiro (o mais próximo no topo); os sem data fixa por último.
  sql += ` ORDER BY (data_evento IS NULL) ASC, data_evento ASC, criado_em DESC`;

  db.all(sql, parametros, (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
}

module.exports = router;