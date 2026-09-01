async function verificarLogin() {
  const area = document.getElementById('area-usuario');
  try {
    const resposta = await fetch('/api/auth/me');
    if (resposta.ok) {
      const usuario = await resposta.json();
      area.innerHTML = `<a href="treinamento.html" class="btn-entrar">Olá, ${usuario.nome} →</a>`;
    } else {
      area.innerHTML = `<a href="login.html" class="btn-entrar">Entrar</a>`;
    }
  } catch (erro) {
    area.innerHTML = `<a href="login.html" class="btn-entrar">Entrar</a>`;
  }
}

// Gera uma ilustração SVG (data-URI) para cada dica, no lugar do antigo emoji.
function ilustracaoDica(id, cor1, cor2, interno) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='220' viewBox='0 0 400 220'>`
    + `<defs><linearGradient id='g${id}' x1='0' y1='0' x2='1' y2='1'>`
    + `<stop offset='0' stop-color='${cor1}'/><stop offset='1' stop-color='${cor2}'/></linearGradient></defs>`
    + `<rect width='400' height='220' fill='url(#g${id})'/>`
    + `<circle cx='58' cy='44' r='72' fill='#fff' opacity='0.07'/>`
    + `<circle cx='350' cy='188' r='90' fill='#fff' opacity='0.06'/>`
    + interno + `</svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

// Senhas fortes -> cadeado
const iluSenhas = ilustracaoDica('s', '#4c9bff', '#1f6feb', `
  <path d='M172 92 v-12 a28 28 0 0 1 56 0 v12' fill='none' stroke='#fff' stroke-width='13' stroke-linecap='round'/>
  <rect x='156' y='92' width='88' height='72' rx='14' fill='#fff'/>
  <circle cx='200' cy='122' r='10' fill='#1f6feb'/>
  <rect x='196' y='125' width='8' height='22' rx='3' fill='#1f6feb'/>
`);

// Desconfie de e-mails -> envelope + alerta
const iluEmails = ilustracaoDica('e', '#f0a35e', '#d9772e', `
  <rect x='112' y='72' width='176' height='112' rx='12' fill='#fff'/>
  <path d='M120 84 L200 132 L280 84' fill='none' stroke='#d9772e' stroke-width='8' stroke-linejoin='round' stroke-linecap='round'/>
  <circle cx='270' cy='160' r='30' fill='#d9772e'/>
  <circle cx='270' cy='160' r='30' fill='none' stroke='#fff' stroke-width='4'/>
  <rect x='266' y='146' width='8' height='18' rx='4' fill='#fff'/>
  <circle cx='270' cy='172' r='4.5' fill='#fff'/>
`);

// Autenticação em duas etapas -> escudo com check + celular
const iluDoisFatores = ilustracaoDica('d', '#56d364', '#2ea043', `
  <rect x='236' y='84' width='58' height='100' rx='12' fill='#fff'/>
  <rect x='244' y='96' width='42' height='66' rx='4' fill='#2ea043'/>
  <circle cx='265' cy='174' r='4.5' fill='#2ea043'/>
  <path d='M256 128 l8 8 l16 -18' fill='none' stroke='#fff' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/>
  <path d='M158 54 L214 74 V116 C214 148 188 164 158 176 C128 164 102 148 102 116 V74 Z' fill='#fff'/>
  <path d='M136 116 l16 16 l30 -34' fill='none' stroke='#2ea043' stroke-width='12' stroke-linecap='round' stroke-linejoin='round'/>
`);

// Backups regulares -> nuvem + seta circular
const iluBackups = ilustracaoDica('b', '#b892ff', '#8957e5', `
  <g fill='#fff'>
    <circle cx='168' cy='118' r='28'/>
    <circle cx='208' cy='104' r='38'/>
    <circle cx='250' cy='120' r='27'/>
    <rect x='166' y='120' width='86' height='34' rx='17'/>
  </g>
  <g fill='none' stroke='#8957e5' stroke-width='7' stroke-linecap='round'>
    <path d='M226 120 a20 20 0 1 1 -6 -14'/>
  </g>
  <path d='M228 100 l-4 16 l-14 -8 z' fill='#8957e5'/>
`);

const dicas = [
  { cor: '88, 166, 255', imagem: iluSenhas, titulo: 'Senhas fortes', texto: 'Use ao menos 12 caracteres, misturando letras, números e símbolos.' },
  { cor: '240, 136, 62', imagem: iluEmails, titulo: 'Desconfie de e-mails', texto: 'Nunca clique em links de remetentes desconhecidos ou suspeitos.' },
  { cor: '63, 185, 80', imagem: iluDoisFatores, titulo: 'Autenticação em duas etapas', texto: 'Ative sempre que possível — é uma camada extra de proteção.' },
  { cor: '163, 113, 247', imagem: iluBackups, titulo: 'Backups regulares', texto: 'Mantenha cópias de segurança dos seus arquivos importantes.' }
];

function carregarDicas() {
  const container = document.getElementById('lista-dicas');
  container.innerHTML = '';

  dicas.forEach((dica) => {
    const card = document.createElement('div');
    card.className = 'card-dica';
    card.style.setProperty('--accent', dica.cor);
    card.innerHTML = `
      <div class="card-dica-media">
        <img class="card-dica-img" src="${dica.imagem}" alt="" aria-hidden="true">
      </div>
      <div class="card-dica-corpo">
        <h4>${dica.titulo}</h4>
        <p>${dica.texto}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

verificarLogin();
carregarDicas();