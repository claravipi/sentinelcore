const db = require('./db');

// Insere um tópico de exemplo
db.run(`
  INSERT INTO topicos (titulo, descricao, ordem, conteudo)
  VALUES (?, ?, ?, ?)
`, [
  'Phishing: Como Reconhecer',
  'Aprenda a identificar tentativas de phishing por e-mail e mensagens.',
  1,
  'Phishing é uma técnica usada por criminosos para enganar você e roubar informações...'
], function (err) {
  if (err) return console.error(err.message);

  const topicoId = this.lastID; // pega o ID do tópico recém-criado
  console.log(`Tópico criado com ID ${topicoId}`);

  // Insere uma pergunta para esse tópico
  db.run(`
    INSERT INTO perguntas (topico_id, enunciado)
    VALUES (?, ?)
  `, [topicoId, 'O que você deve fazer ao receber um e-mail suspeito pedindo sua senha?'],
  function (err) {
    if (err) return console.error(err.message);

    const perguntaId = this.lastID;
    console.log(`Pergunta criada com ID ${perguntaId}`);

    // Insere as alternativas
    const alternativas = [
      ['Clicar no link e verificar', 0],
      ['Reportar ao setor de TI e não clicar em nada', 1],
      ['Responder o e-mail com a senha', 0],
      ['Ignorar completamente', 0]
    ];

    alternativas.forEach(([texto, correta]) => {
      db.run(`
        INSERT INTO alternativas (pergunta_id, texto, correta)
        VALUES (?, ?, ?)
      `, [perguntaId, texto, correta]);
    });
  });
});

// Usuário de teste (temporário, até criarmos o login de verdade)
db.run(`
  INSERT INTO usuarios (nome, email, senha, cargo, foto, is_admin)
  VALUES (?, ?, ?, ?, ?, ?)
`, ['Usuário Teste', 'teste@sentinelcore.com', '123456', 'Analista', null, 0],
function (err) {
  if (err) return console.error(err.message);
  console.log(`Usuário de teste criado com ID ${this.lastID}`);
});