// Single place to edit the variable details of the invitation.
const CONFIG = {
  weddingDateISO: '2026-12-13T19:00:00',
  mapsUrl: 'https://maps.app.goo.gl/WaFLC5KXUQR8fnZR9?g_st=iw'
};

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initMusicToggle();
  initFamilyToggle();
  initScrollReveal();
  initImageFallbacks();
  initLinks();
  initScrollCues();
});

function initCountdown() {
  const target = new Date(CONFIG.weddingDateISO).getTime();
  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs')
  };

  function tick() {
    let diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000); diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);

    els.days.textContent = String(days).padStart(2, '0');
    els.hours.textContent = String(hours).padStart(2, '0');
    els.mins.textContent = String(mins).padStart(2, '0');
    els.secs.textContent = String(secs).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

function initMusicToggle() {
  const btn = document.getElementById('musicToggle');
  const audio = document.getElementById('bgMusic');
  let playing = false;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Autoplay/playback can be blocked until the browser has a valid source; ignore silently.
      });
    }
    playing = !playing;
    btn.classList.toggle('is-playing', playing);
    btn.setAttribute('aria-pressed', String(playing));
  });
}

function initFamilyToggle() {
  const groomBtn = document.getElementById('groomBtn');
  const brideBtn = document.getElementById('brideBtn');
  const groomPanel = document.getElementById('groomPanel');
  const bridePanel = document.getElementById('bridePanel');

  function show(view) {
    const isGroom = view === 'groom';
    groomPanel.classList.toggle('is-active', isGroom);
    bridePanel.classList.toggle('is-active', !isGroom);
    groomBtn.classList.toggle('active', isGroom);
    brideBtn.classList.toggle('active', !isGroom);
  }

  groomBtn.addEventListener('click', () => show('groom'));
  brideBtn.addEventListener('click', () => show('bride'));
}

function initScrollReveal() {
  const items = document.querySelectorAll('.wi-fade');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach((el) => io.observe(el));
}

function initImageFallbacks() {
  document.querySelectorAll('.photo-frame .photo').forEach((img) => {
    const markMissing = () => img.closest('.photo-frame').classList.add('img-missing');
    if (img.complete && img.naturalWidth === 0) markMissing();
    img.addEventListener('error', markMissing);
  });
}

function initLinks() {
  const directionsBtn = document.getElementById('directionsBtn');
  if (directionsBtn) directionsBtn.href = CONFIG.mapsUrl;
}

function initScrollCues() {
  const chevron = '<svg viewBox="0 0 18 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2l7 6 7-6"></path></svg>';
  const slides = Array.from(document.querySelectorAll('main .slide'));

  slides.forEach((slide, i) => {
    const next = slides[i + 1];
    if (!next) return;
    const cue = document.createElement('a');
    cue.className = 'scroll-cue';
    cue.href = '#' + next.id;
    cue.setAttribute('aria-label', 'Scroll down');
    cue.innerHTML = chevron + chevron;
    slide.appendChild(cue);
  });
}
