    /* ==========================================================
       OPENING ANIMATION
    ========================================================== */
    const cover = document.getElementById('cover');
    const mainEl = document.getElementById('main');
    const tapBtn = document.getElementById('tapToOpen');
    document.documentElement.classList.add('locked');

    function openInvite() {
      cover.classList.add('open');
      mainEl.classList.add('show');
      document.documentElement.classList.remove('locked');
      startMusic();
      setTimeout(() => { cover.classList.add('hidden'); }, 1350);
    }

    tapBtn.addEventListener('click', openInvite);
    tapBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openInvite(); }
    });
    cover.addEventListener('click', openInvite);

    /* ==========================================================
       COUNTDOWN — Wedding: 15 November 2026, 12:00 PM IST
    ========================================================== */
    const weddingDate = new Date('2026-11-15T12:00:00+05:30').getTime();

    function tickCountdown() {
      const diff = Math.max(0, weddingDate - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = n => String(n).padStart(2, '0');
      document.getElementById('cd-days').textContent = pad(d);
      document.getElementById('cd-hours').textContent = pad(h);
      document.getElementById('cd-mins').textContent = pad(m);
      document.getElementById('cd-secs').textContent = pad(s);
    }
    tickCountdown();
    setInterval(tickCountdown, 1000);

    /* ==========================================================
       BACKGROUND MUSIC
    ========================================================== */
    const audio = document.getElementById('bg-music');
    const muteBtn = document.getElementById('mute-btn');
    const iconSound = document.getElementById('icon-sound');
    const iconMuted = document.getElementById('icon-muted');
    let started = false;

    function startMusic() {
      if (!started) {
        audio.volume = 0.40;
        audio.play().then(() => { started = true; }).catch(() => { });
      }
    }

    window.addEventListener('load', () => {
      audio.volume = 0.40;
      audio.play().then(() => { started = true; }).catch(() => { });
    });

    ['click', 'scroll', 'touchstart', 'keydown'].forEach(evt => {
      document.addEventListener(evt, startMusic, { once: true, passive: true });
    });

    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startMusic();
      if (audio.paused) {
        audio.play();
        iconSound.style.display = '';
        iconMuted.style.display = 'none';
      } else {
        audio.pause();
        iconSound.style.display = 'none';
        iconMuted.style.display = '';
      }
    });

    /* ==========================================================
       SCROLL REVEAL — IntersectionObserver
    ========================================================== */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObs.observe(el));

    /* ==========================================================
       HERO PARALLAX (subtle)
    ========================================================== */
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (heroSection && scrollY < window.innerHeight * 1.5) {
        heroSection.style.backgroundPositionY = 'calc(50% + ' + (scrollY * 0.28) + 'px)';
      }
    }, { passive: true });
