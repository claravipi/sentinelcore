const db = require('./db');

// ============================================================================
//  TÓPICOS DE CONTEÚDO / TREINAMENTO
//  Cada tópico tem: conteudo (informações + aulas + prática, em HTML) e um quiz
//  (perguntas + alternativas). Aparecem na categoria "Conteúdo" e no treinamento.
//  Em cada quiz, marque a alternativa correta com 1 (só uma por pergunta).
// ============================================================================

const topicos = [
  {
    titulo: 'Segurança de aplicativos',
    descricao: 'Como proteger softwares e aplicativos contra falhas exploradas por atacantes.',
    conteudo: `
      <p>A segurança de aplicativos (AppSec) reúne as práticas para encontrar, corrigir e prevenir falhas de segurança em softwares — sites, aplicativos e APIs. Como grande parte dos ataques hoje mira diretamente as aplicações, protegê-las é essencial.</p>
      <h3>Aula 1 — Falhas mais comuns</h3>
      <p>Boa parte dos problemas nasce da falta de validação das informações que entram no sistema. Vulnerabilidades clássicas incluem injeção de SQL (manipular consultas ao banco de dados), Cross-Site Scripting (XSS, injeção de scripts em páginas) e autenticação quebrada. O projeto OWASP mantém a lista "Top 10", uma referência mundial dos riscos mais críticos.</p>
      <h3>Aula 2 — Segurança desde o início</h3>
      <p>Segurança não deve ser um "remendo" no final: ela precisa fazer parte de todo o ciclo de desenvolvimento (conceito de "Security by Design" e "Shift Left"). Revisão de código, testes automatizados de segurança e análise de dependências ajudam a barrar falhas antes de chegarem à produção.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Sempre valide e trate os dados enviados pelo usuário</li>
        <li>Mantenha bibliotecas e frameworks atualizados</li>
        <li>Nunca confie apenas em validações feitas no navegador (front-end)</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'Qual falha permite manipular consultas ao banco de dados por meio de campos de entrada mal validados?',
        alternativas: [['Injeção de SQL', 1], ['Phishing', 0], ['Ransomware', 0], ['Engenharia social', 0]]
      },
      {
        enunciado: 'O que significa "Shift Left" na segurança de aplicativos?',
        alternativas: [
          ['Ignorar a segurança até o lançamento', 0],
          ['Levar a segurança para o início do desenvolvimento', 1],
          ['Testar apenas em produção', 0],
          ['Delegar a segurança só ao usuário final', 0]
        ]
      },
      {
        enunciado: 'Qual referência lista os riscos de segurança mais críticos em aplicações web?',
        alternativas: [['OWASP Top 10', 1], ['Lei de Moore', 0], ['RFC 1918', 0], ['ISO 9001', 0]]
      }
    ]
  },
  {
    titulo: 'Carreiras em cibersegurança',
    descricao: 'Caminhos, funções e habilidades para trabalhar na área de segurança da informação.',
    conteudo: `
      <p>A cibersegurança é uma das áreas de tecnologia que mais cresce e sofre com a falta de profissionais qualificados. Existem trilhas para diferentes perfis — dos mais técnicos aos voltados a gestão e conformidade.</p>
      <h3>Aula 1 — Principais funções</h3>
      <p>Entre os cargos mais comuns estão: analista de SOC (monitoramento de ameaças), pentester (testes de invasão, "time vermelho"), analista de defesa ("time azul"), engenheiro de segurança, especialista em GRC (governança, risco e conformidade) e CISO (liderança de segurança).</p>
      <h3>Aula 2 — Como começar</h3>
      <p>Fundamentos de redes, sistemas operacionais (Linux e Windows) e lógica de programação formam a base. A partir daí, certificações como Security+, CEH ou OSCP ajudam a validar conhecimento. Praticar em laboratórios, plataformas de CTF e projetos pessoais faz muita diferença.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Escolha uma trilha (ofensiva, defensiva ou governança) e aprofunde-se</li>
        <li>Monte um laboratório em casa para praticar com segurança</li>
        <li>Participe da comunidade: eventos, CTFs e fóruns aceleram o aprendizado</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'Qual profissional é responsável por simular ataques para testar as defesas de uma organização?',
        alternativas: [['Pentester', 1], ['Recepcionista', 0], ['Designer', 0], ['Contador', 0]]
      },
      {
        enunciado: 'O que faz um analista de SOC?',
        alternativas: [
          ['Monitora e responde a ameaças de segurança', 1],
          ['Cuida apenas do design de sites', 0],
          ['Gerencia o financeiro da empresa', 0],
          ['Vende produtos físicos', 0]
        ]
      },
      {
        enunciado: 'Qual sigla representa a área de governança, risco e conformidade?',
        alternativas: [['GRC', 1], ['CPU', 0], ['HTML', 0], ['VPN', 0]]
      }
    ]
  },
  {
    titulo: 'Segurança na nuvem',
    descricao: 'Como proteger dados e serviços hospedados em provedores de nuvem.',
    conteudo: `
      <p>A computação em nuvem permite usar servidores, armazenamento e serviços sob demanda pela internet. Com a migração massiva de empresas para provedores como AWS, Azure e Google Cloud, proteger esses ambientes tornou-se prioridade.</p>
      <h3>Aula 1 — Responsabilidade compartilhada</h3>
      <p>Na nuvem, a segurança é dividida: o provedor cuida da infraestrutura (segurança "da" nuvem) e o cliente cuida da configuração, dos acessos e dos dados (segurança "na" nuvem). Confundir esses papéis é uma das maiores causas de incidentes.</p>
      <h3>Aula 2 — Erros de configuração</h3>
      <p>Vazamentos frequentes acontecem por configurações erradas — como um "bucket" de armazenamento deixado público por engano. Controle de acesso rigoroso, criptografia dos dados e monitoramento contínuo são fundamentais.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Aplique o princípio do menor privilégio nas permissões</li>
        <li>Verifique se armazenamentos não estão públicos sem necessidade</li>
        <li>Ative logs e alertas para detectar acessos anômalos</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'No modelo de responsabilidade compartilhada, quem é responsável por configurar corretamente os acessos aos dados?',
        alternativas: [['O cliente', 1], ['Somente o provedor', 0], ['Ninguém', 0], ['O usuário final anônimo', 0]]
      },
      {
        enunciado: 'Qual é uma causa muito comum de vazamentos na nuvem?',
        alternativas: [
          ['Configuração incorreta de armazenamento', 1],
          ['Excesso de criptografia', 0],
          ['Uso de senhas fortes', 0],
          ['Backups frequentes', 0]
        ]
      },
      {
        enunciado: 'Qual boa prática reduz o risco de acessos indevidos na nuvem?',
        alternativas: [['Princípio do menor privilégio', 1], ['Compartilhar a senha com todos', 0], ['Desligar os logs', 0], ['Deixar tudo público', 0]]
      }
    ]
  },
  {
    titulo: 'Risco cibernético',
    descricao: 'Como identificar, medir e tratar os riscos digitais de uma organização.',
    conteudo: `
      <p>Risco cibernético é a probabilidade de um evento digital causar dano — financeiro, operacional ou de reputação. Gerenciar risco não é eliminar todas as ameaças (impossível), mas priorizar o que mais importa com os recursos disponíveis.</p>
      <h3>Aula 1 — A equação do risco</h3>
      <p>De forma simples, o risco combina três fatores: ameaça (quem pode atacar), vulnerabilidade (a fraqueza explorável) e impacto (o quanto a organização perde). Quanto maiores esses fatores, maior o risco.</p>
      <h3>Aula 2 — Como tratar</h3>
      <p>Diante de um risco, há quatro caminhos: mitigar (reduzir com controles), transferir (ex.: seguro cibernético), aceitar (assumir de forma consciente) ou evitar (deixar de fazer a atividade arriscada).</p>
      <h3>Na prática</h3>
      <ul>
        <li>Liste seus ativos mais valiosos e o que aconteceria se fossem comprometidos</li>
        <li>Priorize a correção das vulnerabilidades de maior impacto</li>
        <li>Reavalie os riscos periodicamente — eles mudam com o tempo</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'Quais fatores combinados definem o risco cibernético?',
        alternativas: [
          ['Ameaça, vulnerabilidade e impacto', 1],
          ['Cor, tamanho e peso', 0],
          ['Preço, marca e modelo', 0],
          ['Hora, dia e mês', 0]
        ]
      },
      {
        enunciado: 'Contratar um seguro cibernético é um exemplo de qual tratamento de risco?',
        alternativas: [['Transferir o risco', 1], ['Ignorar o risco', 0], ['Criar o risco', 0], ['Esconder o risco', 0]]
      },
      {
        enunciado: 'O objetivo da gestão de risco é:',
        alternativas: [
          ['Priorizar e reduzir os riscos mais relevantes', 1],
          ['Eliminar 100% de todas as ameaças', 0],
          ['Ignorar ameaças pequenas e grandes', 0],
          ['Aumentar as vulnerabilidades', 0]
        ]
      }
    ]
  },
  {
    titulo: 'Ciberataques e violações de dados',
    descricao: 'Os principais tipos de ataque e como ocorrem os vazamentos de dados.',
    conteudo: `
      <p>Um ciberataque é qualquer tentativa de acessar, danificar ou roubar informações de sistemas. Quando dados sensíveis são expostos ou roubados, temos uma violação (ou vazamento) de dados, que pode gerar prejuízos enormes e multas legais.</p>
      <h3>Aula 1 — Tipos de ataque</h3>
      <p>Os mais comuns incluem phishing (enganar pessoas), malware e ransomware (softwares maliciosos), ataques de força bruta (adivinhar senhas), DDoS (derrubar serviços) e exploração de vulnerabilidades. Muitos combinam técnicas em várias etapas.</p>
      <h3>Aula 2 — Anatomia de uma violação</h3>
      <p>Uma violação costuma seguir fases: reconhecimento, invasão inicial, movimentação lateral pela rede, escalonamento de privilégios e, por fim, roubo ou sequestro dos dados. Detectar cedo em qualquer fase reduz muito o dano.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Tenha um plano de resposta a incidentes definido antes de precisar dele</li>
        <li>Monitore acessos e comportamentos incomuns na rede</li>
        <li>Notifique os afetados e as autoridades quando exigido por lei</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'O que caracteriza uma violação de dados?',
        alternativas: [
          ['A exposição ou roubo de informações sensíveis', 1],
          ['A atualização de um software', 0],
          ['A criação de uma senha forte', 0],
          ['O envio de um e-mail legítimo', 0]
        ]
      },
      {
        enunciado: 'Um ataque que tenta tornar um serviço indisponível sobrecarregando-o é chamado de:',
        alternativas: [['DDoS', 1], ['Backup', 0], ['Firewall', 0], ['Patch', 0]]
      },
      {
        enunciado: '"Movimentação lateral" em um ataque significa:',
        alternativas: [
          ['O atacante se espalhando por outros sistemas da rede', 1],
          ['Mover o mouse para o lado', 0],
          ['Trocar a senha do administrador', 0],
          ['Reiniciar o computador', 0]
        ]
      }
    ]
  },
  {
    titulo: 'Análise de cibersegurança',
    descricao: 'Uso de dados e métricas para detectar ameaças e apoiar decisões de segurança.',
    conteudo: `
      <p>A análise (analytics) em cibersegurança transforma grandes volumes de logs e eventos em informação útil, ajudando a detectar ataques, medir a eficácia das defesas e prever tendências de risco.</p>
      <h3>Aula 1 — De dados a decisões</h3>
      <p>Sistemas coletam eventos de firewalls, servidores, endpoints e aplicações. Ferramentas de SIEM (Security Information and Event Management) centralizam e correlacionam esses dados para gerar alertas quando algo suspeito acontece.</p>
      <h3>Aula 2 — Detecção de anomalias</h3>
      <p>Além de regras fixas, técnicas de estatística e inteligência artificial identificam comportamentos fora do padrão — como um usuário acessando arquivos que nunca abriu ou logins em horários incomuns, sinais possíveis de invasão.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Centralize os logs para ter uma visão única do ambiente</li>
        <li>Defina o que é "normal" para reconhecer o que é anômalo</li>
        <li>Reduza falsos positivos ajustando os alertas continuamente</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'Qual tipo de ferramenta centraliza e correlaciona logs para gerar alertas de segurança?',
        alternativas: [['SIEM', 1], ['Editor de texto', 0], ['Planilha comum', 0], ['Navegador', 0]]
      },
      {
        enunciado: 'A detecção de anomalias procura identificar:',
        alternativas: [
          ['Comportamentos fora do padrão normal', 1],
          ['Somente e-mails de marketing', 0],
          ['O melhor papel de parede', 0],
          ['Erros de português nos textos', 0]
        ]
      },
      {
        enunciado: 'Por que reduzir falsos positivos é importante?',
        alternativas: [
          ['Para a equipe não ignorar alertas por excesso de ruído', 1],
          ['Para deixar o sistema mais lento', 0],
          ['Para gerar mais alertas irrelevantes', 0],
          ['Para desligar o monitoramento', 0]
        ]
      }
    ]
  },
  {
    titulo: 'Operações de cibersegurança',
    descricao: 'O dia a dia do SOC: monitorar, detectar e responder a incidentes.',
    conteudo: `
      <p>As operações de segurança (SecOps) são as atividades contínuas de defesa de uma organização, geralmente centralizadas em um SOC (Security Operations Center) — a "sala de comando" que vigia os sistemas 24 horas por dia.</p>
      <h3>Aula 1 — O papel do SOC</h3>
      <p>O SOC monitora alertas, investiga eventos suspeitos, contém ameaças e coordena a resposta a incidentes. Costuma trabalhar em níveis (tiers): analistas de nível 1 triam alertas, e níveis mais altos investigam casos complexos.</p>
      <h3>Aula 2 — Resposta a incidentes</h3>
      <p>Um bom processo segue etapas: preparação, identificação, contenção, erradicação, recuperação e lições aprendidas. Ter esse plano pronto reduz o tempo de resposta e o impacto de um ataque.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Documente e ensaie o plano de resposta a incidentes</li>
        <li>Meça indicadores como o tempo para detectar e conter ameaças</li>
        <li>Automatize tarefas repetitivas para o time focar no que importa</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'O que é um SOC?',
        alternativas: [
          ['Centro de operações de segurança que monitora e responde a ameaças', 1],
          ['Um tipo de vírus', 0],
          ['Um modelo de senha', 0],
          ['Um cabo de rede', 0]
        ]
      },
      {
        enunciado: 'Qual etapa da resposta a incidentes busca impedir que a ameaça se espalhe?',
        alternativas: [['Contenção', 1], ['Divulgação pública', 0], ['Compra de hardware', 0], ['Marketing', 0]]
      },
      {
        enunciado: 'Analistas de nível 1 em um SOC normalmente:',
        alternativas: [
          ['Fazem a triagem inicial dos alertas', 1],
          ['Cuidam do refeitório', 0],
          ['Definem o orçamento anual', 0],
          ['Projetam o logotipo da empresa', 0]
        ]
      }
    ]
  },
  {
    titulo: 'Privacidade de dados',
    descricao: 'Como proteger informações pessoais e cumprir leis como a LGPD.',
    conteudo: `
      <p>Privacidade de dados é o direito das pessoas de controlarem como suas informações pessoais são coletadas, usadas e compartilhadas. Vai além da segurança técnica: envolve ética, transparência e conformidade legal.</p>
      <h3>Aula 1 — LGPD e dados pessoais</h3>
      <p>No Brasil, a LGPD (Lei Geral de Proteção de Dados) regula o tratamento de dados pessoais. Dados como nome, CPF, e-mail e biometria só podem ser usados com base legal (como consentimento) e para finalidades claras. Na Europa, a lei equivalente é o GDPR.</p>
      <h3>Aula 2 — Princípios essenciais</h3>
      <p>Boas práticas incluem coletar apenas o necessário (minimização), informar claramente o uso, permitir que a pessoa acesse e apague seus dados, e proteger tudo com segurança adequada.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Colete somente os dados realmente necessários</li>
        <li>Seja transparente sobre como os dados serão usados</li>
        <li>Garanta o direito de acesso, correção e exclusão dos dados</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'Qual lei brasileira regula a proteção de dados pessoais?',
        alternativas: [['LGPD', 1], ['CLT', 0], ['Lei Seca', 0], ['Código de Trânsito', 0]]
      },
      {
        enunciado: 'O princípio da "minimização" de dados significa:',
        alternativas: [
          ['Coletar apenas os dados necessários para a finalidade', 1],
          ['Coletar o máximo de dados possível', 0],
          ['Vender todos os dados', 0],
          ['Nunca proteger os dados', 0]
        ]
      },
      {
        enunciado: 'Segundo a LGPD, a pessoa tem direito de:',
        alternativas: [
          ['Acessar, corrigir e excluir seus dados', 1],
          ['Nunca saber onde estão seus dados', 0],
          ['Proibir qualquer empresa de existir', 0],
          ['Alterar leis nacionais', 0]
        ]
      }
    ]
  },
  {
    titulo: 'Segurança de endpoint',
    descricao: 'Proteção de computadores, celulares e outros dispositivos finais.',
    conteudo: `
      <p>Endpoints são os dispositivos que se conectam à rede: notebooks, desktops, celulares e servidores. Como são a porta de entrada mais usada pelos atacantes, protegê-los é uma das bases da defesa.</p>
      <h3>Aula 1 — Além do antivírus</h3>
      <p>O antivírus tradicional detecta ameaças conhecidas. Soluções modernas de EDR (Endpoint Detection and Response) vão além: monitoram o comportamento do dispositivo, detectam ataques novos e permitem responder rapidamente, isolando a máquina infectada.</p>
      <h3>Aula 2 — Higiene do dispositivo</h3>
      <p>Manter o sistema e os programas atualizados fecha brechas conhecidas. Criptografia de disco, controle de aplicativos e bloqueio automático de tela completam a proteção, especialmente em dispositivos móveis que podem ser perdidos ou roubados.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Ative atualizações automáticas do sistema e dos aplicativos</li>
        <li>Use criptografia de disco em notebooks e celulares</li>
        <li>Instale apenas softwares de fontes confiáveis</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'O que é um "endpoint"?',
        alternativas: [
          ['Um dispositivo final conectado à rede, como um notebook', 1],
          ['Uma senha muito longa', 0],
          ['Um tipo de cabo elétrico', 0],
          ['Um vírus específico', 0]
        ]
      },
      {
        enunciado: 'Qual é a principal vantagem do EDR sobre o antivírus tradicional?',
        alternativas: [
          ['Detectar ameaças novas pelo comportamento e responder rápido', 1],
          ['Deixar o computador mais lento de propósito', 0],
          ['Apagar todos os arquivos do usuário', 0],
          ['Substituir o teclado', 0]
        ]
      },
      {
        enunciado: 'Por que criptografar o disco de um notebook?',
        alternativas: [
          ['Para proteger os dados caso ele seja perdido ou roubado', 1],
          ['Para aumentar o brilho da tela', 0],
          ['Para deixar a bateria durar mais', 0],
          ['Para trocar o sistema operacional', 0]
        ]
      }
    ]
  },
  {
    titulo: 'Segurança ICS/OT',
    descricao: 'Proteção de sistemas industriais e de infraestruturas críticas.',
    conteudo: `
      <p>ICS (Sistemas de Controle Industrial) e OT (Tecnologia Operacional) são os sistemas que controlam fábricas, usinas de energia, tratamento de água e outras infraestruturas críticas. Um ataque aqui pode ter consequências físicas graves.</p>
      <h3>Aula 1 — TI x OT</h3>
      <p>Diferente da TI comum, na OT a prioridade é a disponibilidade e a segurança física do processo. Muitos equipamentos são antigos, difíceis de atualizar e foram criados sem pensar em segurança digital, o que aumenta os riscos.</p>
      <h3>Aula 2 — Ameaças reais</h3>
      <p>Casos como o worm Stuxnet mostraram que ataques podem sabotar equipamentos físicos. Por isso, segmentar a rede (separar OT da TI e da internet) e controlar rigorosamente os acessos são medidas essenciais.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Separe (segmente) a rede industrial das redes corporativas</li>
        <li>Controle e monitore quem acessa os sistemas de controle</li>
        <li>Planeje atualizações com cuidado, sem parar processos críticos</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'O que os sistemas ICS/OT controlam?',
        alternativas: [
          ['Processos industriais e infraestruturas críticas', 1],
          ['Apenas jogos de videogame', 0],
          ['Somente redes sociais', 0],
          ['Apenas planilhas de escritório', 0]
        ]
      },
      {
        enunciado: 'Na tecnologia operacional (OT), qual costuma ser a maior prioridade?',
        alternativas: [
          ['Disponibilidade e segurança física do processo', 1],
          ['A cor da interface', 0],
          ['O número de curtidas', 0],
          ['O peso do equipamento', 0]
        ]
      },
      {
        enunciado: 'Qual ataque famoso demonstrou a sabotagem de equipamentos industriais?',
        alternativas: [['Stuxnet', 1], ['Tetris', 0], ['Bluetooth', 0], ['Wi-Fi', 0]]
      }
    ]
  },
  {
    titulo: 'Segurança de gerenciamento de identidade e acesso',
    descricao: 'Controlar quem é quem e o que cada um pode fazer (IAM).',
    conteudo: `
      <p>O gerenciamento de identidade e acesso (IAM) garante que as pessoas certas tenham o acesso certo, aos recursos certos, na hora certa. É a base para impedir que invasores (ou usuários indevidos) cheguem a informações sensíveis.</p>
      <h3>Aula 1 — Autenticação x autorização</h3>
      <p>Autenticação é provar quem você é (senha, biometria, token). Autorização é definir o que você pode fazer depois de autenticado. A autenticação em duas etapas (2FA/MFA) adiciona uma camada extra, essencial contra o roubo de senhas.</p>
      <h3>Aula 2 — Menor privilégio e Zero Trust</h3>
      <p>Cada pessoa deve ter apenas os acessos necessários (menor privilégio). O modelo Zero Trust vai além: "nunca confie, sempre verifique", checando cada acesso continuamente, mesmo dentro da rede.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Ative a autenticação em duas etapas sempre que possível</li>
        <li>Revise periodicamente quem tem acesso a quê</li>
        <li>Remova acessos assim que a pessoa muda de função ou sai</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'Qual a diferença entre autenticação e autorização?',
        alternativas: [
          ['Autenticação prova quem você é; autorização define o que você pode fazer', 1],
          ['São exatamente a mesma coisa', 0],
          ['Autenticação é sobre design; autorização, sobre cores', 0],
          ['Nenhuma tem relação com segurança', 0]
        ]
      },
      {
        enunciado: 'O que a autenticação em duas etapas (2FA) adiciona?',
        alternativas: [
          ['Uma camada extra além da senha', 1],
          ['Mais anúncios', 0],
          ['Uma senha mais fraca', 0],
          ['Acesso automático para todos', 0]
        ]
      },
      {
        enunciado: 'O princípio do menor privilégio recomenda:',
        alternativas: [
          ['Dar a cada usuário apenas os acessos necessários', 1],
          ['Dar acesso de administrador a todos', 0],
          ['Nunca usar senhas', 0],
          ['Compartilhar contas entre times', 0]
        ]
      }
    ]
  },
  {
    titulo: 'Ameaças internas',
    descricao: 'Riscos que vêm de dentro: funcionários, parceiros e contas comprometidas.',
    conteudo: `
      <p>Nem toda ameaça vem de fora. Ameaças internas (insider threats) partem de pessoas com acesso legítimo — funcionários, ex-funcionários, terceiros — que, por má intenção ou descuido, causam danos.</p>
      <h3>Aula 1 — Intencional x acidental</h3>
      <p>Há o insider malicioso (que rouba ou sabota de propósito) e o insider negligente (que erra sem querer, como enviar um arquivo para o destinatário errado ou cair em um golpe). Ambos são perigosos e comuns.</p>
      <h3>Aula 2 — Como reduzir</h3>
      <p>Combinam-se controles técnicos (menor privilégio, monitoramento de acessos) e humanos (treinamento, cultura de segurança). Detectar mudanças de comportamento — como downloads em massa — ajuda a identificar casos suspeitos.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Limite acessos ao mínimo necessário para cada função</li>
        <li>Monitore ações sensíveis, como cópias grandes de dados</li>
        <li>Revogue acessos imediatamente no desligamento de pessoas</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'O que é uma ameaça interna?',
        alternativas: [
          ['Risco causado por alguém com acesso legítimo à organização', 1],
          ['Um vírus vindo da internet', 0],
          ['Uma falha de energia', 0],
          ['Um problema de impressora', 0]
        ]
      },
      {
        enunciado: 'Enviar um arquivo confidencial ao destinatário errado é exemplo de:',
        alternativas: [['Insider negligente (acidental)', 1], ['Ataque DDoS', 0], ['Firewall', 0], ['Backup', 0]]
      },
      {
        enunciado: 'Qual medida ajuda a reduzir ameaças internas?',
        alternativas: [
          ['Revogar acessos assim que a pessoa sai da empresa', 1],
          ['Dar acesso total a todos', 0],
          ['Nunca treinar os funcionários', 0],
          ['Compartilhar todas as senhas', 0]
        ]
      }
    ]
  },
  {
    titulo: 'IoT (Internet das Coisas)',
    descricao: 'Segurança de dispositivos conectados: câmeras, sensores e eletrodomésticos.',
    conteudo: `
      <p>A Internet das Coisas (IoT) conecta objetos do dia a dia à rede: câmeras, fechaduras, TVs, sensores industriais e até geladeiras. Essa comodidade traz uma superfície de ataque enorme e muitas vezes mal protegida.</p>
      <h3>Aula 1 — Por que são vulneráveis</h3>
      <p>Muitos dispositivos IoT vêm com senhas padrão fáceis, raramente recebem atualizações e têm pouca capacidade de segurança. Já foram usados para formar "botnets" gigantes, como a Mirai, que derrubou grandes serviços da internet.</p>
      <h3>Aula 2 — Como proteger</h3>
      <p>Trocar as senhas de fábrica, manter o firmware atualizado e isolar os dispositivos em uma rede separada (por exemplo, uma rede Wi-Fi só para IoT) reduzem bastante o risco.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Troque imediatamente as senhas padrão dos dispositivos</li>
        <li>Mantenha o firmware atualizado</li>
        <li>Coloque dispositivos IoT em uma rede separada da principal</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'Por que muitos dispositivos IoT são vulneráveis?',
        alternativas: [
          ['Vêm com senhas padrão fracas e recebem poucas atualizações', 1],
          ['São grandes demais', 0],
          ['Não se conectam à internet', 0],
          ['Têm segurança perfeita de fábrica', 0]
        ]
      },
      {
        enunciado: 'A botnet Mirai ficou famosa por:',
        alternativas: [
          ['Usar dispositivos IoT para derrubar serviços da internet', 1],
          ['Melhorar a velocidade da internet', 0],
          ['Proteger câmeras de segurança', 0],
          ['Criar senhas fortes automaticamente', 0]
        ]
      },
      {
        enunciado: 'Qual boa prática ajuda a proteger a IoT em casa?',
        alternativas: [
          ['Isolar os dispositivos em uma rede separada', 1],
          ['Manter a senha padrão de fábrica', 0],
          ['Nunca atualizar o firmware', 0],
          ['Conectar tudo sem senha', 0]
        ]
      }
    ]
  },
  {
    titulo: 'Segurança Móvel',
    descricao: 'Proteção de smartphones, tablets e dos dados que eles carregam.',
    conteudo: `
      <p>Celulares e tablets concentram e-mails, bancos, fotos e senhas. Por serem portáteis e estarem sempre online, exigem cuidados específicos de segurança.</p>
      <h3>Aula 1 — Riscos principais</h3>
      <p>As maiores ameaças são: aplicativos maliciosos (fora das lojas oficiais), phishing por SMS ("smishing"), redes Wi-Fi públicas inseguras e a perda ou roubo do aparelho com dados desprotegidos.</p>
      <h3>Aula 2 — Defesas essenciais</h3>
      <p>Bloqueio de tela com senha/biometria, instalação de apps apenas de lojas oficiais, revisão das permissões concedidas e ativação do recurso de localizar/apagar o aparelho remotamente formam a base da proteção.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Baixe apps somente das lojas oficiais e confira as permissões</li>
        <li>Use bloqueio de tela e criptografia</li>
        <li>Evite tarefas sensíveis em Wi-Fi público sem VPN</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'O golpe de phishing enviado por mensagens SMS é chamado de:',
        alternativas: [['Smishing', 1], ['Firewall', 0], ['Cookie', 0], ['Cache', 0]]
      },
      {
        enunciado: 'De onde é mais seguro instalar aplicativos?',
        alternativas: [
          ['Das lojas oficiais do sistema', 1],
          ['De links recebidos por SMS de desconhecidos', 0],
          ['De qualquer site aleatório', 0],
          ['De anúncios pop-up', 0]
        ]
      },
      {
        enunciado: 'Ao usar Wi-Fi público para tarefas sensíveis, é recomendável:',
        alternativas: [['Usar uma VPN', 1], ['Desligar a tela', 0], ['Aumentar o volume', 0], ['Apagar os contatos', 0]]
      }
    ]
  },
  {
    titulo: 'Perímetro',
    descricao: 'As defesas de borda da rede e por que elas já não bastam sozinhas.',
    conteudo: `
      <p>O perímetro é a "fronteira" entre a rede interna de uma organização e o mundo externo (a internet). Historicamente, a segurança se concentrava em blindar essa borda, como um castelo com muralhas.</p>
      <h3>Aula 1 — Defesas de borda</h3>
      <p>Firewalls filtram o tráfego que entra e sai; IDS/IPS detectam e bloqueiam ataques; VPNs criam túneis seguros para acesso remoto. Essas ferramentas continuam importantes para controlar quem entra.</p>
      <h3>Aula 2 — O fim do perímetro tradicional</h3>
      <p>Com nuvem, trabalho remoto e dispositivos móveis, os dados estão em todo lugar — não há mais uma muralha única. Por isso o modelo Zero Trust ganhou força: em vez de confiar em quem "está dentro", verifica-se cada acesso.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Mantenha firewalls e regras de acesso bem configurados</li>
        <li>Não confie em um dispositivo só por ele estar "dentro" da rede</li>
        <li>Combine defesas de borda com verificação contínua (Zero Trust)</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'Qual ferramenta filtra o tráfego que entra e sai da rede?',
        alternativas: [['Firewall', 1], ['Impressora', 0], ['Planilha', 0], ['Mouse', 0]]
      },
      {
        enunciado: 'Por que o perímetro tradicional perdeu força?',
        alternativas: [
          ['Nuvem, mobilidade e trabalho remoto espalharam os dados', 1],
          ['Os firewalls ficaram mais baratos', 0],
          ['A internet deixou de existir', 0],
          ['Ninguém mais usa senhas', 0]
        ]
      },
      {
        enunciado: 'O modelo Zero Trust propõe:',
        alternativas: [
          ['Nunca confiar por padrão e sempre verificar cada acesso', 1],
          ['Confiar em todos que estão na rede interna', 0],
          ['Remover todas as senhas', 0],
          ['Desligar os firewalls', 0]
        ]
      }
    ]
  },
  {
    titulo: 'Segurança física',
    descricao: 'Proteger pessoas, equipamentos e instalações no mundo real.',
    conteudo: `
      <p>Segurança física trata da proteção do mundo real: prédios, servidores, equipamentos e as próprias pessoas. Não adianta ter a melhor defesa digital se qualquer um pode entrar na sala dos servidores.</p>
      <h3>Aula 1 — Controle de acesso físico</h3>
      <p>Crachás, catracas, biometria, câmeras (CFTV) e guardas controlam quem entra em cada área. Datacenters costumam ter várias camadas de proteção antes de se chegar aos equipamentos.</p>
      <h3>Aula 2 — O elo com o digital</h3>
      <p>Ataques físicos podem virar digitais: um pen drive malicioso deixado no estacionamento, uma pessoa "pegando carona" por uma porta (tailgating) ou o roubo de um notebook. Proteger o físico é parte da segurança da informação.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Não permita que estranhos entrem "de carona" em áreas restritas</li>
        <li>Nunca conecte pen drives desconhecidos ao computador</li>
        <li>Guarde e bloqueie equipamentos ao se ausentar</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'Entrar em uma área restrita "pegando carona" atrás de alguém autorizado é chamado de:',
        alternativas: [['Tailgating', 1], ['Backup', 0], ['Firewall', 0], ['Streaming', 0]]
      },
      {
        enunciado: 'Por que a segurança física importa para a segurança da informação?',
        alternativas: [
          ['O acesso físico a equipamentos pode comprometer os dados', 1],
          ['Ela não tem nenhuma relação', 0],
          ['Serve apenas para decoração', 0],
          ['Só afeta o marketing', 0]
        ]
      },
      {
        enunciado: 'Encontrar um pen drive desconhecido e conectá-lo ao PC é:',
        alternativas: [
          ['Arriscado, pois pode conter malware', 1],
          ['Totalmente seguro', 0],
          ['Recomendado sempre', 0],
          ['Uma forma de acelerar o PC', 0]
        ]
      }
    ]
  },
  {
    titulo: 'Força de trabalho remota',
    descricao: 'Segurança para quem trabalha de casa ou de qualquer lugar.',
    conteudo: `
      <p>O trabalho remoto e híbrido se tornou comum, mas tirou os funcionários da rede protegida do escritório. Isso amplia a superfície de ataque: redes domésticas, dispositivos pessoais e distrações do dia a dia.</p>
      <h3>Aula 1 — Riscos do home office</h3>
      <p>Redes Wi-Fi domésticas mal configuradas, uso de equipamentos pessoais sem proteção, compartilhamento de dispositivos com a família e maior exposição a golpes de phishing são desafios comuns.</p>
      <h3>Aula 2 — Como trabalhar com segurança</h3>
      <p>VPN corporativa, dispositivos gerenciados pela empresa, autenticação em duas etapas e boas práticas de senha ajudam a manter a proteção fora do escritório. A conscientização do usuário é decisiva.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Use a VPN da empresa para acessar sistemas internos</li>
        <li>Mantenha uma senha forte no seu Wi-Fi doméstico</li>
        <li>Separe, quando possível, o dispositivo de trabalho do pessoal</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'O que ajuda a proteger a conexão de quem trabalha remotamente aos sistemas da empresa?',
        alternativas: [['VPN corporativa', 1], ['Deixar tudo aberto', 0], ['Wi-Fi sem senha', 0], ['Compartilhar a conta', 0]]
      },
      {
        enunciado: 'Por que o trabalho remoto amplia a superfície de ataque?',
        alternativas: [
          ['Os funcionários saem da rede protegida do escritório', 1],
          ['A internet fica mais rápida', 0],
          ['Os computadores ficam mais seguros sozinhos', 0],
          ['Ninguém usa senhas em casa', 0]
        ]
      },
      {
        enunciado: 'Uma boa prática no home office é:',
        alternativas: [
          ['Usar senha forte no Wi-Fi e 2FA nas contas', 1],
          ['Desativar todas as proteções', 0],
          ['Usar a mesma senha em tudo', 0],
          ['Clicar em todos os links recebidos', 0]
        ]
      }
    ]
  },
  {
    titulo: 'Inteligência de Ameaças',
    descricao: 'Conhecer os atacantes e antecipar suas táticas (Threat Intelligence).',
    conteudo: `
      <p>Inteligência de ameaças (Threat Intelligence) é a coleta e análise de informações sobre atacantes, suas ferramentas e objetivos. Saber quem pode atacar e como permite defender-se de forma proativa, em vez de apenas reagir.</p>
      <h3>Aula 1 — Tipos de inteligência</h3>
      <p>Ela pode ser estratégica (tendências para a liderança decidir), tática (técnicas e procedimentos dos atacantes) e operacional/técnica (indicadores concretos, como IPs e hashes maliciosos, os IoCs).</p>
      <h3>Aula 2 — Colocando em uso</h3>
      <p>Frameworks como o MITRE ATT&amp;CK organizam as táticas e técnicas usadas por adversários. Compartilhar indicadores entre organizações e alimentar as defesas com essas informações aumenta muito a capacidade de detecção.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Acompanhe fontes confiáveis de inteligência sobre ameaças</li>
        <li>Use indicadores (IoCs) para reforçar suas defesas</li>
        <li>Estude as táticas dos atacantes com o MITRE ATT&amp;CK</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'O que é inteligência de ameaças?',
        alternativas: [
          ['Coletar e analisar informações sobre atacantes e suas táticas', 1],
          ['Um tipo de antivírus', 0],
          ['Uma senha inteligente', 0],
          ['Um cabo de rede especial', 0]
        ]
      },
      {
        enunciado: 'IoCs (Indicadores de Comprometimento) são, por exemplo:',
        alternativas: [
          ['IPs e hashes associados a atividades maliciosas', 1],
          ['Cores de um logotipo', 0],
          ['Nomes de funcionários', 0],
          ['Modelos de cadeira', 0]
        ]
      },
      {
        enunciado: 'Qual framework organiza as táticas e técnicas dos atacantes?',
        alternativas: [['MITRE ATT&CK', 1], ['HTML5', 0], ['USB 3.0', 0], ['PDF', 0]]
      }
    ]
  },
  {
    titulo: 'Vulnerabilidades e Ameaças',
    descricao: 'A diferença entre fraquezas, ameaças e como gerenciá-las.',
    conteudo: `
      <p>Entender os conceitos básicos é essencial: vulnerabilidade é uma fraqueza que pode ser explorada; ameaça é algo ou alguém que pode explorá-la; e exploit é a técnica ou código que aproveita a falha.</p>
      <h3>Aula 1 — Vulnerabilidades e correções</h3>
      <p>Falhas de software recebem identificadores públicos (CVE) e uma nota de gravidade (CVSS). Corrigi-las com atualizações (patches) o quanto antes é uma das defesas mais eficazes que existem.</p>
      <h3>Aula 2 — O perigo do "dia zero"</h3>
      <p>Uma vulnerabilidade "zero-day" é aquela que ainda não tem correção disponível — os atacantes a conhecem antes dos defensores. Por isso, além de corrigir, é importante ter defesas em camadas que reduzam o impacto de falhas desconhecidas.</p>
      <h3>Na prática</h3>
      <ul>
        <li>Aplique atualizações de segurança com prioridade</li>
        <li>Mantenha um inventário do que precisa ser corrigido</li>
        <li>Use defesas em camadas para conter o que não pôde ser evitado</li>
      </ul>
    `,
    quiz: [
      {
        enunciado: 'Qual a diferença entre vulnerabilidade e ameaça?',
        alternativas: [
          ['Vulnerabilidade é a fraqueza; ameaça é o que pode explorá-la', 1],
          ['São exatamente a mesma coisa', 0],
          ['Vulnerabilidade é um tipo de cabo', 0],
          ['Ameaça é uma atualização de software', 0]
        ]
      },
      {
        enunciado: 'O que é uma vulnerabilidade "zero-day"?',
        alternativas: [
          ['Uma falha ainda sem correção disponível', 1],
          ['Uma falha já corrigida há anos', 0],
          ['Um tipo de senha forte', 0],
          ['Um backup automático', 0]
        ]
      },
      {
        enunciado: 'Qual é uma das defesas mais eficazes contra vulnerabilidades conhecidas?',
        alternativas: [
          ['Aplicar atualizações (patches) rapidamente', 1],
          ['Nunca atualizar nada', 0],
          ['Desligar o antivírus', 0],
          ['Usar senhas fracas', 0]
        ]
      }
    ]
  }
];

