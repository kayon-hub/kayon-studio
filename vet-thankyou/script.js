const songList = document.getElementById('song-list');
const fadeItems = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

fadeItems.forEach((item) => observer.observe(item));

const createCard = (song) => {
  const article = document.createElement('article');
  article.className = 'song-card';
  article.setAttribute('role', 'listitem');

  const button = document.createElement('button');
  button.className = 'song-toggle';
  button.type = 'button';
  button.setAttribute('aria-expanded', 'false');

  const title = document.createElement('span');
  title.className = 'song-title';
  title.textContent = song.title;

  const subtitle = document.createElement('span');
  subtitle.className = 'song-subtitle';
  subtitle.textContent = song.subtitle;

  const linksWrap = document.createElement('div');
  linksWrap.className = 'song-links';

  const linkGrid = document.createElement('div');
  linkGrid.className = 'link-grid';

  Object.entries(song.platforms).forEach(([platform, href]) => {
    const link = document.createElement('a');
    link.className = 'link-btn';
    link.href = href;
    link.textContent = platform;
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    linkGrid.appendChild(link);
  });

  button.addEventListener('click', () => {
    const isOpen = linksWrap.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });

  button.append(title, subtitle);
  linksWrap.appendChild(linkGrid);
  article.append(button, linksWrap);

  return article;
};

const renderSongs = async () => {
  const response = await fetch('songs.json');
  const songs = await response.json();

  songs.forEach((song) => {
    songList.appendChild(createCard(song));
  });
};

renderSongs().catch(() => {
  songList.innerHTML = '<p class="song-subtitle">Songs unavailable right now.</p>';
});
