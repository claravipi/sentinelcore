const express = require('express');
const router = express.Router();

const PALAVRAS_CHAVE = [
  'cybersecurity',
  'cyber security',
  'hacker',
  'hacking',
  'data breach',
  'cyberattack',
  'ransomware',
  'phishing',
  'malware'
];

router.get('/', async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const termosBusca = PALAVRAS_CHAVE.map((termo) => `"${termo}"`).join(' OR ');

    const url = `https://newsapi.org/v2/everything?qInTitle=${encodeURIComponent(termosBusca)}&sortBy=publishedAt&pageSize=15&apiKey=${apiKey}`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.status !== 'ok') {
      return res.status(500).json({ erro: 'Erro ao buscar notícias.' });
    }

    const noticias = dados.articles
      .filter((artigo) => {
        if (!artigo.title || !artigo.urlToImage) return false;

        const tituloMinusculo = artigo.title.toLowerCase();
        return PALAVRAS_CHAVE.some((palavra) => tituloMinusculo.includes(palavra.toLowerCase()));
      })
      .map((artigo) => ({
        titulo: artigo.title,
        descricao: artigo.description,
        url: artigo.url,
        imagem: artigo.urlToImage,
        fonte: artigo.source.name,
        publicadoEm: artigo.publishedAt
      }));

    res.json(noticias);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

module.exports = router;