const db = require('./db');

// Retorna a próxima ocorrência (>= hoje) de um evento anual, no formato YYYY-MM-DD.
// Assim, quando a data de uma edição passa, o evento é automaticamente projetado
// para a próxima edição do ano seguinte.
function proximaData(mes, dia) {
  const agora = new Date();
  const hoje = new Date(Date.UTC(agora.getFullYear(), agora.getMonth(), agora.getDate()));
  const ano = hoje.getUTCFullYear();
  let data = new Date(Date.UTC(ano, mes - 1, dia));
  if (data < hoje) data = new Date(Date.UTC(ano + 1, mes - 1, dia));
  const p = (n) => String(n).padStart(2, '0');
  return `${data.getUTCFullYear()}-${p(data.getUTCMonth() + 1)}-${p(data.getUTCDate())}`;
}

// Definição dos eventos.
//  - Eventos anuais usam { mes, dia }: a data é sempre recalculada para a próxima
//    ocorrência futura (as datas exatas variam a cada edição — o corpo orienta a
//    confirmar no site oficial).
//  - Eventos itinerantes / sem data fixa usam mes/dia ausentes -> data_evento null
//    ("Data a confirmar"), permanecendo sempre visíveis.
const definicoes = [
  {
    titulo: 'Roadsec',
    estado: 'BR',
    link_ingresso: 'https://www.roadsec.com.br/',
    resumo: 'O maior festival hacker itinerante da América Latina, com edições em diversas cidades brasileiras ao longo do ano.',
    corpo: `
      <p>O Roadsec é um festival itinerante de tecnologia e hacking que percorre diversas cidades do Brasil ao longo do ano, encerrando com uma mega edição de dois dias em São Paulo. É considerado o maior evento do gênero na América Latina, reunindo estudantes, profissionais e entusiastas de segurança da informação.</p>

      <h3>O que esperar</h3>
      <ul>
        <li>Palestras sobre ataque, defesa, hardware, dados e carreira em segurança</li>
        <li>Competição Hackaflag, um dos maiores campeonatos de CTF (Capture The Flag) da América Latina</li>
        <li>Vilas temáticas de OSINT, Mobile, AppSec e Hardware, com atividades práticas (hands-on)</li>
        <li>Feira de recrutamento com oportunidades para quem está entrando no mercado de segurança</li>
      </ul>

      <p>Por ser itinerante, cada cidade tem sua própria data ao longo do ano. Consulte o site oficial para ver a agenda completa de cidades e datas.</p>
    `
  },
  {
    titulo: 'Mind The Sec',
    mes: 9, dia: 15,
    estado: 'SP',
    link_ingresso: 'https://www.mindthesec.com.br/',
    resumo: 'Realizado anualmente em setembro, no Transamérica Expo Center (São Paulo) — o maior congresso de cibersegurança do Hemisfério Sul.',
    corpo: `
      <p>O Mind The Sec é considerado o maior congresso e feira de negócios de cibersegurança do Hemisfério Sul, reunindo lideranças, executivos e especialistas do setor para discutir tendências, riscos e inovações.</p>

      <h3>O que esperar</h3>
      <p>Centenas de horas de conteúdo, palestrantes nacionais e internacionais, e discussões sobre arquitetura de segurança, cloud, inteligência artificial aplicada à defesa digital, proteção de dados e gestão de riscos corporativos.</p>

      <p><strong>Local:</strong> Transamérica Expo Center, São Paulo (SP). As datas variam a cada edição — confirme no site oficial.</p>
    `
  },
  {
    titulo: 'H2HC — Hackers to Hackers Conference',
    estado: 'SP',
    link_ingresso: 'https://www.h2hc.com.br/',
    resumo: 'Uma das conferências técnicas de segurança ofensiva mais tradicionais da América Latina, realizada anualmente em São Paulo.',
    corpo: `
      <p>A H2HC (Hackers to Hackers Conference) é organizada por pesquisadores e profissionais diretamente envolvidos com pesquisa e desenvolvimento em segurança da informação. É uma das conferências mais tradicionais e tecnicamente aprofundadas da América Latina, voltada especialmente para quem já atua ou pesquisa na área.</p>

      <h3>O que esperar</h3>
      <ul>
        <li>Palestras técnicas apresentadas por pesquisadores do mercado corporativo e da comunidade independente</li>
        <li>Demonstrações de técnicas de ataque e vulnerabilidades inéditas, voltadas a um público avançado</li>
        <li>Treinamentos práticos ministrados por especialistas renomados</li>
      </ul>

      <p>Historicamente realizada em São Paulo, geralmente no segundo semestre do ano. Consulte o site oficial para confirmar a data exata da próxima edição.</p>
    `
  },
  {
    titulo: 'CryptoRave',
    mes: 5, dia: 8,
    estado: 'SP',
    link_ingresso: 'https://cryptorave.org/',
    resumo: 'Realizada geralmente em maio, na Biblioteca Mário de Andrade (São Paulo) — um dos maiores eventos gratuitos de segurança e privacidade do mundo.',
    corpo: `
      <p>A CryptoRave é um evento gratuito, aberto e colaborativo sobre segurança, criptografia, hacking, anonimato e privacidade na internet. Iniciada em 2014 como reação a revelações sobre vigilância em massa por parte de governos e corporações, se tornou uma referência para pesquisadores, ativistas e curiosos do tema.</p>

      <h3>O que esperar</h3>
      <p>Oficinas práticas sobre ferramentas de comunicação segura, palestras, rodas de conversa e debates sobre direitos digitais. O evento não recebe patrocínio de empresas privadas, sendo financiado majoritariamente por financiamento coletivo.</p>

      <p><strong>Local:</strong> Biblioteca Mário de Andrade, São Paulo (SP) — entrada gratuita. As datas variam a cada edição — confirme no site oficial.</p>
    `
  },
  {
    titulo: 'RSA Conference',
    mes: 4, dia: 27,
    estado: 'INT',
    link_ingresso: 'https://www.rsaconference.com/',
    resumo: 'Realizada anualmente em San Francisco (EUA) — uma das maiores e mais influentes conferências de cibersegurança do mundo.',
    corpo: `
      <p>A RSA Conference é uma das maiores e mais influentes conferências de cibersegurança do mundo, realizada anualmente em San Francisco (EUA). Reúne dezenas de milhares de profissionais, executivos, pesquisadores e fornecedores de tecnologia de todo o planeta.</p>

      <h3>O que esperar</h3>
      <ul>
        <li>Centenas de palestras e keynotes sobre as principais tendências de segurança</li>
        <li>Uma das maiores feiras de tecnologia de segurança do mundo, com centenas de expositores</li>
        <li>O Innovation Sandbox, competição que revela as startups mais promissoras do setor</li>
      </ul>

      <p>Realizada geralmente entre o fim de abril e o início de maio. Confirme as datas exatas no site oficial.</p>
    `
  },
  {
    titulo: 'Black Hat USA',
    mes: 8, dia: 2,
    estado: 'INT',
    link_ingresso: 'https://www.blackhat.com/',
    resumo: 'Em Las Vegas (EUA) — uma das conferências de segurança mais influentes do mundo, conhecida pela pesquisa técnica de ponta.',
    corpo: `
      <p>A Black Hat USA é uma das conferências de segurança da informação mais respeitadas do mundo, realizada anualmente em Las Vegas (EUA). É conhecida por apresentar pesquisas técnicas inéditas e por reunir profissionais de ponta do setor.</p>

      <h3>O que esperar</h3>
      <ul>
        <li>Briefings: apresentações técnicas com descobertas e vulnerabilidades inéditas</li>
        <li>Trainings: treinamentos intensivos ministrados por especialistas</li>
        <li>Arsenal: demonstrações ao vivo de ferramentas de segurança de código aberto</li>
      </ul>

      <p>Realizada geralmente no início de agosto, imediatamente antes da DEF CON. Confirme as datas no site oficial.</p>
    `
  },
  {
    titulo: 'DEF CON',
    mes: 8, dia: 6,
    estado: 'INT',
    link_ingresso: 'https://defcon.org/',
    resumo: 'Em Las Vegas (EUA) — uma das maiores e mais tradicionais convenções hacker do mundo, logo após a Black Hat.',
    corpo: `
      <p>A DEF CON é uma das maiores e mais tradicionais convenções hacker do mundo, realizada em Las Vegas (EUA) desde 1993. Tem um perfil comunitário e informal, acontecendo logo após a Black Hat.</p>

      <h3>O que esperar</h3>
      <ul>
        <li>Villages temáticas (hardware, lockpicking, IoT, carros, votação eletrônica e muito mais)</li>
        <li>Competições lendárias, como o Capture the Flag (CTF), que premia os vencedores com o cobiçado Black Badge</li>
        <li>Palestras, workshops e a cultura única da comunidade de segurança</li>
      </ul>

      <p>Realizada geralmente no início ou meados de agosto. Confirme as datas no site oficial.</p>
    `
  },
  {
    titulo: 'Black Hat Europe',
    mes: 12, dia: 8,
    estado: 'INT',
    link_ingresso: 'https://www.blackhat.com/',
    resumo: 'A edição europeia da Black Hat, realizada em Londres (Reino Unido), geralmente em dezembro.',
    corpo: `
      <p>A Black Hat Europe é a edição europeia da tradicional conferência Black Hat, realizada em Londres (Reino Unido). Traz para a Europa o mesmo padrão de pesquisa técnica e treinamentos de alto nível da edição americana.</p>

      <h3>O que esperar</h3>
      <ul>
        <li>Briefings com pesquisas de segurança apresentadas por especialistas internacionais</li>
        <li>Trainings práticos e o Arsenal, com demonstrações de ferramentas</li>
        <li>Business Hall com fornecedores e oportunidades de networking</li>
      </ul>

      <p>Realizada geralmente em dezembro. Confirme as datas no site oficial.</p>
    `
  },
  {
    titulo: 'Ekoparty',
    mes: 11, dia: 12,
    estado: 'INT',
    link_ingresso: 'https://www.ekoparty.org/',
    resumo: 'Em Buenos Aires (Argentina) — uma das maiores conferências de segurança de perfil técnico e comunitário da América Latina.',
    corpo: `
      <p>A Ekoparty é uma das maiores e mais importantes conferências de segurança da informação da América Latina, realizada em Buenos Aires (Argentina). Tem forte perfil técnico e comunitário, reunindo pesquisadores de todo o continente.</p>

      <h3>O que esperar</h3>
      <ul>
        <li>Palestras técnicas, workshops e treinamentos</li>
        <li>Competições de CTF e desafios práticos de hacking</li>
        <li>Villages e atividades hands-on para todos os níveis</li>
      </ul>

      <p>Realizada geralmente em novembro. Confirme as datas no site oficial.</p>
    `
  }
];

