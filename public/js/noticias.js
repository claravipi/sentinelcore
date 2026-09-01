let noticiasCarregadas = [];
let indiceAtual = 0;
let intervaloCarrossel = null;

async function carregarNoticias() {
  try {
    const resposta = await fetch('/api/noticias');
    if (!resposta.ok) return;

    const noticias = await resposta.json();
    noticiasCarregadas = noticias;

    montarBanner(noticias.slice(0, 5)); // as 5 mais recentes viram o banner

  } catch (erro) {
    console.error('Erro ao carregar notícias:', erro);
  }
}

function montarBanner(noticias) {
  const container = document.getElementById('banner-noticias');
  const dotsContainer = document.getElementById('banner-dots');

  if (noticias.length === 0) return;

  container.innerHTML = noticias.map((noticia, index) => `
    <a href="${noticia.url}" target="_blank" rel="noopener noreferrer"
       class="banner-slide ${index === 0 ? 'ativo' : ''}"
       style="background-image: url('${noticia.imagem}')">
      <div class="banner-slide-overlay">
        <div class="banner-slide-fonte">${noticia.fonte}</div>
        <div class="banner-slide-titulo">${noticia.titulo}</div>
      </div>
    </a>
  `).join('');

  dotsContainer.innerHTML = noticias.map((_, index) => `
    <button class="banner-dot ${index === 0 ? 'ativo' : ''}" data-index="${index}"></button>
  `).join('');

  dotsContainer.querySelectorAll('.banner-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      irParaSlide(Number(dot.dataset.index));
      reiniciarAutoplay(noticias.length);
    });
  });

  // Setas de navegação (anterior / próxima)
  if (noticias.length > 1) {
    container.insertAdjacentHTML('beforeend', `
      <button class="banner-seta banner-seta-prev" aria-label="Notícia anterior">&#8249;</button>
      <button class="banner-seta banner-seta-next" aria-label="Próxima notícia">&#8250;</button>
    `);

    container.querySelector('.banner-seta-prev').addEventListener('click', (evento) => {
      evento.preventDefault();
      irParaSlide((indiceAtual - 1 + noticias.length) % noticias.length);
      reiniciarAutoplay(noticias.length);
    });

    container.querySelector('.banner-seta-next').addEventListener('click', (evento) => {
      evento.preventDefault();
      irParaSlide((indiceAtual + 1) % noticias.length);
      reiniciarAutoplay(noticias.length);
    });
  }

  iniciarAutoplay(noticias.length);
}

function irParaSlide(novoIndice) {
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.banner-dot');

  slides[indiceAtual]?.classList.remove('ativo');
  dots[indiceAtual]?.classList.remove('ativo');

  indiceAtual = novoIndice;

  slides[indiceAtual]?.classList.add('ativo');
  dots[indiceAtual]?.classList.add('ativo');
}

function iniciarAutoplay(totalSlides) {
  intervaloCarrossel = setInterval(() => {
    const proximo = (indiceAtual + 1) % totalSlides;
    irParaSlide(proximo);
  }, 5000);
}

function reiniciarAutoplay(totalSlides) {
  clearInterval(intervaloCarrossel);
  iniciarAutoplay(totalSlides);
}

carregarNoticias();