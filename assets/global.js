(() => {
  document.documentElement.classList.remove('no-js');

  const loadingButtons = document.querySelectorAll('[data-loading-button]');
  loadingButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!button.disabled && button.getAttribute('aria-disabled') !== 'true') {
        button.classList.add('is-loading');
        button.setAttribute('aria-busy', 'true');
      }
    });
  });

  const shouldAnimate = document.body.dataset.animations === 'true' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (shouldAnimate && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('[data-animate]').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('[data-animate]').forEach((element) => element.classList.add('is-visible'));
  }

  class DeferredMedia extends HTMLElement {
    connectedCallback() {
      if (!('IntersectionObserver' in window)) {
        this.loadContent();
        return;
      }
      this.observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.loadContent();
          this.observer.disconnect();
        }
      });
      this.observer.observe(this);
    }

    loadContent() {
      if (this.hasAttribute('loaded')) return;
      const template = this.querySelector('template');
      if (!template) return;
      this.appendChild(template.content.firstElementChild.cloneNode(true));
      this.setAttribute('loaded', '');
    }
  }

  customElements.define('deferred-media', DeferredMedia);
})();
