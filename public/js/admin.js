let empresaAtual = null;

async function carregarPainel() {
  const respMe = await fetch('/api/auth/me');
  if (!respMe.ok) {
    window.location.href = 'login.html';
    return;
  }
  const usuario = await respMe.json();

  document.getElementById('usuario-info').innerHTML = `
    Olá, ${usuario.nome}
    <button id="btn-sair">Sair</button>
  `;
  document.getElementById('btn-sair').addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = 'login.html';
  });

  const respEmpresa = await fetch('/api/admin/empresa');
  empresaAtual = await respEmpresa.json();

  renderizarPagamento();
  renderizarCodigo();
  carregarFuncionarios();
}

function renderizarPagamento() {
  const secao = document.getElementById('secao-pagamento');

  if (empresaAtual.status_pagamento === 'pago') {
    secao.innerHTML = `
      <h2>Status da Assinatura</h2>
      <p class="status-pago">✅ Pagamento confirmado. Acesso liberado para sua empresa.</p>
    `;
  } else {
    secao.innerHTML = `
      <h2>Status da Assinatura</h2>
      <p class="status-pendente">⏳ Pagamento pendente. Libere o acesso da sua empresa para começar.</p>
      <button id="btn-pagar" class="btn-admin">Simular Pagamento (dev)</button>
    `;
    document.getElementById('btn-pagar').addEventListener('click', async () => {
      await fetch('/api/admin/simular-pagamento', { method: 'POST' });
      const respEmpresa = await fetch('/api/admin/empresa');
      empresaAtual = await respEmpresa.json();
      renderizarPagamento();
      renderizarCodigo();
    });
  }
}

function renderizarCodigo() {
  const secao = document.getElementById('secao-codigo');

  if (empresaAtual.status_pagamento !== 'pago') {
    secao.innerHTML = `
      <h2>Código de Convite</h2>
      <p class="vazio-funcionarios">Disponível após a confirmação do pagamento.</p>
    `;
    return;
  }

  const codigoExistente = empresaAtual.codigo_convite
    ? `<div class="codigo-gerado">${empresaAtual.codigo_convite}</div>
       <p class="vazio-funcionarios">Expira em: ${new Date(empresaAtual.codigo_expira_em).toLocaleDateString('pt-BR')} · Limite: ${empresaAtual.limite_funcionarios} funcionários</p>`
    : '';

  secao.innerHTML = `
    <h2>Código de Convite</h2>
    ${codigoExistente}
    <div class="form-codigo">
      <div>
        <label>Vagas</label>
        <input type="number" id="input-limite" value="${empresaAtual.limite_funcionarios || 10}" min="1">
      </div>
      <div>
        <label>Validade (dias)</label>
        <input type="number" id="input-dias" value="30" min="1">
      </div>
      <button id="btn-gerar-codigo" class="btn-admin">Gerar novo código</button>
    </div>
  `;

  document.getElementById('btn-gerar-codigo').addEventListener('click', async () => {
    const limiteFuncionarios = document.getElementById('input-limite').value;
    const diasValidade = document.getElementById('input-dias').value;

    const resposta = await fetch('/api/admin/gerar-codigo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ limiteFuncionarios, diasValidade })
    });

    const resultado = await resposta.json();
    if (resultado.sucesso) {
      const respEmpresa = await fetch('/api/admin/empresa');
      empresaAtual = await respEmpresa.json();
      renderizarCodigo();
    }
  });
}

async function carregarFuncionarios() {
  const respTotalTopicos = await fetch('/api/admin/total-topicos');
  const { total: totalTopicos } = await respTotalTopicos.json();

  const respFuncionarios = await fetch('/api/admin/funcionarios');
  const funcionarios = await respFuncionarios.json();

  const container = document.getElementById('lista-funcionarios');

  if (funcionarios.length === 0) {
    container.innerHTML = `<p class="vazio-funcionarios">Nenhum funcionário cadastrado ainda. Compartilhe o código de convite.</p>`;
    return;
  }

  let linhas = '';
  funcionarios.forEach((f) => {
    const percentual = totalTopicos > 0 ? Math.round((f.topicos_concluidos / totalTopicos) * 100) : 0;
    linhas += `
      <tr>
        <td>${f.nome}</td>
        <td>${f.cargo}</td>
        <td>${f.topicos_concluidos}/${totalTopicos} (${percentual}%)</td>
        <td>🔥 ${f.streak_atual}</td>
      </tr>
    `;
  });

  container.innerHTML = `
    <table>
      <thead>
        <tr><th>Nome</th><th>Cargo</th><th>Progresso</th><th>Streak</th></tr>
      </thead>
      <tbody>${linhas}</tbody>
    </table>
  `;
}

carregarPainel();