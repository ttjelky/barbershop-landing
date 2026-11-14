const navBar = document.querySelector('.nav-bar');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const mobileBook = document.querySelector('.mobile-book');
const hero = document.querySelector('.hero');
const booking = document.getElementById('booking');

// Мобільне меню
function setMenu(open) {
  nav.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
  document.body.style.overflow = open ? 'hidden' : '';
}
burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

// Фон навігації після скролу + липка кнопка запису на мобільному
function onScroll() {
  const y = window.scrollY;
  navBar.classList.toggle('is-scrolled', y > 40);
  const pastHero = y > hero.offsetHeight * 0.6;
  const bookingTop = booking.getBoundingClientRect().top;
  const atBooking = bookingTop < window.innerHeight && booking.getBoundingClientRect().bottom > 0;
  mobileBook.classList.toggle('is-visible', pastHero && !atBooking);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

document.getElementById('year').textContent = new Date().getFullYear();

// Форма запису
const form = document.getElementById('booking-form');
const pad = (n) => String(n).padStart(2, '0');
const today = new Date();
form.elements.date.min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let firstInvalid = null;

  [...form.elements].forEach((el) => {
    if (!el.name) return;
    let ok = el.checkValidity();
    if (el.name === 'phone') ok = el.value.replace(/\D/g, '').length >= 10;
    el.classList.toggle('is-invalid', !ok);
    if (!ok && !firstInvalid) firstInvalid = el;
  });

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  // Демо: у робочій версії тут відправка заявки в Telegram-бот власника
  console.info('Нова заявка (демо):', Object.fromEntries(new FormData(form)));
  form.reset();
  document.getElementById('form-success').hidden = false;
});

form.addEventListener('input', (e) => e.target.classList.remove('is-invalid'));
form.addEventListener('change', (e) => e.target.classList.remove('is-invalid'));
