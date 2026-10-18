(() => {
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme');
  const sync = () => {
    const light = root.dataset.theme === 'light';
    themeBtn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    document.querySelector('meta[name="theme-color"]').content = light ? '#f6f3ec' : '#121211';
  };
  sync();
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    sync();
  });

  const burger = document.getElementById('burger');
  const header = document.querySelector('.nav');
  const setMenu = open => {
    header.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  burger.addEventListener('click', () => setMenu(!header.classList.contains('open')));
  document.querySelectorAll('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  document.getElementById('year').textContent = new Date().getFullYear();

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('js-reveal');
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    items.forEach(i => io.observe(i));
  }


  const links = [...document.querySelectorAll('#menu a')];
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.toggleAttribute('aria-current', l.hash === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(l => { const s = document.querySelector(l.hash); if (s) so.observe(s); });
  }


  const lb = document.getElementById('lightbox'), img = document.getElementById('lb-img');
  let opener;
  document.querySelectorAll('.cert').forEach(b => b.addEventListener('click', () => {
    opener = b; img.src = b.dataset.src; img.alt = b.dataset.alt; lb.showModal();
  }));
  document.getElementById('close').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  lb.addEventListener('close', () => opener && opener.focus());
})();
