const NOMES_CATEGORIA = {
  evento: 'Eventos',
  curiosidade: 'Curiosidades',
  pesquisa: 'Pesquisas',
  premio: 'Prêmios',
  especialista: 'Especialistas',
  conteudo: 'Conteúdo'
};

const params = new URLSearchParams(window.location.search);
const categoria = params.get('categoria') || 'curiosidade';

document.querySelectorAll('.menu-categorias a').forEach((link) => {
  if (link.dataset.categoria === categoria) {
    link.classList.add('ativo');
  }
});

if (categoria === 'evento') {
  document.getElementById('filtros-evento').style.display = 'flex';
  document.getElementById('filtro-mes').addEventListener('change', carregarLista);
  document.getElementById('filtro-estado').addEventListener('change', carregarLista);
}

function formatarData(dataISO) {
  if (!dataISO) return null;
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

async function carregarLista() {
  document.getElementById('titulo-categoria').textContent = NOMES_CATEGORIA[categoria] || 'Conteúdos';

  // A categoria "Conteúdo" apresenta os tópicos de aprendizado (informações,
  // aulas, quiz e treinamento). Cada tópico abre em topico.html.
  if (categoria === 'conteudo') {
    return carregarTopicosConteudo();
  }

  let url = `/api/conteudos/${categoria}`;

  if (categoria === 'evento') {
    const mes = document.getElementById('filtro-mes').value;
    const estado = document.getElementById('filtro-estado').value;
    const queryParams = new URLSearchParams();
    if (mes) queryParams.set('mes', mes);
    if (estado) queryParams.set('estado', estado);
    if ([...queryParams].length > 0) url += `?${queryParams.toString()}`;
  }

  const resposta = await fetch(url);
  const container = document.getElementById('lista-conteudos');

  if (resposta.status === 401) {
    container.innerHTML = `
      <div class="aviso-bloqueio">
        🔒 Esta seção é exclusiva para assinantes.<br>
        <a href="login.html">Faça login</a> ou <a href="cadastro.html">cadastre-se</a> para continuar.
      </div>
    `;
    return;
  }

  if (resposta.status === 402) {
    container.innerHTML = `
      <div class="aviso-bloqueio">
        🔒 Esta seção é exclusiva para assinantes com acesso liberado.<br>
        Acesse a área de treinamento para liberar seu acesso.
      </div>
    `;
    return;
  }

  const itens = await resposta.json();

  if (itens.length === 0) {
    container.innerHTML = `<p class="vazio-funcionarios">Nenhum conteúdo encontrado para esse filtro.</p>`;
    return;
  }

  if (categoria === 'especialista') {
    container.classList.add('lista-especialistas');
    container.innerHTML = itens.map((item) => `
      <a href="conteudo-detalhe.html?categoria=${categoria}&id=${item.id}" class="card-especialista">
        <div class="card-especialista-foto">
          ${item.imagem
            ? `<img src="${item.imagem}" alt="${item.titulo}" onerror="this.parentElement.classList.add('sem-foto')">`
            : ''}
        </div>
        <div class="card-especialista-texto">
          <h3>${item.titulo}</h3>
          <p class="card-especialista-cargo">${item.resumo || ''}</p>
        </div>
      </a>
    `).join('');
    return;
  }

  if (categoria === 'evento') {
    container.classList.remove('lista-especialistas');
    container.innerHTML = itens.map((item) => `
      <div class="card-evento">
        <a href="conteudo-detalhe.html?categoria=${categoria}&id=${item.id}" class="card-evento-link">
          <h3>${item.titulo}</h3>
          <p>${item.resumo || ''}</p>
          <div class="card-evento-meta">
            ${item.data_evento ? `<span>📅 ${formatarData(item.data_evento)}</span>` : '<span>📅 Data a confirmar</span>'}
            ${item.estado ? `<span>📍 ${item.estado}</span>` : ''}
          </div>
        </a>
        ${item.link_ingresso
          ? `<a href="${item.link_ingresso}" target="_blank" rel="noopener noreferrer" class="btn-admin card-evento-btn">Comprar ingresso ↗</a>`
          : ''}
      </div>
    `).join('');
    return;
  }

  container.classList.remove('lista-especialistas');
  container.classList.toggle('lista-premios', categoria === 'premio');
  container.innerHTML = itens.map((item) => `
  <a href="conteudo-detalhe.html?categoria=${categoria}&id=${item.id}" class="card-conteudo">
    ${item.imagem ? `<img src="${item.imagem}" alt="${item.titulo}" class="card-conteudo-imagem">` : ''}
    <h3>${item.titulo}</h3>
    <p>${item.resumo || ''}</p>
  </a>
`).join('');
}

async function carregarTopicosConteudo() {
  const container = document.getElementById('lista-conteudos');

  let resposta;
  try {
    resposta = await fetch('/api/topicos');
  } catch (erro) {
    container.innerHTML = `<p class="vazio-funcionarios">Não foi possível carregar os tópicos agora.</p>`;
    return;
  }

  if (resposta.status === 401) {
    container.innerHTML = `
      <div class="aviso-bloqueio">
        🔒 Esta seção é exclusiva para assinantes.<br>
        <a href="login.html">Faça login</a> ou <a href="cadastro.html">cadastre-se</a> para continuar.
      </div>`;
    return;
  }

  if (resposta.status === 402) {
    container.innerHTML = `
      <div class="aviso-bloqueio">
        🔒 Esta seção é exclusiva para assinantes com acesso liberado.<br>
        <a href="treinamento.html">Acesse a área de treinamento</a> para liberar seu acesso.
      </div>`;
    return;
  }

  const topicos = await resposta.json();

  if (!Array.isArray(topicos) || topicos.length === 0) {
    container.innerHTML = `<p class="vazio-funcionarios">Nenhum tópico disponível no momento.</p>`;
    return;
  }

  container.classList.add('lista-topicos-conteudo');
  container.innerHTML = `
    <p class="conteudo-intro">Escolha um tópico para acessar informações, aulas, quiz e treinamento sobre o assunto.</p>
    <div class="topicos-grade">
      ${topicos.map((topico) => `
        <a href="topico.html?id=${topico.id}" class="topico-conteudo-item">
          <h3>${topico.titulo}</h3>
          ${topico.descricao ? `<p>${topico.descricao}</p>` : ''}
        </a>
      `).join('')}
    </div>
  `;
}

carregarLista();