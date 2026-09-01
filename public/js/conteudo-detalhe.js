const params = new URLSearchParams(window.location.search);
const categoria = params.get('categoria');
const id = params.get('id');

document.getElementById('link-voltar').href = `conteudo-lista.html?categoria=${categoria}`;

async function carregarDetalhe() {
  const resposta = await fetch(`/api/conteudos/${categoria}/${id}`);
  const container = document.getElementById('conteudo-detalhe');

  if (resposta.status === 401 || resposta.status === 402) {
    container.innerHTML = `
      <div class="aviso-bloqueio">
        🔒 Este conteúdo é exclusivo para assinantes.<br>
        <a href="login.html">Faça login</a> para continuar.
      </div>
    `;
    return;
  }

  if (!resposta.ok) {
    container.innerHTML = `<p>Conteúdo não encontrado.</p>`;
    return;
  }

  const item = await resposta.json();
  const data = new Date(item.criado_em).toLocaleDateString('pt-BR');

  const fotoHtml = (categoria === 'especialista' && item.imagem)
    ? `<img src="${item.imagem}" alt="${item.titulo}" class="foto-detalhe-especialista">`
    : '';

  container.innerHTML = `
    ${fotoHtml}
    <h2>${item.titulo}</h2>
    <p class="data-publicacao">Publicado em ${data}</p>
    <div class="corpo-texto">${item.corpo}</div>
  `;
} 

carregarDetalhe();