// database/seedConteudos.js
const db = require('./db');

const conteudos = [
  {
    categoria: 'curiosidade',
    titulo: 'A primeira senha de computador já foi roubada em 1962',
    resumo: 'Um dos primeiros casos documentados de roubo de credenciais aconteceu ainda na década de 60.',
    corpo: 'Em 1962, no MIT, um pesquisador chamado Allan Scherr precisava de mais tempo de uso no computador CTSS. Ele descobriu como imprimir o arquivo que guardava as senhas de todos os usuários e passou a usar as credenciais alheias para conseguir mais horas de acesso — um dos primeiros casos documentados de roubo de senha da história da computação.'
  },
  {
    categoria: 'especialista',
    titulo: 'Quem foi Kevin Mitnick',
    resumo: 'Um dos hackers mais famosos do mundo, hoje reconhecido como referência em segurança da informação.',
    corpo: 'Kevin Mitnick foi um dos hackers mais procurados pelo FBI nos anos 90, condenado por invadir sistemas de grandes empresas de telecomunicações. Após cumprir pena, se tornou consultor de segurança, autor de livros sobre engenharia social e uma das vozes mais respeitadas da área até seu falecimento em 2023.'
  },
  {
    categoria: 'pesquisa',
    titulo: 'Phishing continua sendo o vetor de ataque mais comum',
    resumo: 'Estudos do setor apontam que a maioria dos incidentes de segurança ainda começa com um clique humano.',
    corpo: 'Diversos relatórios anuais do setor de cibersegurança apontam que phishing continua sendo a porta de entrada mais comum para ataques corporativos, superando falhas técnicas de sistema. Isso reforça a importância de treinar pessoas, não apenas proteger máquinas.'
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
        console.log('Todos os conteúdos de teste foram inseridos.');
      }
    }
  );
});