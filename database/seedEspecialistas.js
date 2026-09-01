const db = require('./db');

const especialistas = [
  {
    slugWikipedia: 'Bruce_Schneier',
    nome: 'Bruce Schneier',
    cargo: 'Criptógrafo e especialista em segurança da informação — Harvard Kennedy School',
    bio: `
      <p>Bruce Schneier é um renomado criptógrafo, pesquisador e escritor norte-americano, considerado uma das vozes mais influentes sobre segurança digital e privacidade no mundo. É professor na Harvard Kennedy School e membro do conselho da Electronic Frontier Foundation (EFF).</p>

      <h3>Trajetória</h3>
      <p>Formado inicialmente em física, migrou para a área de segurança da informação nos anos 1980, período em que os cursos de ciência da computação ainda eram escassos. Ao longo de sua carreira, atuou em empresas de tecnologia e telecomunicações, além de fundar a Counterpane Internet Security, consultoria voltada à análise de riscos digitais.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Autor de mais de uma dezena de livros sobre segurança, incluindo "A Hacker's Mind" e "Click Here to Kill Everybody"</li>
        <li>Criou algoritmos criptográficos amplamente utilizados, como a cifra Blowfish e Twofish</li>
        <li>Cunhou o termo "security theater", usado para criticar medidas de segurança que dão sensação de proteção sem eficácia real</li>
        <li>Mantém o blog "Schneier on Security" e o boletim "Crypto-Gram", lidos por centenas de milhares de profissionais</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>É frequentemente chamado de "guru da segurança" pela imprensa internacional, tendo testemunhado perante o Congresso dos Estados Unidos sobre políticas de privacidade e segurança digital.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>TEDxPSU — "The Security Mirage" (2010)</h4>
          <p>Palestra sobre a diferença entre "sentir-se seguro" e "estar seguro de fato", popularizando o termo "security theater" (segurança de fachada), usado para criticar medidas que dão sensação de proteção sem eficácia real.</p>
        </div>
        <div class="destaque-item">
          <h4>Livro: "Click Here to Kill Everybody" (2018)</h4>
          <p>Obra que discute os riscos de segurança da explosão de dispositivos conectados (IoT) e como a hiperconectividade amplia as consequências de falhas de segurança no mundo físico.</p>
        </div>
        <div class="destaque-item">
          <h4>Testemunho no Congresso dos EUA</h4>
          <p>Foi convidado a testemunhar perante o Congresso norte-americano sobre políticas públicas de privacidade e segurança digital, reforçando sua atuação também no campo de políticas públicas.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Mikko_Hyppönen',
    nome: 'Mikko Hyppönen',
    cargo: 'Chief Research Officer — Sensofusion (ex-WithSecure/F-Secure)',
    bio: `
      <p>Mikko Hyppönen é um especialista finlandês em segurança da informação, reconhecido mundialmente por sua atuação no combate a malwares e por décadas de pesquisa em ameaças digitais.</p>

      <h3>Trajetória</h3>
      <p>Trabalhou por mais de 30 anos na F-Secure (posteriormente WithSecure), empresa finlandesa de cibersegurança, onde liderou investigações sobre alguns dos vírus e ataques mais relevantes da história da computação. Em 2025, migrou para a Sensofusion, companhia especializada em tecnologia anti-drones.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Auxiliou forças policiais dos Estados Unidos, Europa e Ásia em investigações de crimes cibernéticos desde os anos 1990</li>
        <li>Formulou a "Lei de Hyppönen", segundo a qual todo dispositivo descrito como "inteligente" é, por definição, vulnerável</li>
        <li>Palestrante frequente em eventos internacionais de segurança, com uma de suas palestras (TED Talk) ultrapassando 2 milhões de visualizações</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>Foi eleito uma das 50 pessoas mais importantes da internet pela revista PC World e recebeu o prêmio de "Melhor Educador" da indústria antimalware pela Virus Bulletin.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>TEDxBrussels — "Three Types of Online Attack" (2011)</h4>
          <p>Palestra que explica os três principais tipos de ataque à privacidade e dados dos usuários na internet, e por que apenas dois deles são tratados como crime na maioria dos países.</p>
        </div>
        <div class="destaque-item">
          <h4>"Behind Enemy Lines" — Hack In The Box (2012)</h4>
          <p>Apresentação técnica sobre a evolução do cenário de ameaças digitais, discutindo como o comportamento de atacantes vinha mudando na época.</p>
        </div>
        <div class="destaque-item">
          <h4>Combate ao botnet Sobig.F</h4>
          <p>Liderou a equipe responsável por derrubar a rede mundial usada pelo worm Sobig.F, um dos ataques de maior escala já registrados na história da computação.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Troy_Hunt',
    nome: 'Troy Hunt',
    cargo: 'Criador do Have I Been Pwned — Especialista australiano em segurança web',
    bio: `
      <p>Troy Hunt é um especialista australiano em segurança de aplicações web, mais conhecido por criar o "Have I Been Pwned", ferramenta gratuita que permite verificar se um e-mail ou senha foi exposto em algum vazamento de dados conhecido.</p>

      <h3>Trajetória</h3>
      <p>Antes de se dedicar integralmente à segurança da informação, atuou como desenvolvedor e arquiteto de software. Criou o Have I Been Pwned em 2013, consolidando ao longo dos anos uma das maiores bases de dados públicas sobre vazamentos de credenciais do mundo.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>O Have I Been Pwned é hoje referência usada até por empresas, governos e outros pesquisadores de segurança para checagem de vazamentos</li>
        <li>Autor de cursos e conteúdos educacionais sobre segurança de aplicações web amplamente utilizados por desenvolvedores</li>
        <li>Palestrante recorrente em conferências internacionais sobre proteção de dados e resposta a incidentes</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>Reconhecido pela Microsoft como "Most Valuable Professional" (MVP) em segurança, título concedido a profissionais que contribuem de forma expressiva para a comunidade técnica.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>Have I Been Pwned (desde 2013)</h4>
          <p>Plataforma gratuita que permite verificar se um e-mail ou senha já apareceu em algum vazamento de dados conhecido, hoje usada até por governos e outras empresas de segurança como referência.</p>
        </div>
        <div class="destaque-item">
          <h4>Palestrante recorrente nas NDC Conferences</h4>
          <p>Uma das conferências de desenvolvimento e segurança mais respeitadas do mundo, onde Hunt costuma abordar temas de segurança de aplicações web voltados a desenvolvedores.</p>
        </div>
        <div class="destaque-item">
          <h4>Cursos sobre segurança de aplicações web</h4>
          <p>Autor de cursos técnicos amplamente utilizados por desenvolvedores para aprender práticas seguras de programação e proteção de dados.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Kevin_Mitnick',
    nome: 'Kevin Mitnick',
    cargo: 'Ex-hacker e consultor de segurança (1963–2023)',
    bio: `
      <p>Kevin Mitnick foi um dos hackers mais conhecidos e procurados pelo FBI durante os anos 1990, condenado por invadir sistemas de grandes empresas de telecomunicações e tecnologia.</p>

      <h3>Trajetória</h3>
      <p>Após ser preso e cumprir sua pena, Mitnick reconstruiu a carreira como consultor de segurança, testando defesas de empresas com autorização legal — um caminho comum entre ex-hackers que migram para a chamada "segurança ofensiva ética".</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Autor de livros como "A Arte de Enganar" e "A Arte da Invasão", referências sobre engenharia social</li>
        <li>Popularizou o entendimento público de que o elo mais frágil da segurança costuma ser o comportamento humano, não a tecnologia</li>
        <li>Fundou a Mitnick Security Consulting, empresa voltada a testes de invasão e treinamentos corporativos</li>
      </ul>

      <h3>Legado</h3>
      <p>Faleceu em 2023, sendo amplamente lembrado como uma figura que ajudou a moldar o debate público sobre hacking, ética e segurança da informação nas décadas seguintes à sua condenação.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>"The Art of Deception: Controlling Humans"</h4>
          <p>Uma de suas palestras mais conhecidas, na qual demonstrava ao vivo, de forma didática, como é possível manipular pessoas para obter informações sigilosas através da engenharia social.</p>
        </div>
        <div class="destaque-item">
          <h4>Livro: "A Arte de Enganar" (2002)</h4>
          <p>Best-seller que se tornou leitura obrigatória para profissionais de segurança, explicando como o fator humano costuma ser o elo mais frágil de qualquer sistema de proteção.</p>
        </div>
        <div class="destaque-item">
          <h4>Treinamentos de Conscientização em Segurança</h4>
          <p>Seu programa de treinamento corporativo passou a ser assistido por mais de 1 milhão de profissionais por ano, focado em ensinar equipes a reconhecerem tentativas de engenharia social.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Katie_Moussouris',
    nome: 'Katie Moussouris',
    cargo: 'Fundadora e CEO — Luta Security',
    bio: `
      <p>Katie Moussouris é uma especialista norte-americana reconhecida por seu trabalho pioneiro em programas de "bug bounty" — recompensas oferecidas a pesquisadores que encontram e reportam vulnerabilidades de forma responsável.</p>

      <h3>Trajetória</h3>
      <p>Atuou na Microsoft e ajudou a estruturar um dos primeiros programas formais de divulgação responsável de vulnerabilidades da indústria. Também colaborou com o Departamento de Defesa dos Estados Unidos na criação do "Hack the Pentagon", um dos primeiros programas de bug bounty do governo americano.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Fundou a Luta Security, consultoria especializada em programas de segurança colaborativa entre empresas e pesquisadores independentes</li>
        <li>Referência internacional em políticas de divulgação responsável de vulnerabilidades (coordinated vulnerability disclosure)</li>
        <li>Palestrante frequente sobre como equilibrar incentivos entre empresas e a comunidade de pesquisadores de segurança</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>Regularmente citada entre as profissionais mais influentes da cibersegurança mundial por publicações especializadas do setor.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>"Hack the Pentagon" (2016)</h4>
          <p>Primeiro programa de recompensa por vulnerabilidades do governo dos Estados Unidos. A primeira falha de segurança foi reportada apenas 13 minutos após o lançamento, e o programa encontrou 138 vulnerabilidades legítimas nos sistemas do Departamento de Defesa.</p>
        </div>
        <div class="destaque-item">
          <h4>Palestra "Hacking The Pentagon" — HITB GSEC (2016)</h4>
          <p>Apresentação sobre como conduziu a negociação e implementação do programa de bug bounty dentro de uma das instituições mais tradicionais e burocráticas do governo americano.</p>
        </div>
        <div class="destaque-item">
          <h4>Primeiro Programa de Bug Bounty da Microsoft</h4>
          <p>Antes de trabalhar com o governo dos EUA, estruturou o primeiro programa formal de recompensas por vulnerabilidades da Microsoft, referência para o mercado corporativo.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Eugene_Kaspersky',
    nome: 'Eugene Kaspersky',
    cargo: 'CEO e cofundador — Kaspersky',
    bio: `
      <p>Eugene Kaspersky é um especialista russo em segurança da informação, cofundador e CEO da Kaspersky, uma das maiores empresas de antivírus e cibersegurança do mundo.</p>

      <h3>Trajetória</h3>
      <p>Formado em criptografia, iniciou sua carreira estudando vírus de computador ainda no fim dos anos 1980. Junto com colegas, fundou a Kaspersky Lab em 1997, transformando o interesse técnico inicial em uma das companhias mais influentes do setor de proteção digital global.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>A empresa Kaspersky se tornou referência mundial em pesquisa de ameaças, com equipes dedicadas à análise de ataques de grande escala</li>
        <li>Colaborou com a identificação pública de campanhas de espionagem digital e malwares sofisticados ao longo de décadas</li>
        <li>Defensor público da cooperação internacional no combate ao cibercrime, participando de fóruns e debates globais sobre o tema</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>Sob sua liderança, a Kaspersky se consolidou como uma das principais fornecedoras de soluções de segurança digital para consumidores e empresas em diversos países.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>Security Analyst Summit (SAS) — desde 2009</h4>
          <p>Criou e mantém até hoje um dos eventos mais respeitados do setor voltado à pesquisa de ameaças avançadas, reunindo anualmente pesquisadores, forças policiais e especialistas de dezenas de países.</p>
        </div>
        <div class="destaque-item">
          <h4>Remoção do vírus "Cascade" (1989)</h4>
          <p>Sua carreira começou quando seu próprio computador foi infectado por esse vírus. Usando sua formação em criptografia, desenvolveu uma ferramenta de remoção — episódio que deu origem ao banco de dados de ameaças que se tornaria a base da Kaspersky.</p>
        </div>
        <div class="destaque-item">
          <h4>Global Research and Analysis Team (GReAT)</h4>
          <p>Equipe de pesquisa de ameaças da Kaspersky, referência mundial na identificação pública de campanhas de espionagem digital e malwares sofisticados ao longo de décadas.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Claude_Shannon',
    nome: 'Claude Shannon',
    cargo: 'Matemático e "pai da teoria da informação" — Bell Labs / MIT (1916–2001)',
    bio: `
      <p>Claude Shannon foi um matemático e engenheiro norte-americano considerado o "pai da teoria da informação" — o arcabouço matemático que sustenta toda a comunicação digital moderna e boa parte da criptografia atual.</p>

      <h3>Trajetória</h3>
      <p>Trabalhou nos lendários Bell Labs e, mais tarde, foi professor no MIT. Durante a Segunda Guerra Mundial, dedicou-se a pesquisas sigilosas sobre criptografia e sistemas de controle de tiro, período em que chegou a conversar com Alan Turing, que visitou os Bell Labs em 1943.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Publicou em 1948 "A Mathematical Theory of Communication", que fundou a teoria da informação e introduziu o "bit" como unidade de informação</li>
        <li>Em 1949, escreveu "Communication Theory of Secrecy Systems", trabalho que colocou a criptografia em bases matemáticas rigorosas pela primeira vez</li>
        <li>Provou matematicamente que a cifra de uso único (one-time pad) oferece sigilo perfeito quando usada corretamente</li>
        <li>Introduziu os conceitos de "confusão" e "difusão", princípios que orientam o projeto de praticamente todas as cifras modernas</li>
      </ul>

      <h3>Legado</h3>
      <p>Sem o trabalho de Shannon não existiriam os fundamentos teóricos da criptografia moderna nem da compressão e transmissão de dados. Seu nome é reverenciado em toda a ciência da computação e das telecomunicações.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>"Communication Theory of Secrecy Systems" (1949)</h4>
          <p>Artigo que transformou a criptografia de arte em ciência, definindo o que significa um sistema ser matematicamente seguro e provando o sigilo perfeito da cifra de uso único.</p>
        </div>
        <div class="destaque-item">
          <h4>"A Mathematical Theory of Communication" (1948)</h4>
          <p>A obra que fundou a teoria da informação, base de tudo o que envolve armazenar e transmitir dados — dos códigos corretores de erro à compressão de arquivos.</p>
        </div>
        <div class="destaque-item">
          <h4>Trabalhos em torno do SIGSALY</h4>
          <p>Participou dos estudos ligados ao SIGSALY, o sistema de voz criptografada usado por líderes aliados na Segunda Guerra — um marco da comunicação segura.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Whitfield_Diffie',
    nome: 'Whitfield Diffie',
    cargo: 'Criptógrafo — coautor da criptografia de chave pública · Turing Award 2015',
    bio: `
      <p>Whitfield Diffie é um criptógrafo norte-americano cujo trabalho, ao lado de Martin Hellman, revolucionou a segurança digital ao inventar a criptografia de chave pública — a ideia que hoje protege praticamente toda comunicação na internet.</p>

      <h3>Trajetória</h3>
      <p>Nos anos 1970, incomodado com o problema de como duas pessoas poderiam trocar mensagens seguras sem antes compartilhar uma senha secreta, dedicou-se a resolver o "problema da distribuição de chaves". Mais tarde, foi Chief Security Officer da Sun Microsystems.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Coautor, com Martin Hellman, do artigo "New Directions in Cryptography" (1976), que apresentou ao mundo a criptografia de chave pública</li>
        <li>Idealizou, junto com Hellman, a troca de chaves Diffie-Hellman, usada até hoje para estabelecer conexões seguras (como o cadeado do HTTPS)</li>
        <li>Ajudou a introduzir o conceito de assinatura digital, essencial para autenticação e comércio eletrônico</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>Recebeu, junto com Martin Hellman, o Turing Award de 2015 — o "Nobel da Computação" — pela criação da criptografia de chave pública.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>"New Directions in Cryptography" (1976)</h4>
          <p>Artigo, escrito com Martin Hellman, que fundou a criptografia moderna de chave pública e mudou para sempre a forma como protegemos informações.</p>
        </div>
        <div class="destaque-item">
          <h4>Troca de chaves Diffie-Hellman</h4>
          <p>Método que permite a duas partes criarem uma chave secreta compartilhada por um canal público inseguro; é a base de boa parte das conexões seguras da internet.</p>
        </div>
        <div class="destaque-item">
          <h4>Turing Award (2015)</h4>
          <p>Concedido pela ACM a ele e a Martin Hellman pela invenção da criptografia de chave pública.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Martin_Hellman',
    nome: 'Martin Hellman',
    cargo: 'Criptógrafo — coautor da criptografia de chave pública · Turing Award 2015 · Stanford',
    bio: `
      <p>Martin Hellman é um criptógrafo norte-americano e professor emérito da Universidade de Stanford, coautor da criptografia de chave pública ao lado de Whitfield Diffie.</p>

      <h3>Trajetória</h3>
      <p>Como professor em Stanford, dedicou-se à criptografia num momento em que a área era dominada por agências governamentais, enfrentando inclusive pressões oficiais que tentavam limitar a pesquisa acadêmica sobre cifras. Contou também com contribuições do então estudante Ralph Merkle.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Coautor de "New Directions in Cryptography" (1976), marco da criptografia moderna</li>
        <li>Coidealizador da troca de chaves Diffie-Hellman, um dos algoritmos mais usados no mundo</li>
        <li>Defensor da liberdade de pesquisa acadêmica em criptografia diante de restrições governamentais</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>Dividiu com Diffie o Turing Award de 2015. Nas últimas décadas, tornou-se também um ativista dedicado à redução do risco de conflito nuclear e à segurança internacional.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>Turing Award (2015)</h4>
          <p>Recebido junto com Whitfield Diffie pela criação da criptografia de chave pública.</p>
        </div>
        <div class="destaque-item">
          <h4>"New Directions in Cryptography" (1976)</h4>
          <p>Artigo seminal que introduziu ideias hoje presentes em qualquer sistema de comunicação segura.</p>
        </div>
        <div class="destaque-item">
          <h4>Segurança internacional e risco nuclear</h4>
          <p>Fora da criptografia, dedicou-se a escrever e palestrar sobre segurança internacional e a redução do risco de guerra nuclear.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Ron_Rivest',
    nome: 'Ronald Rivest',
    cargo: 'Criptógrafo — coinventor do RSA · Turing Award 2002 · MIT',
    bio: `
      <p>Ronald Rivest é um criptógrafo norte-americano e professor do MIT, mundialmente conhecido por ser o "R" do RSA — o algoritmo de criptografia de chave pública mais usado da história.</p>

      <h3>Trajetória</h3>
      <p>Em 1977, junto com Adi Shamir e Leonard Adleman, transformou as ideias teóricas de chave pública em um algoritmo prático e utilizável. Mais tarde, cofundou a empresa RSA Security, que ajudou a levar a criptografia para o mercado corporativo.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Coinventor do algoritmo RSA (1977), base da segurança de e-mails, sites e transações financeiras por décadas</li>
        <li>Criador de cifras amplamente usadas, como RC4, RC5 e RC6</li>
        <li>Autor das funções de hash MD2, MD4 e MD5, usadas na verificação de integridade de dados</li>
        <li>Pesquisador de sistemas de votação eletrônica verificável e segura</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>Recebeu o Turing Award de 2002, junto com Shamir e Adleman, pela criação do RSA. É uma das figuras mais influentes da criptografia aplicada.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>Algoritmo RSA (1977)</h4>
          <p>Criado com Adi Shamir e Leonard Adleman, tornou a criptografia de chave pública prática e é usado até hoje para proteger comunicações no mundo inteiro.</p>
        </div>
        <div class="destaque-item">
          <h4>Turing Award (2002)</h4>
          <p>Concedido ao trio criador do RSA pela contribuição duradoura à ciência da computação.</p>
        </div>
        <div class="destaque-item">
          <h4>Cifras e funções de hash (RC4, MD5)</h4>
          <p>Algoritmos que se tornaram onipresentes em softwares e protocolos de segurança durante décadas.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Adi_Shamir',
    nome: 'Adi Shamir',
    cargo: 'Criptógrafo — coinventor do RSA · Turing Award 2002 · Instituto Weizmann',
    bio: `
      <p>Adi Shamir é um criptógrafo israelense do Instituto Weizmann de Ciências, um dos criadores do RSA e uma das mentes mais brilhantes tanto na construção quanto na quebra de sistemas criptográficos.</p>

      <h3>Trajetória</h3>
      <p>Coautor do RSA em 1977 (o "S" da sigla), construiu uma carreira dupla: criando novos esquemas de segurança e, ao mesmo tempo, encontrando formas engenhosas de atacar cifras existentes — o que o tornou referência mundial em criptoanálise.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Coinventor do algoritmo RSA (1977)</li>
        <li>Criador do "compartilhamento de segredo de Shamir" (Shamir's Secret Sharing), método para dividir uma chave entre várias pessoas com segurança</li>
        <li>Codesenvolvedor da criptoanálise diferencial, técnica fundamental para avaliar a robustez de cifras</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>Dividiu o Turing Award de 2002 com Rivest e Adleman. É constantemente citado como um dos maiores criptógrafos vivos.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>Algoritmo RSA (1977)</h4>
          <p>Um dos três criadores do sistema que popularizou a criptografia de chave pública.</p>
        </div>
        <div class="destaque-item">
          <h4>Shamir's Secret Sharing</h4>
          <p>Esquema elegante que divide um segredo em partes, de modo que só a combinação de um número mínimo delas o reconstrói — usado na proteção de chaves até hoje.</p>
        </div>
        <div class="destaque-item">
          <h4>Turing Award (2002)</h4>
          <p>Reconhecimento pela criação do RSA e pelo impacto duradouro na segurança digital.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Phil_Zimmermann',
    nome: 'Phil Zimmermann',
    cargo: 'Criador do PGP — criptografia forte para as massas',
    bio: `
      <p>Phil Zimmermann é o criador do PGP (Pretty Good Privacy), o programa que, em 1991, colocou a criptografia forte de e-mails nas mãos de pessoas comuns pela primeira vez — e por isso virou símbolo da luta pela privacidade digital.</p>

      <h3>Trajetória</h3>
      <p>Ativista pela paz e programador, Zimmermann criou o PGP e o distribuiu gratuitamente pela internet. Como as leis americanas da época tratavam a criptografia forte como "munição" de exportação, ele se tornou alvo de uma investigação criminal federal, que durou de 1993 a 1996 e foi arquivada sem acusações.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Criou o PGP, até hoje um dos padrões mais usados para criptografar e assinar e-mails e arquivos</li>
        <li>Tornou-se figura central no debate sobre o direito dos cidadãos de usarem criptografia forte</li>
        <li>Cofundou a Silent Circle e ajudou a criar o ZRTP, protocolo de criptografia para chamadas de voz</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>Foi incluído no Internet Hall of Fame e é reconhecido como um dos maiores defensores da privacidade da era digital.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>PGP — Pretty Good Privacy (1991)</h4>
          <p>Programa que democratizou a criptografia forte, permitindo a qualquer pessoa proteger seus e-mails e arquivos.</p>
        </div>
        <div class="destaque-item">
          <h4>A batalha das "crypto wars"</h4>
          <p>A investigação federal contra ele por "exportar munição" (o PGP) tornou-se um marco na defesa do direito de usar criptografia.</p>
        </div>
        <div class="destaque-item">
          <h4>ZRTP e comunicação segura</h4>
          <p>Ajudou a criar protocolos de criptografia para voz, levando a privacidade também às chamadas telefônicas pela internet.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Robert_Tappan_Morris',
    nome: 'Robert Tappan Morris',
    cargo: 'Autor do Morris Worm · Professor do MIT · Cofundador do Y Combinator',
    bio: `
      <p>Robert Tappan Morris entrou para a história em 1988, ainda estudante de pós-graduação, ao criar o "Morris Worm" — o primeiro worm a se espalhar em larga escala pela internet e um divisor de águas na história da segurança.</p>

      <h3>Trajetória</h3>
      <p>O worm que criou, provavelmente sem a intenção de causar tanto dano, saiu do controle e derrubou milhares de computadores em 1988, expondo pela primeira vez a fragilidade da rede. O episódio o tornou a primeira pessoa condenada sob a lei americana de fraude computacional (Computer Fraud and Abuse Act). Depois, seguiu carreira acadêmica e empreendedora.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>O impacto do Morris Worm levou diretamente à criação do CERT/CC, o primeiro centro de resposta a incidentes de segurança do mundo</li>
        <li>Tornou-se professor do MIT, pesquisando redes e sistemas de computação</li>
        <li>Cofundou a Viaweb (vendida ao Yahoo) e, mais tarde, a aceleradora Y Combinator, uma das mais influentes do Vale do Silício</li>
      </ul>

      <h3>Legado</h3>
      <p>Ainda que involuntariamente, seu worm despertou o mundo para a necessidade de levar a segurança de redes a sério — mudança que definiu as décadas seguintes.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>Morris Worm (1988)</h4>
          <p>O primeiro grande worm da internet; infectou milhares de máquinas e mostrou ao mundo o quanto a rede era vulnerável.</p>
        </div>
        <div class="destaque-item">
          <h4>Criação do CERT/CC</h4>
          <p>A resposta ao caos causado pelo worm levou à fundação do primeiro centro oficial de resposta a incidentes de segurança.</p>
        </div>
        <div class="destaque-item">
          <h4>Y Combinator</h4>
          <p>Anos depois, cofundou uma das aceleradoras de startups mais importantes do mundo, mostrando a amplitude de sua trajetória.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Clifford_Stoll',
    nome: 'Clifford Stoll',
    cargo: 'Astrônomo e autor de "The Cuckoo\'s Egg" — pioneiro na caça a espiões digitais',
    bio: `
      <p>Clifford Stoll é um astrônomo norte-americano que, quase por acaso, protagonizou um dos primeiros casos documentados de espionagem cibernética — narrado em seu livro clássico "The Cuckoo's Egg".</p>

      <h3>Trajetória</h3>
      <p>Em 1986, trabalhando como administrador de sistemas no Lawrence Berkeley National Laboratory, notou uma diferença de apenas 75 centavos na contabilidade de uso dos computadores. Ao investigar, descobriu um invasor que usava a rede do laboratório para roubar segredos militares e vendê-los à KGB soviética.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Rastreou pacientemente o invasor (o hacker alemão Markus Hess) usando técnicas pioneiras de monitoramento</li>
        <li>Montou uma das primeiras "iscas" (honeypots) da história, com documentos falsos para manter o invasor conectado o tempo suficiente para localizá-lo</li>
        <li>Relatou toda a investigação no best-seller "The Cuckoo's Egg" (1989), leitura obrigatória sobre resposta a incidentes</li>
      </ul>

      <h3>Legado</h3>
      <p>Seu caso mostrou, muito antes da internet popular, que redes de computadores já eram um campo de batalha para espionagem — e ajudou a inspirar gerações de profissionais de segurança.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>"The Cuckoo's Egg" (1989)</h4>
          <p>Relato real de como uma diferença de 75 centavos o levou a desvendar um esquema de espionagem internacional; até hoje um clássico da segurança.</p>
        </div>
        <div class="destaque-item">
          <h4>Um dos primeiros honeypots</h4>
          <p>Criou documentos falsos para atrair e manter o invasor conectado, técnica que se tornaria comum na defesa cibernética.</p>
        </div>
        <div class="destaque-item">
          <h4>Caça a Markus Hess</h4>
          <p>Rastreou um hacker que vendia segredos à KGB, num dos primeiros casos documentados de ciberespionagem.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Dan_Kaminsky',
    nome: 'Dan Kaminsky',
    cargo: 'Pesquisador de segurança — descobriu a falha crítica do DNS (1979–2021)',
    bio: `
      <p>Dan Kaminsky foi um pesquisador de segurança norte-americano, lembrado como um dos mais brilhantes e queridos da comunidade, especialmente por ter descoberto e ajudado a corrigir uma falha que ameaçava a internet inteira.</p>

      <h3>Trajetória</h3>
      <p>Em 2008, identificou uma vulnerabilidade fundamental no DNS — o "catálogo de endereços" da internet — que permitiria a criminosos redirecionar usuários para sites falsos em escala global. Em vez de divulgá-la de imediato, coordenou secretamente um dos maiores esforços conjuntos da história para corrigir o problema em vários fabricantes ao mesmo tempo.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Descobriu a falha de "envenenamento de cache" do DNS e liderou sua correção coordenada e sigilosa em 2008</li>
        <li>Foi escolhido como um dos poucos "representantes de confiança da comunidade" que guardam as chaves de recuperação do DNSSEC, na raiz da internet</li>
        <li>Investigou casos famosos, como o rootkit da Sony que se instalava secretamente em computadores de usuários</li>
      </ul>

      <h3>Legado</h3>
      <p>Faleceu em 2021, deixando um legado de pesquisa rigorosa e de defesa de uma internet mais segura e aberta para todos.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>A falha do DNS (2008)</h4>
          <p>Descoberta que poderia ter permitido sequestrar boa parte do tráfego da internet; sua correção coordenada é estudada como modelo de divulgação responsável.</p>
        </div>
        <div class="destaque-item">
          <h4>Guardião das chaves do DNSSEC</h4>
          <p>Foi um dos poucos escolhidos mundialmente para ajudar a proteger e, se necessário, restaurar a segurança da raiz do DNS.</p>
        </div>
        <div class="destaque-item">
          <h4>Investigação do rootkit da Sony</h4>
          <p>Ajudou a expor e medir o alcance de um software que a Sony instalava sem consentimento em milhões de computadores.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Jeff_Moss_(hacker)',
    nome: 'Jeff Moss',
    cargo: 'Fundador da DEF CON e da Black Hat — "The Dark Tangent"',
    bio: `
      <p>Jeff Moss, conhecido no meio hacker como "The Dark Tangent", é o criador das duas conferências de segurança mais influentes do mundo: a DEF CON e a Black Hat.</p>

      <h3>Trajetória</h3>
      <p>Em 1993, organizou a primeira DEF CON, em Las Vegas, reunindo a comunidade hacker de forma aberta. Em 1997, criou a Black Hat, com foco mais corporativo e profissional. Juntas, as duas moldaram a cultura global de pesquisa em segurança.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Fundou a DEF CON (1993), hoje uma das maiores convenções de hackers do planeta</li>
        <li>Criou a Black Hat (1997), referência mundial em treinamento e pesquisa de segurança para o mercado</li>
        <li>Ajudou a aproximar a comunidade hacker de governos e empresas, servindo em conselhos consultivos</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>Integrou o Conselho Consultivo de Segurança Interna dos Estados Unidos e o conselho da ICANN, atuando como ponte entre o mundo hacker e as instituições.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>DEF CON (1993)</h4>
          <p>Convenção que se tornou o coração da cultura hacker mundial, com competições, palestras e o lendário prêmio Black Badge.</p>
        </div>
        <div class="destaque-item">
          <h4>Black Hat (1997)</h4>
          <p>Conferência que profissionalizou a pesquisa de segurança, hoje realizada em vários continentes.</p>
        </div>
        <div class="destaque-item">
          <h4>Conselhos de governo e ICANN</h4>
          <p>Atuou como conselheiro em segurança nacional e na governança da internet, aproximando hackers e instituições.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Dorothy_E._Denning',
    nome: 'Dorothy Denning',
    cargo: 'Pioneira em detecção de intrusão e segurança da informação',
    bio: `
      <p>Dorothy Denning é uma cientista da computação norte-americana reconhecida como uma das grandes pioneiras da segurança da informação, com contribuições que vão da detecção de intrusão à segurança de bancos de dados.</p>

      <h3>Trajetória</h3>
      <p>Professora e pesquisadora ao longo de décadas — passando por instituições como a Universidade de Georgetown e a Naval Postgraduate School —, dedicou-se a temas que iam muito além da criptografia, ajudando a estruturar a segurança como disciplina científica.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Publicou em 1987 "An Intrusion-Detection Model", artigo que lançou as bases dos sistemas de detecção de intrusão (IDS) usados até hoje</li>
        <li>Desenvolveu modelos formais de controle de fluxo de informação, fundamentais para a segurança de sistemas</li>
        <li>Pesquisou segurança de bancos de dados, criptografia e o impacto da tecnologia em conflitos e no chamado "ciberterrorismo"</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>Foi incluída no National Cyber Security Hall of Fame, sendo uma das mulheres mais influentes da história da área.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>"An Intrusion-Detection Model" (1987)</h4>
          <p>Artigo que criou as bases teóricas dos sistemas que monitoram redes em busca de atividades maliciosas.</p>
        </div>
        <div class="destaque-item">
          <h4>National Cyber Security Hall of Fame</h4>
          <p>Reconhecida entre os pioneiros que construíram os alicerces da cibersegurança.</p>
        </div>
        <div class="destaque-item">
          <h4>"Information Warfare and Security"</h4>
          <p>Autora de obras de referência sobre segurança da informação e conflitos no ciberespaço.</p>
        </div>
      </div>
    `
  },
  {
    slugWikipedia: 'Moxie_Marlinspike',
    nome: 'Moxie Marlinspike',
    cargo: 'Criador do Signal e do Signal Protocol — criptografia ponta a ponta',
    bio: `
      <p>Moxie Marlinspike é um criptógrafo e desenvolvedor norte-americano, criador do aplicativo Signal e do Signal Protocol — a tecnologia de criptografia ponta a ponta que hoje protege as conversas de bilhões de pessoas.</p>

      <h3>Trajetória</h3>
      <p>Pesquisador de segurança com longa trajetória, fundou a Open Whisper Systems, onde desenvolveu ferramentas de comunicação segura. Sua empresa anterior, a Whisper Systems, foi adquirida pelo Twitter em 2011.</p>

      <h3>Principais Contribuições</h3>
      <ul>
        <li>Criou o Signal Protocol, adotado não só pelo Signal, mas também por serviços como o WhatsApp, levando criptografia forte a bilhões de usuários</li>
        <li>Desenvolveu o aplicativo Signal, referência mundial em mensagens privadas</li>
        <li>Como pesquisador, expôs fragilidades no SSL/TLS, apresentando ataques como o "sslstrip"</li>
      </ul>

      <h3>Reconhecimento</h3>
      <p>É considerado uma das figuras centrais na popularização da criptografia ponta a ponta, transformando a privacidade de nicho em recurso disponível para qualquer pessoa.</p>

      <h3>Trabalhos e Palestras em Destaque</h3>
      <div class="grade-destaques">
        <div class="destaque-item">
          <h4>Signal Protocol</h4>
          <p>Protocolo de criptografia ponta a ponta tão sólido que foi adotado por aplicativos usados por bilhões, como WhatsApp e Signal.</p>
        </div>
        <div class="destaque-item">
          <h4>Aplicativo Signal</h4>
          <p>Mensageiro focado em privacidade que se tornou referência para jornalistas, ativistas e usuários comuns em todo o mundo.</p>
        </div>
        <div class="destaque-item">
          <h4>sslstrip (2009)</h4>
          <p>Pesquisa apresentada na Black Hat que demonstrou como conexões "seguras" podiam ser rebaixadas, influenciando melhorias no HTTPS.</p>
        </div>
      </div>
    `
  },
];

