let USUARIO_ID = null;

async function carregarTopicos() {
  try {
    const respMe = await fetch('/api/auth/me');
    if (!respMe.ok) {
      window.location.href = 'login.html';
      return;
    }
    const usuario = await respMe.json();
    USUARIO_ID = usuario.id;

    document.getElementById('usuario-info').innerHTML = `
      Olá, ${usuario.nome} (${usuario.cargo})
      <button id="btn-sair">Sair</button>
    `;
    document.getElementById('btn-sair').addEventListener('click', async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = 'login.html';
    });

    const respTopicosCheck = await fetch('/api/topicos');

    if (respTopicosCheck.status === 402) {
      exibirTelaBloqueio(usuario);
      return;
    }

    const [respTopicos, respProgresso, respStreak] = await Promise.all([
      Promise.resolve(respTopicosCheck), // reaproveita a resposta que já buscamos
      fetch(`/api/topicos/progresso/${USUARIO_ID}`),
      fetch(`/api/topicos/streak/${USUARIO_ID}`)
    ]);

    const topicos = await respTopicos.json();
    const progresso = await respProgresso.json();
    const streak = await respStreak.json();

    const streakDiv = document.getElementById('streak-info');
    if (streak.sequencia_atual > 0) {
      streakDiv.innerHTML = `🔥 ${streak.sequencia_atual} semana(s) seguida(s) (recorde: ${streak.maior_sequencia})`;
    } else {
      streakDiv.innerHTML = `<span class="sem-streak">Complete um tópico para iniciar sua sequência 🔥</span>`;
    }

    const mapaProgresso = {};
    progresso.forEach((p) => {
      mapaProgresso[p.topico_id] = p.concluido;
    });

    const container = document.getElementById('lista-topicos');
    container.innerHTML = '';

    topicos.forEach((topico, index) => {
      const anterior = topicos[index - 1];
      const anteriorConcluido = !anterior || mapaProgresso[anterior.id] === 1;
      const estaConcluido = mapaProgresso[topico.id] === 1;
      const estaBloqueado = !anteriorConcluido && !estaConcluido;

      const card = document.createElement('div');
      card.className = 'card-topico' + (estaBloqueado ? ' bloqueado' : '');

      card.innerHTML = `
        <h3>${topico.ordem}. ${topico.titulo} ${estaConcluido ? '✅' : estaBloqueado ? '🔒' : ''}</h3>
        <p>${topico.descricao}</p>
      `;

      if (!estaBloqueado) {
        card.addEventListener('click', () => {
          window.location.href = `topico.html?id=${topico.id}`;
        });
      }

      container.appendChild(card);
    });

  } catch (erro) {
    console.error('Erro ao carregar tópicos:', erro);
  }
}

function exibirTelaBloqueio(usuario) {
  const container = document.getElementById('lista-topicos');

  if (usuario.tipoConta === 'individual') {
    container.innerHTML = `
      <div class="bloqueio-pagamento">
        <h3>🔒 Libere seu acesso completo</h3>
        <p>Pague uma única vez e tenha acesso a todos os tópicos, quizzes e conteúdos de cibersegurança.</p>
        <button id="btn-pagar-individual" class="btn-admin">Pagar Acesso Único (dev: simulado)</button>
        <p id="mensagem-pagamento"></p>
      </div>
    `;

    document.getElementById('btn-pagar-individual').addEventListener('click', async () => {
      const resposta = await fetch('/api/pagamento/simular-individual', { method: 'POST' });
      const resultado = await resposta.json();

      if (resultado.sucesso) {
        document.getElementById('mensagem-pagamento').innerHTML = '<span class="correto">✅ Pagamento confirmado! Recarregando...</span>';
        setTimeout(() => window.location.reload(), 1200);
      } else {
        document.getElementById('mensagem-pagamento').innerHTML = '<span class="incorreto">Erro ao processar pagamento.</span>';
      }
    });

  } else if (usuario.tipoConta === 'funcionario') {
    container.innerHTML = `
      <div class="bloqueio-pagamento">
        <h3>🔒 Aguardando liberação da empresa</h3>
        <p>Sua empresa ainda não liberou o acesso ao treinamento. Fale com o administrador responsável.</p>
      </div>
    `;
  }
}

carregarTopicos();