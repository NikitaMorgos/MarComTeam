(function () {
  const sectionIds = ['strategy', 'okr', 'structure', 'tasks'];
  const titles = {
    strategy: 'Стратегия',
    okr: 'OKR',
    structure: 'Структура',
    tasks: 'Задачи'
  };

  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  const pageTitle = document.getElementById('page-title');
  const lastUpdate = document.querySelector('.last-update');

  function setActive(sectionId) {
    navItems.forEach(function (el) {
      const isActive = el.getAttribute('data-section') === sectionId;
      el.classList.toggle('active', isActive);
    });
    sections.forEach(function (el) {
      const id = el.id.replace('section-', '');
      el.classList.toggle('active', id === sectionId);
    });
    if (pageTitle) {
      pageTitle.textContent = titles[sectionId] || sectionId;
    }
    try {
      history.replaceState({ section: sectionId }, '', '#' + sectionId);
    } catch (e) {}
  }

  function getSectionFromHash() {
    const hash = (window.location.hash || '').replace('#', '');
    return sectionIds.includes(hash) ? hash : 'strategy';
  }

  navItems.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const sectionId = btn.getAttribute('data-section');
      setActive(sectionId);
    });
  });

  window.addEventListener('hashchange', function () {
    setActive(getSectionFromHash());
  });

  // Initial state from hash or default
  setActive(getSectionFromHash());

  // Optional: show last update time (can be replaced with real data later)
  function formatDate(d) {
    return d.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  if (lastUpdate && lastUpdate.textContent === 'Обновлено: —') {
    lastUpdate.textContent = 'Обновлено: ' + formatDate(new Date()) + ' (локально)';
  }
})();
