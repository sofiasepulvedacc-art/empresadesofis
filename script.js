const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Menú para celulares
menuToggle.addEventListener('click', () => {
  const opened = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Botones "Conocer más"
document.querySelectorAll('.details-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.service-card');
    const expanded = card.classList.toggle('expanded');

    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded
      ? 'Mostrar menos −'
      : 'Conocer más +';
  });
});

// Recomendaciones de experiencias
const recommendations = {
  spa: {
    title: 'Oasis Spa & Bienestar',
    text: 'Explora los cuidados estéticos y las experiencias de bienestar. Los servicios se confirmarían según las necesidades de cada mascota.'
  },
  moda: {
    title: 'The Atelier',
    text: 'Descubre Velvet & Gold, Glow-Tech y los accesorios pensados para combinar diseño y funcionalidad.'
  },
  bistro: {
    title: 'Bark & Meow Bistro',
    text: 'Conoce la propuesta gourmet y sus productos conceptuales. La alimentación debe ser adecuada para cada especie.'
  }
};

document.getElementById('recommendBtn').addEventListener('click', () => {
  const pet = document.getElementById('petType').value;
  const interest = document.getElementById('interest').value;
  const chosen = recommendations[interest];

  document.getElementById('resultTitle').textContent = chosen.title;

  let extra = '';

  if (pet === 'gato') {
    extra = ' Si te acompaña un gato, confirma que cualquier servicio o producto sea apropiado para felinos.';
  } else if (pet === 'ambos') {
    extra = ' Recuerda que perros y gatos pueden necesitar cuidados y productos diferentes.';
  }

  document.getElementById('resultText').textContent = chosen.text + extra;
  document.getElementById('quizResult').classList.add('show');
});

// Preguntas frecuentes
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const opened = item.classList.toggle('open');

    button.setAttribute('aria-expanded', String(opened));
  });
});

// Selección automática del tema en el formulario
document.querySelectorAll('[data-interest]').forEach(link => {
  link.addEventListener('click', () => {
    const topic = document.getElementById('topic');
    const wanted = link.dataset.interest;

    topic.value = wanted === 'moda'
      ? 'Atelier y accesorios'
      : 'Información general';
  });
});

// Formulario de demostración
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  document.getElementById('formMessage').style.display = 'block';
  contactForm.reset();
});

// Año automático en el pie de página
document.getElementById('year').textContent = new Date().getFullYear();

// Botón para volver arriba
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

backTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Animaciones al aparecer en pantalla
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('in-view'));
}
