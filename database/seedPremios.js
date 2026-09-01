const db = require('./db');
const fs = require('fs');
const path = require('path');

// Cada prêmio recebe uma LOGO/FOTO real (ou, quando não existe imagem oficial com
// licença compatível, um wordmark tipográfico da marca). As imagens ficam em
// database/assets/premios/ e são embutidas como data-URI (base64) dentro de um
// card SVG 400x240, garantindo enquadramento consistente e mantendo tudo
// auto-contido (sem depender de arquivos externos em runtime).
//
// Fontes das imagens:
//  - turing.jpg              -> Retrato de Alan Turing (1951) — Domínio Público (Wikimedia)
//  - rsa-conference.png      -> Logo do RSA Conference — Domínio Público (Wikimedia)
//  - hall-of-fame.png        -> Logo oficial do National Cyber Security Hall of Fame
//                               (cybersecurityhalloffame.org) — marca de terceiros (uso editorial)
//  - eff.png                 -> Logo da Electronic Frontier Foundation (2018) — Domínio Público (Wikimedia)
//  - internet-hall-of-fame.png -> Logo do Internet Hall of Fame — Domínio Público (Wikimedia)
//  - Pwnie / Pwn2Own / DEF CON / SC Awards -> wordmark tipográfico (sem logo em imagem
//                               com licença compatível).

const ASSETS = path.join(__dirname, 'assets', 'premios');
const FUNDO = '#161b22';

function embutir(arquivo) {
  const buf = fs.readFileSync(path.join(ASSETS, arquivo));
  const ext = path.extname(arquivo).slice(1).toLowerCase();
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;
  return `data:${mime};base64,${buf.toString('base64')}`;
}

// Card base: fundo do tema + placa branca arredondada.
function card(interno) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240">
    <rect width="400" height="240" fill="${FUNDO}"/>
    <defs><clipPath id="plate"><rect x="18" y="20" width="364" height="200" rx="16"/></clipPath></defs>
    <rect x="18" y="20" width="364" height="200" rx="16" fill="#ffffff"/>
    ${interno}
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Foto que preenche a placa (cover), alinhada ao topo e recortada nos cantos.
function foto(arquivo) {
  return card(`<image href="${embutir(arquivo)}" x="18" y="20" width="364" height="200"
    preserveAspectRatio="xMidYMin slice" clip-path="url(#plate)"/>`);
}

// Logo contida na placa branca com respiro (contain).
function logo(arquivo) {
  return card(`<image href="${embutir(arquivo)}" x="42" y="48" width="316" height="144"
    preserveAspectRatio="xMidYMid meet"/>`);
}

// Wordmark tipográfico (para marcas cuja identidade é textual).
function wordmark(linhas) {
  const t = linhas.map((l) =>
    `<text x="200" y="${l.y}" font-size="${l.size}" font-weight="${l.weight || 400}" fill="${l.fill}" letter-spacing="${l.spacing || 0}">${l.text}</text>`
  ).join('');
  return card(`<g font-family="'Segoe UI',Arial,sans-serif" text-anchor="middle">${t}</g>`);
}