async function buscarFotoWikipedia(slug) {
  try {
    const resposta = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`, {
      headers: { 'User-Agent': 'SentinelCore/1.0 (seed de especialistas)' }
    });
    const dados = await resposta.json();
    return dados.thumbnail ? dados.thumbnail.source : null;
  } catch (erro) {
    console.error(`Erro ao buscar foto de ${slug}:`, erro.message);
    return null;
  }
}

// A listagem ordena por criado_em DESC. Gravamos timestamps explícitos e
// decrescentes para que a ordem de exibição siga a ordem deste array
// (o primeiro especialista recebe o horário mais recente e aparece primeiro).
function timestamp(offsetSegundos) {
  const d = new Date(Date.now() - offsetSegundos * 1000);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ` +
         `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}

async function popularEspecialistas() {
  db.run(`DELETE FROM conteudos WHERE categoria = 'especialista'`, async (err) => {
    if (err) return console.error('Erro ao limpar especialistas antigos:', err.message);

    for (const [i, especialista] of especialistas.entries()) {
      const foto = await buscarFotoWikipedia(especialista.slugWikipedia);

      db.run(
        `INSERT INTO conteudos (categoria, titulo, resumo, corpo, imagem, criado_em) VALUES (?, ?, ?, ?, ?, ?)`,
        ['especialista', especialista.nome, especialista.cargo, especialista.bio, foto, timestamp(i)],
        function (err) {
          if (err) return console.error(err.message);
          console.log(`✅ ${especialista.nome} inserido (foto: ${foto ? 'encontrada' : 'não encontrada'})`);
        }
      );
    }
  });
}

popularEspecialistas();