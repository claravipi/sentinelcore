const params = new URLSearchParams(window.location.search);
const topicoId = params.get('id');

let perguntasCarregadas = []; // guardamos aqui para usar depois
let usuarioLogado = null;

async function carregarTopico() {
  // Confirma que está logado
  const respMe = await fetch('/api/auth/me');
  if (!respMe.ok) {
    window.location.href = 'login.html';
    return;
  }
  usuarioLogado = await respMe.json();

  const resposta = await fetch(`/api/topicos/${topicoId}`);
  const topico = await resposta.json();

  // Exibe título e conteúdo (aulas). O conteúdo é HTML e é renderizado como tal.
  document.getElementById('conteudo-topico').innerHTML = `
    <h2>${topico.titulo}</h2>
    <div class="topico-aulas">${topico.conteudo || ''}</div>
  `;

  perguntasCarregadas = topico.perguntas;

  // Exibe as perguntas com suas alternativas
  const container = document.getElementById('perguntas-container');
  container.innerHTML = '';

  topico.perguntas.forEach((pergunta, index) => {
    const divPergunta = document.createElement('div');
    divPergunta.className = 'pergunta';

    let alternativasHtml = '';
    pergunta.alternativas.forEach((alt) => {
      alternativasHtml += `
        <label class="alternativa">
          <input type="radio" name="pergunta-${pergunta.id}" value="${alt.id}">
          ${alt.texto}
        </label>
      `;
    });

    divPergunta.innerHTML = `
      <p class="enunciado">${index + 1}. ${pergunta.enunciado}</p>
      ${alternativasHtml}
    `;

    container.appendChild(divPergunta);
  });
}

// Quando clicar em "Enviar Respostas"
document.getElementById('btn-enviar').addEventListener('click', async () => {
  const respostas = {};

  // Para cada pergunta, pega a alternativa marcada (selecionada)
  perguntasCarregadas.forEach((pergunta) => {
    const marcada = document.querySelector(`input[name="pergunta-${pergunta.id}"]:checked`);
    if (marcada) {
      respostas[pergunta.id] = marcada.value;
    }
  });

  const resposta = await fetch(`/api/topicos/${topicoId}/verificar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ respostas, usuarioId: usuarioLogado.id })
  });

  const resultado = await resposta.json();
  const divResultado = document.getElementById('resultado-quiz');

  if (resultado.passou) {
    divResultado.innerHTML = `<p class="correto">✅ Parabéns! Você acertou ${resultado.totalAcertos}/${resultado.totalPerguntas} e pode avançar.</p>`;
  } else {
    divResultado.innerHTML = `<p class="incorreto">❌ Você acertou ${resultado.totalAcertos}/${resultado.totalPerguntas}. Revise o conteúdo e tente novamente.</p>`;
  }
});

carregarTopico();