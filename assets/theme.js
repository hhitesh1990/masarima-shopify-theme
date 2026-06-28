(() => {
  document.documentElement.classList.remove('no-js');

  const menu = document.querySelector('[data-mobile-menu]');
  if (menu) {
    menu.addEventListener('toggle', () => {
      document.body.classList.toggle('menu-open', menu.open);
    });
  }

  document.querySelectorAll('[data-quantity]').forEach((quantity) => {
    const input = quantity.querySelector('input');
    quantity.querySelectorAll('[data-quantity-adjust]').forEach((button) => {
      button.addEventListener('click', () => {
        const step = Number(button.dataset.quantityAdjust);
        const current = Number(input.value || 1);
        const min = Number(input.min || 1);
        input.value = Math.max(min, current + step);
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  });

  document.querySelectorAll('[data-auto-submit]').forEach((element) => {
    element.addEventListener('change', () => element.form && element.form.submit());
  });

  document.querySelectorAll('[data-product-form]').forEach((form) => {
    form.addEventListener('submit', () => {
      const button = form.querySelector('[type="submit"]');
      if (button) {
        button.setAttribute('aria-busy', 'true');
      }
    });
  });
})();