const premios = [
  {
    titulo: 'Turing Award',
    resumo: 'Conhecido como o "Prêmio Nobel da Computação", é a maior honraria da área e já reconheceu vários dos criadores da criptografia moderna.',
    corpo: `
      <p>O ACM A.M. Turing Award é concedido anualmente pela Association for Computing Machinery (ACM) desde 1966 e é amplamente considerado a mais alta distinção da ciência da computação — o equivalente a um Prêmio Nobel na área. Leva o nome de Alan Turing, matemático britânico tido como o pai da computação teórica e da inteligência artificial, que durante a Segunda Guerra Mundial ajudou a quebrar a cifra alemã Enigma em Bletchley Park.</p>
      <p>Desde 2014, o prêmio é acompanhado de US$ 1 milhão, financiado pela Google. O primeiro laureado foi Alan Perlis, em 1966, por contribuições às técnicas de construção de compiladores.</p>
      <p>Vários vencedores moldaram diretamente a segurança digital moderna: Whitfield Diffie e Martin Hellman (2015) pela criptografia de chave pública; Ronald Rivest, Adi Shamir e Leonard Adleman (2002) pelo algoritmo RSA; e Shafi Goldwasser e Silvio Micali (2012) pelas provas de conhecimento zero e pelos fundamentos da criptografia moderna.</p>
      <p>Processado em 1952 por sua homossexualidade — então crime no Reino Unido — Turing morreu em 1954 e recebeu um perdão real póstumo em 2013. Hoje, dá nome ao prêmio que celebra as maiores conquistas da computação.</p>
      <p><strong>Criado em:</strong> 1966 · <strong>Concedido por:</strong> ACM · <strong>Prêmio:</strong> US$ 1 milhão</p>
    `,
    imagem: foto('turing.jpg')
  },
  {
    titulo: 'Pwnie Awards',
    resumo: 'O "Oscar" bem-humorado da segurança ofensiva: premia tanto as melhores pesquisas quanto os fracassos mais vergonhosos do ano, na Black Hat.',
    corpo: `
      <p>Criado em 2007 por pesquisadores de segurança, o Pwnie Awards é uma premiação anual, satírica e muito aguardada, entregue durante a Black Hat USA, em Las Vegas. O nome é um trocadilho: pronuncia-se como "pony" (pônei) e ecoa os Tony Awards do teatro — e o troféu é, literalmente, um My Little Pony pintado de dourado.</p>
      <p>As categorias reconhecem tanto a excelência técnica quanto o ridículo. De um lado, prêmios como "Melhor Bug do Lado do Servidor", "Melhor Ataque Criptográfico" e "Pesquisa Mais Inovadora"; de outro, o temido "Épico Fracasso" (Most Epic FAIL) e a "Resposta Mais Patética de Fornecedor" (Lamest Vendor Response), que expõem publicamente os descuidos de grandes empresas.</p>
      <p>Ao longo dos anos, o Pwnie virou um termômetro cultural da comunidade: a Sony foi "premiada" com o Épico Fracasso em 2011, após a invasão massiva da PlayStation Network, e vulnerabilidades célebres como Heartbleed e Stuxnet renderam indicações em diferentes edições.</p>
      <p>Mais do que uma brincadeira, a cerimônia reforça boas práticas ao celebrar pesquisa de ponta e, ao mesmo tempo, envergonhar respostas negligentes a falhas de segurança.</p>
      <p><strong>Criado em:</strong> 2007 · <strong>Realizado durante:</strong> Black Hat USA (Las Vegas) · <strong>Troféu:</strong> um pônei dourado</p>
    `,
    imagem: wordmark([
      { text: 'the', y: 104, size: 26, weight: 300, fill: '#8a94a6', spacing: 1 },
      { text: 'Pwnie', y: 150, size: 46, weight: 700, fill: '#161b22', spacing: 1 },
      { text: 'AWARDS', y: 188, size: 30, weight: 400, fill: '#f0883e', spacing: 6 }
    ])
  },
  {
    titulo: 'Pwn2Own',
    resumo: 'A mais famosa competição de hacking do mundo: pesquisadores exploram sistemas totalmente atualizados ao vivo, valendo prêmios em dinheiro — e até carros.',
    corpo: `
      <p>Realizado desde 2007 e organizado pela Zero Day Initiative (ZDI), da Trend Micro, o Pwn2Own é a mais prestigiada competição de hacking do planeta. A regra que dá nome ao evento é simples: "pwn it, own it" — quem consegue comprometer (pwn) um dispositivo ou software totalmente atualizado leva o aparelho (own) e um prêmio em dinheiro.</p>
      <p>Os alvos incluem navegadores, sistemas operacionais, máquinas virtuais, softwares corporativos, smartphones, sistemas industriais (ICS/SCADA) e até automóveis — a Tesla já ofereceu seus carros como prêmio, e pesquisadores de fato saíram de lá com um Model 3.</p>
      <p>Todas as vulnerabilidades exploradas são reveladas de forma responsável aos fabricantes, que têm um prazo para corrigi-las antes da divulgação pública — o que torna o Pwn2Own um dos maiores motores de correção de falhas críticas do setor. A competição distribui milhões de dólares em prêmios a cada edição e coroa o melhor participante com o título de "Master of Pwn".</p>
      <p>Na primeira edição, em 2007, o pesquisador Dino Dai Zovi comprometeu um MacBook remotamente; desde então, o evento tornou-se a vitrine anual das técnicas de exploração mais avançadas do mundo.</p>
      <p><strong>Criado em:</strong> 2007 · <strong>Organizado por:</strong> Zero Day Initiative (Trend Micro) · <strong>Estreia:</strong> CanSecWest, Vancouver</p>
    `,
    imagem: wordmark([
      { text: 'Pwn2Own', y: 138, size: 44, weight: 700, fill: '#161b22', spacing: 0 },
      { text: 'MASTER OF PWN', y: 178, size: 18, weight: 600, fill: '#e5484d', spacing: 4 }
    ])
  },
  {
    titulo: 'DEF CON Black Badge',
    resumo: 'A honraria mais cobiçada da cultura hacker: dá entrada vitalícia e gratuita à DEF CON, uma das maiores convenções de hackers do mundo.',
    corpo: `
      <p>A DEF CON, realizada em Las Vegas desde 1993 e fundada por Jeff Moss (o "Dark Tangent"), é uma das maiores e mais influentes convenções de hackers do mundo. Entre todos os seus prêmios, um é lendário: o Black Badge.</p>
      <p>O Black Badge é concedido aos vencedores das competições mais difíceis do evento — como o Capture the Flag (CTF), considerado o "campeonato mundial" de segurança ofensiva e defensiva — além de outros desafios de elite. Conquistá-lo é entrar para a história da comunidade.</p>
      <p>O prêmio dá ao portador algo raríssimo: entrada vitalícia e gratuita em todas as futuras edições da DEF CON. Pouquíssimas pessoas no mundo possuem um, o que faz do Black Badge um dos maiores símbolos de status e habilidade técnica no universo hacker.</p>
      <p>Mais do que um troféu, ele representa o reconhecimento pelos pares em um ambiente onde a reputação é conquistada resolvendo problemas que quase ninguém consegue resolver.</p>
      <p><strong>Evento criado em:</strong> 1993 · <strong>Local:</strong> Las Vegas, EUA · <strong>Benefício:</strong> entrada vitalícia na DEF CON</p>
    `,
    imagem: wordmark([
      { text: 'DEF CON', y: 134, size: 46, weight: 800, fill: '#161b22', spacing: 2 },
      { text: 'BLACK BADGE', y: 176, size: 20, weight: 600, fill: '#3b4251', spacing: 6 }
    ])
  },
  {
    titulo: 'RSA Conference Innovation Sandbox',
    resumo: 'A vitrine das startups mais inovadoras da cibersegurança: um "top 10" anual disputa o título de empresa mais promissora do setor.',
    corpo: `
      <p>Desde 2005, o Innovation Sandbox é um dos momentos mais concorridos da RSA Conference, em São Francisco — o maior evento de cibersegurança do mundo. A cada edição, dez startups finalistas têm apenas alguns minutos para apresentar suas soluções a uma banca de investidores e especialistas renomados, disputando o cobiçado título de "Most Innovative Startup".</p>
      <p>A competição é vista como um termômetro do futuro do setor: tecnologias que despontam ali costumam ditar tendências nos anos seguintes. Segundo a organização, as finalistas já atraíram, somadas, dezenas de bilhões de dólares em investimentos e aquisições.</p>
      <p>Vários nomes de peso passaram pelo palco: a Sourcefire, vencedora da primeira edição em 2005, foi mais tarde comprada pela Cisco por US$ 2,7 bilhões; outras finalistas se tornaram líderes de mercado ou "unicórnios" avaliados em mais de US$ 1 bilhão.</p>
      <p>Para uma jovem empresa de segurança, chegar ao "top 10" do Innovation Sandbox é um dos selos de credibilidade mais valiosos que existem.</p>
      <p><strong>Criado em:</strong> 2005 · <strong>Realizado durante:</strong> RSA Conference (São Francisco, EUA)</p>
    `,
    imagem: logo('rsa-conference.png')
  },
  {
    titulo: 'SC Awards',
    resumo: 'Um dos prêmios mais tradicionais da indústria de cibersegurança, elegendo há mais de 25 anos os melhores produtos, serviços e profissionais do setor.',
    corpo: `
      <p>Entregue pela publicação SC Media (antiga SC Magazine) desde 1997, o SC Awards é uma das mais antigas e respeitadas premiações da indústria de cibersegurança — frequentemente chamado de "Oscar" do setor de segurança da informação.</p>
      <p>Diferente de prêmios voltados à pesquisa ou à cultura hacker, o SC Awards foca no mercado: reconhece as melhores soluções, serviços e profissionais em dezenas de categorias, agrupadas em linhas como os "Trust Awards" (para produtos e tecnologias) e os "Excellence Awards" (para empresas e pessoas).</p>
      <p>Os vencedores são escolhidos por um corpo de jurados formado por especialistas, executivos e profissionais de segurança de diversas organizações, o que torna a premiação uma referência de credibilidade na hora de avaliar fornecedores.</p>
      <p>Com edições na América do Norte e na Europa, o SC Awards ajuda a orientar decisões de compra e a destacar a inovação comercial em um mercado cada vez mais competitivo.</p>
      <p><strong>Criado em:</strong> 1997 · <strong>Realizado por:</strong> SC Media · <strong>Edições:</strong> EUA e Europa</p>
    `,
    imagem: wordmark([
      { text: 'SC MEDIA', y: 100, size: 17, weight: 600, fill: '#8a94a6', spacing: 5 },
      { text: 'SC Awards', y: 152, size: 44, weight: 700, fill: '#2f81f7', spacing: 0 },
      { text: '— desde 1997 —', y: 184, size: 15, weight: 400, fill: '#8a94a6', spacing: 2 }
    ])
  },
  {
    titulo: 'National Cyber Security Hall of Fame',
    resumo: 'Desde 2012, honra os pioneiros — de criptógrafos a educadores — que construíram os alicerces da indústria de cibersegurança.',
    corpo: `
      <p>Fundado em 2012, em Baltimore (Maryland, EUA), o National Cyber Security Hall of Fame nasceu com o lema "Respeitar o passado, proteger o futuro" (Respect the Past, Protect the Future). Sua missão é preservar a memória e homenagear as pessoas e organizações que criaram os pilares da segurança digital.</p>
      <p>As indicações são avaliadas em categorias como Tecnologia, Políticas Públicas, Conscientização, Educação, Negócios, Pesquisa e Infraestrutura, reconhecendo que a cibersegurança é construída por muitas mãos — não apenas por técnicos.</p>
      <p>Entre os homenageados estão pioneiros da criptografia, criadores de padrões e protocolos fundamentais, ex-dirigentes de agências governamentais de segurança e fundadores de instituições de referência, como o SANS Institute. A turma inaugural de 2012 já reuniu vários dos nomes que definiram a criptografia moderna.</p>
      <p>Sediado no "corredor cibernético" de Maryland — região que concentra agências, universidades e empresas de segurança —, o hall funciona como um registro histórico vivo da evolução da área.</p>
      <p><strong>Criado em:</strong> 2012 · <strong>Sede:</strong> Baltimore, Maryland (EUA)</p>
    `,
    imagem: logo('hall-of-fame.png')
  },
  {
    titulo: 'Internet Hall of Fame',
    resumo: 'Criado pela Internet Society, celebra os visionários que construíram e expandiram a Internet — incluindo pioneiros da criptografia e da segurança.',
    corpo: `
      <p>Estabelecido em 2012 pela Internet Society (ISOC), o Internet Hall of Fame homenageia as pessoas que tornaram a Internet possível e a levaram a todo o planeta. É uma das mais importantes honrarias da história da tecnologia da informação.</p>
      <p>Os indutados são divididos em três grandes grupos: os "Pioneiros" (visionários que projetaram e construíram a rede), os "Inovadores" (que a expandiram com novas tecnologias e aplicações) e os "Conectores Globais" (que ampliaram seu alcance social e geográfico).</p>
      <p>Entre os nomes celebrados estão Vinton Cerf e Robert Kahn, criadores do protocolo TCP/IP; Tim Berners-Lee, inventor da World Wide Web; e Radia Perlman, cujo trabalho é essencial para o funcionamento das redes. Vários laureados também são figuras centrais da criptografia e da segurança — base sobre a qual a confiança na Internet é construída.</p>
      <p>Ao reconhecer essas contribuições, o hall lembra que a segurança digital caminha lado a lado com a própria evolução da rede.</p>
      <p><strong>Criado em:</strong> 2012 · <strong>Realizado por:</strong> Internet Society (ISOC)</p>
    `,
    imagem: logo('internet-hall-of-fame.png')
  },
  {
    titulo: 'EFF Pioneer Award',
    resumo: 'Entregue pela Electronic Frontier Foundation desde 1992, honra quem defende a privacidade, a liberdade e a segurança no mundo digital.',
    corpo: `
      <p>Concedido desde 1992 pela Electronic Frontier Foundation (EFF) — a mais influente organização de defesa dos direitos digitais, fundada em 1990 —, o Pioneer Award (Prêmio Pioneiro) reconhece pessoas e grupos que expandem a liberdade e a inovação no mundo digital.</p>
      <p>Diferente das premiações puramente técnicas, o Pioneer Award celebra o impacto social da tecnologia: privacidade, liberdade de expressão, criptografia acessível, software livre e o direito de pesquisar segurança sem medo de perseguição.</p>
      <p>Ao longo das décadas, a honraria já reconheceu criptógrafos, ativistas, jornalistas, desenvolvedores e defensores da privacidade cujo trabalho ajudou a proteger cidadãos comuns na era digital — incluindo criadores de ferramentas de criptografia hoje usadas por milhões de pessoas.</p>
      <p>Para a comunidade de segurança, o prêmio simboliza a ligação entre habilidade técnica e responsabilidade ética: proteger pessoas, e não apenas sistemas.</p>
      <p><strong>Criado em:</strong> 1992 · <strong>Concedido por:</strong> Electronic Frontier Foundation (EFF)</p>
    `,
    imagem: logo('eff.png')
  }
];

// A listagem ordena por criado_em DESC. Para que a ordem de exibição siga a
// ordem deste array (independente da ordem de conclusão dos inserts assíncronos),
// gravamos timestamps explícitos e decrescentes: o primeiro item recebe o
// horário mais recente e, portanto, aparece primeiro.
function timestamp(offsetSegundos) {
  const d = new Date(Date.now() - offsetSegundos * 1000);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ` +
         `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}

db.run(`DELETE FROM conteudos WHERE categoria = 'premio'`, (err) => {
  if (err) return console.error('Erro ao limpar prêmios antigos:', err.message);

  premios.forEach((premio, i) => {
    db.run(
      `INSERT INTO conteudos (categoria, titulo, resumo, corpo, imagem, criado_em) VALUES ('premio', ?, ?, ?, ?, ?)`,
      [premio.titulo, premio.resumo, premio.corpo, premio.imagem, timestamp(i)],
      function (err) {
        if (err) return console.error(err.message);
        console.log(`✅ ${premio.titulo} inserido com ID ${this.lastID}`);
      }
    );
  });
});
