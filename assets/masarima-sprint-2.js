(() => {
  const root = document.documentElement;
  const body = document.body;
  const announcement = document.querySelector('[data-mas-announcement]');
  const header = document.querySelector('[data-mas-header]');

  const setOffsets = () => {
    const announcementHeight = announcement && !announcement.hidden ? announcement.offsetHeight : 0;
    root.style.setProperty('--mas-announcement-offset', `${announcementHeight}px`);
  };

  if (announcement) {
    const storageKey = `masarima-announcement-${announcement.dataset.sectionId}`;
    if (window.localStorage.getItem(storageKey) === 'closed') {
      announcement.hidden = true;
    }

    const closeButton = announcement.querySelector('[data-mas-announcement-close]');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        announcement.hidden = true;
        window.localStorage.setItem(storageKey, 'closed');
        setOffsets();
      });
    }
  }

  const countdowns = document.querySelectorAll('[data-mas-countdown]');
  countdowns.forEach((countdown) => {
    const target = new Date(countdown.dataset.countdownTarget).getTime();
    if (Number.isNaN(target)) {
      countdown.hidden = true;
      return;
    }

    const renderCountdown = () => {
      const remaining = target - Date.now();
      if (remaining <= 0) {
        countdown.hidden = true;
        return;
      }

      const totalMinutes = Math.floor(remaining / 60000);
      const days = Math.floor(totalMinutes / 1440);
      const hours = Math.floor((totalMinutes % 1440) / 60);
      const minutes = totalMinutes % 60;
      const label = countdown.dataset.countdownLabel || '';
      countdown.textContent = `${label} ${days}d ${hours}h ${minutes}m`.trim();
    };

    renderCountdown();
    window.setInterval(renderCountdown, 60000);
  });

  if (header) {
    const updateHeaderState = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      setOffsets();
    };

    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', setOffsets);
    updateHeaderState();

    const drawer = header.querySelector('[data-mas-drawer]');
    const openButton = header.querySelector('[data-mas-drawer-open]');
    const closeButtons = header.querySelectorAll('[data-mas-drawer-close]');

    const openDrawer = () => {
      if (!drawer || !openButton) return;
      drawer.hidden = false;
      requestAnimationFrame(() => drawer.classList.add('is-open'));
      openButton.setAttribute('aria-expanded', 'true');
      body.classList.add('is-locked');
      const firstFocusable = drawer.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
    };

    const closeDrawer = () => {
      if (!drawer || !openButton || drawer.hidden) return;
      drawer.classList.remove('is-open');
      openButton.setAttribute('aria-expanded', 'false');
      body.classList.remove('is-locked');
      window.setTimeout(() => {
        drawer.hidden = true;
        openButton.focus();
      }, 220);
    };

    if (openButton) openButton.addEventListener('click', openDrawer);
    closeButtons.forEach((button) => button.addEventListener('click', closeDrawer));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeDrawer();
    });
  }

  setOffsets();
})();
