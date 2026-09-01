const db = require('./db');

const conteudos = [
  {
    categoria: 'evento',
    titulo: 'RSA Conference: o maior evento de cibersegurança do mundo',
    resumo: 'Realizada anualmente em São Francisco, reúne milhares de profissionais e empresas do setor.',
    corpo: 'A RSA Conference acontece todos os anos em São Francisco, nos Estados Unidos, e é considerada um dos maiores e mais influentes eventos de cibersegurança do mundo. Reúne pesquisadores, empresas, governos e profissionais da área para discutir tendências, apresentar novas tecnologias de proteção e debater os principais desafios do setor. Empresas de todos os portes costumam usar o evento para lançar produtos e firmar parcerias estratégicas.'
  },
  {
    categoria: 'evento',
    titulo: 'DEF CON: a maior convenção de hackers do mundo',
    resumo: 'Criada em 1993, é um dos encontros mais tradicionais da comunidade de segurança ofensiva.',
    corpo: 'A DEF CON é uma das convenções de hackers mais antigas e conhecidas do mundo, realizada anualmente em Las Vegas desde 1993. O evento reúne pesquisadores de segurança, hackers éticos e curiosos para competições de hacking (CTFs), palestras técnicas e demonstrações de vulnerabilidades em sistemas, dispositivos e até infraestruturas físicas. É um ambiente valorizado tanto pela comunidade acadêmica quanto por grandes empresas de tecnologia.'
  },

  {
    categoria: 'curiosidade',
    titulo: 'O termo "vírus de computador" surgiu antes da internet',
    resumo: 'O conceito já existia décadas antes da web como conhecemos hoje.',
    corpo: 'O termo "vírus de computador" foi popularizado nos anos 1980, mas o conceito de um programa capaz de se autorreplicar já era discutido academicamente desde os anos 1940 e 1950, muito antes da internet existir como a conhecemos. Um dos primeiros vírus a se espalhar de forma expressiva foi o "Brain", criado em 1986 no Paquistão, que infectava disquetes.'
  },
  {
    categoria: 'curiosidade',
    titulo: 'Nem todo hacker é criminoso',
    resumo: 'O termo hacker, na origem, não tinha relação nenhuma com crime.',
    corpo: 'Originalmente, o termo "hacker" era usado para descrever pessoas extremamente habilidosas em programação e sistemas, capazes de encontrar soluções criativas para problemas complexos — sem qualquer conotação criminosa. Hoje, o mercado costuma diferenciar "hackers éticos" (também chamados de white hat, que atuam legalmente testando a segurança de sistemas) dos "hackers maliciosos" (black hat), que exploram vulnerabilidades para prejudicar terceiros.'
  },

  {
    categoria: 'pesquisa',
    titulo: 'Treinamento constante reduz cliques em phishing simulado',
    resumo: 'Estudos do setor mostram queda expressiva na taxa de erro após treinamentos recorrentes.',
    corpo: 'Diversos estudos e relatórios do setor de cibersegurança corporativa mostram que empresas que aplicam treinamentos de conscientização de forma recorrente (e não apenas uma única vez) apresentam redução significativa na taxa de cliques em simulações de phishing ao longo do tempo. Isso reforça a lógica por trás de plataformas de treinamento contínuo, como a proposta deste próprio produto.'
  },

  {
    categoria: 'premio',
    titulo: 'Pwnie Awards: o "Oscar" da comunidade de segurança ofensiva',
    resumo: 'Prêmio anual e bem-humorado que reconhece (e também "zoa") destaques da cibersegurança.',
    corpo: 'O Pwnie Awards é uma premiação anual, criada por pesquisadores de segurança, que reconhece tanto conquistas técnicas notáveis (como a descoberta de vulnerabilidades críticas) quanto falhas embaraçosas cometidas por empresas e desenvolvedores. É entregue durante a Black Hat, outro evento tradicional do setor, e é conhecido pelo tom bem-humorado e irreverente das categorias.'
  },
  {
    categoria: 'premio',
    titulo: 'RSA Conference Innovation Sandbox',
    resumo: 'Competição que elege as startups mais inovadoras do setor de cibersegurança a cada ano.',
    corpo: 'Durante a RSA Conference, acontece o "Innovation Sandbox", uma competição em que startups emergentes de cibersegurança apresentam suas soluções para uma banca de investidores e especialistas renomados. É considerado um dos principais termômetros de quais tecnologias e abordagens devem ganhar força no mercado nos anos seguintes.'
  },

  {
    categoria: 'especialista',
    titulo: 'Quem foi Bruce Schneier',
    resumo: 'Criptógrafo e escritor, uma das vozes mais respeitadas sobre segurança digital e privacidade.',
    corpo: 'Bruce Schneier é um renomado criptógrafo, pesquisador e escritor norte-americano, conhecido por seus livros e artigos sobre segurança da informação, privacidade e criptografia aplicada. Autor de obras influentes no setor, é frequentemente citado como referência em discussões sobre políticas públicas de segurança digital e proteção de dados.'
  },

  {
    categoria: 'conteudo',
    titulo: 'Engenharia social: o elo mais explorado em ataques cibernéticos',
    resumo: 'Entenda como criminosos manipulam pessoas, não sistemas, para conseguir acesso indevido.',
    corpo: 'Engenharia social é o conjunto de técnicas usadas por criminosos para manipular psicologicamente uma pessoa e fazê-la agir contra seus próprios interesses de segurança — como revelar uma senha, clicar em um link malicioso ou liberar acesso físico a um ambiente restrito. Diferente de um ataque puramente técnico, a engenharia social explora emoções humanas como urgência, medo, curiosidade e vontade de ajudar. Exemplos comuns incluem e-mails de phishing que simulam comunicados urgentes da diretoria, ligações se passando por suporte técnico, e até visitas presenciais de alguém se fazendo passar por um prestador de serviço. A defesa mais eficaz contra esse tipo de ataque não é tecnológica, e sim comportamental: treinar continuamente os colaboradores para reconhecer padrões suspeitos e sempre confirmar solicitações incomuns por um canal oficial, antes de agir.'
  },
  {
    categoria: 'conteudo',
    titulo: 'Ransomware: como funciona e por que empresas são alvos frequentes',
    resumo: 'Um panorama completo sobre um dos tipos de ataque mais destrutivos da atualidade.',
    corpo: 'Ransomware é um tipo de software malicioso que sequestra os dados de uma vítima, criptografando arquivos e tornando-os inacessíveis, até que um resgate seja pago — geralmente em criptomoedas, para dificultar o rastreamento. Empresas costumam ser alvos preferenciais porque tendem a pagar rapidamente para retomar operações críticas, o que torna o ataque financeiramente atrativo para os criminosos. A infecção geralmente começa através de um e-mail de phishing, um anexo malicioso ou uma vulnerabilidade não corrigida em algum sistema. Boas práticas de prevenção incluem: manter backups atualizados e desconectados da rede principal, aplicar atualizações de segurança regularmente, restringir permissões de acesso ao mínimo necessário, e treinar continuamente os colaboradores para não abrirem anexos ou links suspeitos.'
  },
  {
    categoria: 'conteudo',
    titulo: 'Autenticação em duas etapas: por que uma senha forte não é suficiente',
    resumo: 'Entenda por que essa camada extra de proteção se tornou essencial no ambiente corporativo.',
    corpo: 'Mesmo senhas consideradas fortes podem ser comprometidas por vazamentos de dados, ataques de força bruta ou engenharia social. A autenticação em duas etapas (2FA) adiciona uma segunda camada de verificação — geralmente um código temporário enviado por aplicativo, SMS ou gerado por um dispositivo físico — que precisa ser fornecida além da senha para completar o login. Dessa forma, mesmo que a senha de um usuário seja descoberta por um criminoso, o acesso ainda seria bloqueado sem essa segunda confirmação. Por esse motivo, empresas de todos os portes têm adotado o 2FA como exigência mínima de segurança para sistemas críticos, e-mails corporativos e ferramentas de acesso remoto.'
  }
];

let inseridos = 0;

conteudos.forEach((c) => {
  db.run(
    `INSERT INTO conteudos (categoria, titulo, resumo, corpo) VALUES (?, ?, ?, ?)`,
    [c.categoria, c.titulo, c.resumo, c.corpo],
    function (err) {
      if (err) return console.error(err.message);
      inseridos++;
      console.log(`Conteúdo "${c.titulo}" inserido com ID ${this.lastID}`);
      if (inseridos === conteudos.length) {
        console.log(`Todos os ${conteudos.length} conteúdos foram inseridos.`);
      }
    }
  );
});