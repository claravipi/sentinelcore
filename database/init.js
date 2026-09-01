const db = require('./db');

db.run(`
  CREATE TABLE IF NOT EXISTS empresas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    status_pagamento TEXT NOT NULL DEFAULT 'pendente',
    codigo_convite TEXT UNIQUE,
    codigo_expira_em DATETIME,
    limite_funcionarios INTEGER DEFAULT 0,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela empresas:', err.message);
  else console.log('Tabela "empresas" pronta.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    cargo TEXT NOT NULL,
    foto TEXT,
    is_admin INTEGER DEFAULT 0,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Erro ao criar tabela usuarios:', err.message);
  } else {
    console.log('Tabela "usuarios" pronta.');
  }

  db.all(`PRAGMA table_info(usuarios)`, [], (err, colunas) => {
    if (err) return console.error('Erro ao verificar colunas:', err.message);

    const nomesColunas = colunas.map((c) => c.name);

    if (!nomesColunas.includes('empresa_id')) {
      db.run(`ALTER TABLE usuarios ADD COLUMN empresa_id INTEGER REFERENCES empresas(id)`, (err) => {
        if (err) console.error('Erro ao adicionar empresa_id:', err.message);
        else console.log('Coluna "empresa_id" adicionada.');
      });
    }

    if (!nomesColunas.includes('tipo_conta')) {
      db.run(`ALTER TABLE usuarios ADD COLUMN tipo_conta TEXT DEFAULT 'individual'`, (err) => {
        if (err) console.error('Erro ao adicionar tipo_conta:', err.message);
        else console.log('Coluna "tipo_conta" adicionada.');
      });
    }

    if (!nomesColunas.includes('pago')) {
      db.run(`ALTER TABLE usuarios ADD COLUMN pago INTEGER DEFAULT 0`, (err) => {
        if (err) console.error('Erro ao adicionar pago:', err.message);
        else console.log('Coluna "pago" adicionada.');
      });
    }
  });
});

db.run(`
  CREATE TABLE IF NOT EXISTS topicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT,
    ordem INTEGER NOT NULL,
    conteudo TEXT
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela topicos:', err.message);
  else console.log('Tabela "topicos" pronta.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS perguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topico_id INTEGER NOT NULL,
    enunciado TEXT NOT NULL,
    FOREIGN KEY (topico_id) REFERENCES topicos(id)
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela perguntas:', err.message);
  else console.log('Tabela "perguntas" pronta.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS alternativas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pergunta_id INTEGER NOT NULL,
    texto TEXT NOT NULL,
    correta INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (pergunta_id) REFERENCES perguntas(id)
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela alternativas:', err.message);
  else console.log('Tabela "alternativas" pronta.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS progresso_usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    topico_id INTEGER NOT NULL,
    concluido INTEGER DEFAULT 0,
    pontuacao INTEGER,
    concluido_em DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (topico_id) REFERENCES topicos(id)
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela progresso_usuario:', err.message);
  else console.log('Tabela "progresso_usuario" pronta.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS streaks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL UNIQUE,
    semana_atual TEXT,
    sequencia_atual INTEGER DEFAULT 0,
    maior_sequencia INTEGER DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela streaks:', err.message);
  else console.log('Tabela "streaks" pronta.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS conteudos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT NOT NULL,
    titulo TEXT NOT NULL,
    resumo TEXT,
    corpo TEXT NOT NULL,
    imagem TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error('Erro ao criar tabela conteudos:', err.message);
  else console.log('Tabela "conteudos" pronta.');
});

db.all(`PRAGMA table_info(conteudos)`, [], (err, colunas) => {
  if (err) return console.error('Erro ao verificar colunas de conteudos:', err.message);

  const nomesColunas = colunas.map((c) => c.name);

  if (!nomesColunas.includes('data_evento')) {
    db.run(`ALTER TABLE conteudos ADD COLUMN data_evento TEXT`, (err) => {
      if (err) console.error('Erro ao adicionar data_evento:', err.message);
      else console.log('Coluna "data_evento" adicionada.');
    });
  }

  if (!nomesColunas.includes('estado')) {
    db.run(`ALTER TABLE conteudos ADD COLUMN estado TEXT`, (err) => {
      if (err) console.error('Erro ao adicionar estado:', err.message);
      else console.log('Coluna "estado" adicionada.');
    });
  }

  if (!nomesColunas.includes('link_ingresso')) {
    db.run(`ALTER TABLE conteudos ADD COLUMN link_ingresso TEXT`, (err) => {
      if (err) console.error('Erro ao adicionar link_ingresso:', err.message);
      else console.log('Coluna "link_ingresso" adicionada.');
    });
  }
});