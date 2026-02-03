const feed = document.querySelector('#feed');
const loader = document.querySelector('#loader');
let postCount = 1;
let isLoading = false; // Flag para controlar carregamento

// 1. Função que cria os elementos na tela
const createPosts = (quantity = 5) => {
  for (let i = 0; i < quantity; i++) {
    const post = document.createElement('div');
    post.classList.add('post');
    post.innerHTML = `
      <h3>Post Número ${postCount}</h3>
      <p>Este é um conteúdo gerado dinamicamente para testar o scroll infinito. Post criado às ${new Date().toLocaleTimeString()}.</p>
    `;
    feed.appendChild(post);
    postCount++;
  }
};

// 2. Lógica de detecção com Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log('isIntersecting:', entry.isIntersecting);
      console.log('Target:', entry.target);
      console.log('Time:', new Date().toLocaleTimeString());
    });

    if (entries[0].isIntersecting && !isLoading) {
      isLoading = true; // Marca como carregando
      loader.style.opacity = 1; // Mostra o loader

      setTimeout(() => {
        createPosts(5);
        isLoading = false; // Marca como finalizado
        loader.style.opacity = 0; // Esconde o loader
      }, 1500);
    }
  },
  {
    rootMargin: '100px',
    threshold: 0.1,
  }
);

// 3. Iniciar o observador no elemento loader
observer.observe(loader);

// 4. Carregar os primeiros itens logo de cara
createPosts(10);
