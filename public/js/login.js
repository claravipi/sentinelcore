document.getElementById('form-login').addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const email = evento.target.email.value;
  const senha = evento.target.senha.value;

  const mensagem = document.getElementById('mensagem-login');
  mensagem.textContent = 'Entrando...';
  mensagem.className = '';

  try {
    const resposta = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
  mensagem.textContent = 'Login realizado! Redirecionando...';
  mensagem.className = 'correto';

  const destino = resultado.usuario.tipoConta === 'empresa_admin' ? 'admin.html' : 'treinamento.html';

  setTimeout(() => {
    window.location.href = destino;
  }, 1000);
}
    else {
      mensagem.textContent = resultado.erro || 'Erro ao entrar.';
      mensagem.className = 'incorreto';
    }
  } catch (erro) {
    mensagem.textContent = 'Erro de conexão com o servidor.';
    mensagem.className = 'incorreto';
  }
});