// Monta a lista final, calculando a data futura de cada evento anual.
function listaEventos() {
  return definicoes.map((e) => ({
    titulo: e.titulo,
    resumo: e.resumo,
    corpo: e.corpo,
    data_evento: e.mes ? proximaData(e.mes, e.dia) : null,
    estado: e.estado,
    link_ingresso: e.link_ingresso
  }));
}

// Recria a lista de eventos no banco (remove os antigos e insere os atuais, já
// com as datas projetadas para a próxima ocorrência futura).
function atualizarEventos(callback) {
  db.serialize(() => {
    db.run(`DELETE FROM conteudos WHERE categoria = 'evento'`, (err) => {
      if (err) {
        console.error('Erro ao limpar eventos antigos:', err.message);
        if (callback) callback(err);
        return;
      }

      const eventos = listaEventos();
      const stmt = db.prepare(
        `INSERT INTO conteudos (categoria, titulo, resumo, corpo, data_evento, estado, link_ingresso)
         VALUES ('evento', ?, ?, ?, ?, ?, ?)`
      );

      eventos.forEach((ev) => {
        stmt.run([ev.titulo, ev.resumo, ev.corpo, ev.data_evento, ev.estado, ev.link_ingresso]);
      });

      stmt.finalize((err) => {
        if (err) console.error('Erro ao inserir eventos:', err.message);
        else console.log(`✅ Eventos atualizados: ${eventos.length} eventos carregados (datas projetadas para a próxima edição).`);
        if (callback) callback(err);
      });
    });
  });
}

module.exports = { listaEventos, atualizarEventos, proximaData };
