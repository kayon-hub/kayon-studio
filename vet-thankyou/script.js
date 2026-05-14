const songsList = document.getElementById('songs-list');

const platformLabels = [
  ['apple', 'Listen on Apple Music'],
  ['spotify', 'Listen on Spotify'],
  ['kkbox', 'Listen on KKBOX'],
  ['youtube', 'Listen on YouTube Music']
];

async function initSongs() {
  const res = await fetch('songs.json');
  const songs = await res.json();

  songs.forEach((song, idx) => {
    const card = document.createElement('article');
    card.className = 'song-card';

    const toggle = document.createElement('button');
    toggle.className = 'song-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', `platforms-${idx}`);
    toggle.innerHTML = `
      <div class="cover" aria-hidden="true">track</div>
      <div>
        <h3 class="title">${song.title}</h3>
        <p class="subtitle">${song.subtitle}</p>
      </div>
      <span class="state">open</span>
    `;

    const platforms = document.createElement('div');
    platforms.className = 'platforms';
    platforms.id = `platforms-${idx}`;

    platformLabels.forEach(([key, label]) => {
      if (!song[key]) return;
      const a = document.createElement('a');
      a.href = song[key];
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = label;
      platforms.appendChild(a);
    });

    toggle.addEventListener('click', () => {
      const opened = card.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(opened));
      toggle.querySelector('.state').textContent = opened ? 'close' : 'open';
    });

    card.append(toggle, platforms);
    songsList.appendChild(card);
  });
}

initSongs().catch(() => {
  songsList.innerHTML = '<p class="subtitle">songs archive is temporarily unavailable.</p>';
});
