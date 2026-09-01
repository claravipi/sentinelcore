// ============================================================================
//  NOTÍCIAS EM DESTAQUE  —  "Mais notícias sobre segurança"
// ----------------------------------------------------------------------------
//  Para ADICIONAR uma notícia, basta acrescentar um objeto ao array abaixo,
//  seguindo o modelo. Campos:
//    imagem    -> URL da miniatura (ex.: 'uploads/minha-noticia.png'). Opcional.
//    titulo    -> título da notícia. (obrigatório)
//    data      -> ex.: '25 de agosto de 2026'. Opcional.
//    categoria -> ex.: 'Phishing / Segurança Empresarial'. Opcional.
//    fonte     -> ex.: 'The Hacker News' (mostrada com ícone de globo). Opcional.
//    tags      -> lista de etiquetas, ex.: ['Vulnerabilidades', 'IA']. Opcional.
//    resumo    -> breve descrição. Opcional.
//    link      -> URL da matéria completa (abre em nova aba). Opcional.
//
//  Os itens abaixo são apenas EXEMPLOS de layout — substitua-os pelas notícias
//  reais. Se você esvaziar o array, a seção mostra um aviso de "em breve".
// ============================================================================

// Miniatura de exemplo (gradiente + ícone). Substitua por imagens reais nas notícias.
function miniaturaExemplo(cor1, cor2) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'>`
    + `<defs><linearGradient id='ng' x1='0' y1='0' x2='1' y2='1'>`
    + `<stop offset='0' stop-color='${cor1}'/><stop offset='1' stop-color='${cor2}'/></linearGradient></defs>`
    + `<rect width='400' height='225' fill='url(#ng)'/>`
    + `<g fill='none' stroke='#ffffff' stroke-width='7' stroke-linecap='round' stroke-linejoin='round' opacity='0.9'>`
    + `<rect x='150' y='78' width='100' height='74' rx='8'/>`
    + `<circle cx='176' cy='104' r='9'/>`
    + `<path d='M150 138 l26 -24 20 16 24 -22 30 30'/></g></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

const noticiasDestaque = [
  {
    imagem: miniaturaExemplo('#1f6feb', '#0d419d'),
    titulo: 'Exemplo de notícia em destaque — substitua por uma notícia real',
    data: '25 de agosto de 2026',
    categoria: 'Segurança / Vulnerabilidades',
    tags: ['Inteligência artificial', 'Vulnerabilidades'],
    resumo: 'Escreva aqui um resumo breve da notícia. Este item é apenas um modelo de layout — edite ou remova em js/noticias-destaque.js.',
    link: ''
  },
  {
    imagem: miniaturaExemplo('#3fb950', '#1a7f37'),
    titulo: 'Outro exemplo — grande empresa corrige falha crítica',
    data: '25 de agosto de 2026',
    categoria: 'Autenticação / Segurança de Senhas',
    tags: ['Empresas', 'Correção'],
    resumo: 'Modelo de item mostrando como uma notícia sobre uma grande empresa ou correção de falha apareceria nesta lista.',
    link: ''
  },
  {
    imagem: miniaturaExemplo('#a371f7', '#6e40c9'),
    titulo: 'Exemplo com fonte — nova onda de ataques atinge o setor',
    fonte: 'Fonte da notícia',
    tags: ['Ataques', 'Phishing'],
    resumo: 'Quando a notícia não tem data, você pode informar a fonte: ela aparece com um ícone de globo, como neste exemplo.',
    link: ''
  }
];

const ICONE_CALENDARIO = `<svg class="ndm-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`;
const ICONE_GLOBO = `<svg class="ndm-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18"/></svg>`;

function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function montarNoticia(noticia) {
  const tag = noticia.link ? 'a' : 'article';
  const attrsLink = noticia.link
    ? ` href="${escapar(noticia.link)}" target="_blank" rel="noopener noreferrer"`
    : '';

  const miniatura = noticia.imagem
    ? `<img class="noticia-destaque-thumb" src="${escapar(noticia.imagem)}" alt="${escapar(noticia.titulo)}">`
    : '';

  const partesMeta = [];
  if (noticia.data) {
    partesMeta.push(`<span>${ICONE_CALENDARIO}${escapar(noticia.data)}</span>`);
  } else if (noticia.fonte) {
    partesMeta.push(`<span>${ICONE_GLOBO}${escapar(noticia.fonte)}</span>`);
  }
  if (noticia.categoria) {
    partesMeta.push(`<span>${escapar(noticia.categoria)}</span>`);
  }
  const meta = partesMeta.length
    ? `<div class="noticia-destaque-meta">${partesMeta.join('<span class="ndm-sep">•</span>')}</div>`
    : '';

  const tags = (noticia.tags && noticia.tags.length)
    ? `<div class="noticia-destaque-tags">${noticia.tags.map((t) => `<span class="noticia-destaque-tag">${escapar(t)}</span>`).join('')}</div>`
    : '';

  const resumo = noticia.resumo
    ? `<p class="noticia-destaque-resumo">${escapar(noticia.resumo)}</p>`
    : '';

  return `
    <${tag} class="noticia-destaque-item"${attrsLink}>
      ${miniatura}
      <div class="noticia-destaque-conteudo">
        <h3 class="noticia-destaque-titulo">${escapar(noticia.titulo)}</h3>
        ${meta}
        ${tags}
        ${resumo}
      </div>
    </${tag}>
  `;
}

function carregarNoticiasDestaque() {
  const container = document.getElementById('lista-noticias-destaque');
  if (!container) return;

  if (!noticiasDestaque.length) {
    container.innerHTML = `<div class="noticias-destaque-vazio">Em breve — espaço reservado para as notícias mais importantes de cibersegurança.</div>`;
    return;
  }

  container.innerHTML = noticiasDestaque.map(montarNoticia).join('');
}

carregarNoticiasDestaque();
