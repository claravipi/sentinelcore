  const descricoes = {
  empresa_admin: 'Preencha os dados da sua empresa e do administrador responsável.',
  funcionario: 'Preencha seus dados e o código de convite fornecido pela sua empresa.',
  individual: 'Preencha seus dados para criar sua conta individual.'
};

const etapaEscolha = document.getElementById('etapa-escolha');
const etapaFormulario = document.getElementById('etapa-formulario');
const cardsTipo = document.querySelectorAll('.card-tipo');
const campoEmpresa = document.getElementById('campo-empresa');
const campoFuncionario = document.getElementById('campo-funcionario');
const inputTipoConta = document.getElementById('tipoConta');
const descricaoTipo = document.getElementById('descricao-tipo');
const btnVoltar = document.getElementById('btn-voltar');

cardsTipo.forEach((card) => {
  card.addEventListener('click', () => {
    const tipo = card.dataset.tipo;
    inputTipoConta.value = tipo;
    descricaoTipo.textContent = descricoes[tipo];

    campoEmpresa.style.display = tipo === 'empresa_admin' ? 'block' : 'none';
    campoFuncionario.style.display = tipo === 'funcionario' ? 'block' : 'none';

    etapaEscolha.style.display = 'none';
    etapaFormulario.style.display = 'block';
  });
});

btnVoltar.addEventListener('click', () => {
  etapaFormulario.style.display = 'none';
  etapaEscolha.style.display = 'block';
});

document.getElementById('form-cadastro').addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const form = evento.target;
  const dadosFormulario = new FormData(form);

  const mensagem = document.getElementById('mensagem-cadastro');
  mensagem.textContent = 'Enviando...';
  mensagem.className = '';

  try {
    const resposta = await fetch('/api/auth/cadastro', {
      method: 'POST',
      body: dadosFormulario
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      mensagem.textContent = 'Cadastro realizado com sucesso! Redirecionando...';
      mensagem.className = 'correto';
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } else {
      mensagem.textContent = resultado.erro || 'Erro ao cadastrar.';
      mensagem.className = 'incorreto';
    }
  } catch (erro) {
    mensagem.textContent = 'Erro de conexão com o servidor.';
    mensagem.className = 'incorreto';
  }
});