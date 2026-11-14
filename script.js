// Мобільне меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
});
nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// Рік у підвалі
document.getElementById('year').textContent = new Date().getFullYear();

// Форма запису: мінімальна дата — сьогодні
const form = document.getElementById('booking-form');
const dateInput = form.elements.date;
const today = new Date();
const pad = (n) => String(n).padStart(2, '0');
dateInput.min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;

  [...form.elements].forEach((el) => {
    if (!el.name) return;
    let ok = el.checkValidity();
    if (el.name === 'phone') ok = el.value.replace(/\D/g, '').length >= 10;
    el.classList.toggle('is-invalid', !ok);
    if (!ok && valid) {
      el.focus();
      valid = false;
    }
  });

  if (!valid) return;

  // Демо: у робочій версії тут відправка заявки в Telegram-бот власника
  const data = Object.fromEntries(new FormData(form));
  console.info('Нова заявка (демо):', data);

  form.reset();
  document.getElementById('form-success').hidden = false;
});

form.addEventListener('input', (event) => event.target.classList.remove('is-invalid'));