// ---------------------------------------------------------------------------

function run(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params || [], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

async function seed() {
  // Limpa o conteúdo antigo de tópicos/quiz (recria do zero)
  await run(`DELETE FROM alternativas`);
  await run(`DELETE FROM perguntas`);
  await run(`DELETE FROM topicos`);

  for (let i = 0; i < topicos.length; i++) {
    const t = topicos[i];
    const topicoId = await run(
      `INSERT INTO topicos (titulo, descricao, ordem, conteudo) VALUES (?, ?, ?, ?)`,
      [t.titulo, t.descricao, i + 1, t.conteudo]
    );

    for (const pergunta of t.quiz) {
      const perguntaId = await run(
        `INSERT INTO perguntas (topico_id, enunciado) VALUES (?, ?)`,
        [topicoId, pergunta.enunciado]
      );
      for (const [texto, correta] of pergunta.alternativas) {
        await run(
          `INSERT INTO alternativas (pergunta_id, texto, correta) VALUES (?, ?, ?)`,
          [perguntaId, texto, correta]
        );
      }
    }
    console.log(`✅ ${i + 1}. ${t.titulo}`);
  }

  console.log(`\n${topicos.length} tópicos inseridos (com aulas e quizzes).`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Erro ao popular tópicos:', err);
  process.exit(1);
});
