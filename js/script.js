(() => {
  'use strict';

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  // Menú responsive.
  const menuToggle = $('.menu-toggle');
  const navMenu = $('.nav-menu');
  const closeMenu = () => {
    navMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  $$('.nav-menu a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  // Aparición de elementos al hacer scroll.
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // Simulador de pH.
  const phRange = $('#phRange');
  const phValue = $('#phValue');
  const phTone = $('#phTone');
  const phGlow = $('#phGlow');
  const phLip = $('#phLip');

  const getPhStyle = value => {
    const ph = Number(value);
    if (ph < 5.8) return { color: '#e77b9d', tone: 'Rosa reactivo', shadow: 'rgba(231,123,157,.38)' };
    if (ph < 6.5) return { color: '#ef806f', tone: 'Coral personalizado', shadow: 'rgba(239,128,111,.38)' };
    if (ph < 7.1) return { color: '#b96991', tone: 'Berry suave', shadow: 'rgba(185,105,145,.38)' };
    return { color: '#785687', tone: 'Mauve profundo', shadow: 'rgba(120,86,135,.38)' };
  };

  const updatePh = () => {
    const style = getPhStyle(phRange.value);
    phValue.textContent = Number(phRange.value).toFixed(1);
    phTone.textContent = style.tone;
    phGlow.style.background = style.color;
    phGlow.style.boxShadow = `0 20px 80px ${style.shadow}`;
    phLip.style.background = `linear-gradient(145deg, rgba(255,255,255,.2), ${style.color})`;
  };
  phRange?.addEventListener('input', updatePh);
  updatePh();

  // Selector de tonos.
  const toneName = $('#toneName');
  const toneDescription = $('#toneDescription');
  $$('.tone').forEach(button => {
    button.addEventListener('click', () => {
      $$('.tone').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      toneName.textContent = button.dataset.tone;
      toneDescription.textContent = button.dataset.description;
      toneName.style.color = button.dataset.color;
      toneDescription.style.borderColor = button.dataset.color;
    });
  });
  toneName.style.color = $('.tone.active')?.dataset.color || '';

  // Carrito + modal de confirmación.
  let cartCount = 0;
  const cartPill = $('#cartPill');
  const cartCountElement = $('#cartCount');
  const modal = $('#purchaseModal');
  let lastFocusedElement = null;

  const openModal = () => {
    lastFocusedElement = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    $('.modal-close', modal)?.focus();
  };
  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastFocusedElement?.focus();
  };

  $$('[data-buy]').forEach(button => button.addEventListener('click', () => {
    cartCount += 1;
    cartCountElement.textContent = cartCount;
    cartPill.classList.add('visible');
    openModal();
  }));
  $$('[data-close-modal]').forEach(element => element.addEventListener('click', closeModal));

  // Carrusel de reseñas.
  const reviews = $$('.review-card');
  let reviewIndex = 0;
  const showReview = index => {
    reviewIndex = (index + reviews.length) % reviews.length;
    reviews.forEach((review, i) => review.classList.toggle('active', i === reviewIndex));
  };
  $('#prevReview')?.addEventListener('click', () => showReview(reviewIndex - 1));
  $('#nextReview')?.addEventListener('click', () => showReview(reviewIndex + 1));

  // Validación local del formulario.
  const form = $('#contactForm');
  const formStatus = $('#formStatus');
  const fields = ['name', 'email', 'subject', 'message'];
  const setError = (name, message = '') => {
    const field = $(`#${name}`)?.closest('.field');
    const error = $(`[data-error-for="${name}"]`);
    field?.classList.toggle('invalid', Boolean(message));
    if (error) error.textContent = message;
  };

  form?.addEventListener('submit', event => {
    event.preventDefault();
    formStatus.textContent = '';
    let valid = true;
    fields.forEach(name => setError(name));

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (name.length < 2) { setError('name', 'Escribe tu nombre.'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Introduce un correo válido.'); valid = false; }
    if (subject.length < 3) { setError('subject', 'Añade un asunto.'); valid = false; }
    if (message.length < 10) { setError('message', 'El mensaje debe tener al menos 10 caracteres.'); valid = false; }

    if (!valid) return;
    form.reset();
    formStatus.textContent = '¡Gracias por contactarnos! Hemos recibido tu mensaje.';
  });

  // Volver al inicio.
  $('#backTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Evitar que enlaces sociales ficticios salten de forma brusca.
  $$('a[href="#"]').forEach(link => link.addEventListener('click', event => event.preventDefault()));
})();
const boton = document.getElementById("btnConocer");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function () {
    mensaje.hidden = false;
    boton.textContent = "¡Gracias por visitarnos!";
});