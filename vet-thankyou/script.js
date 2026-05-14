const songList = document.getElementById("song-list");

const createCard = (song) => {
  const article = document.createElement("article");
  article.className = "song-card";

  const button = document.createElement("button");
  button.className = "song-toggle";
  button.setAttribute("aria-expanded", "false");

  const title = document.createElement("span");
  title.className = "song-title";
  title.textContent = song.title;

  const subtitle = document.createElement("span");
  subtitle.className = "song-subtitle";
  subtitle.textContent = song.subtitle || "";

  const linksWrap = document.createElement("div");
  linksWrap.className = "song-links";

  const linkGrid = document.createElement("div");
  linkGrid.className = "link-grid";

  if (song.platforms) {
    Object.entries(song.platforms).forEach(([platform, href]) => {
      if (!href || href === "#") return;

      const link = document.createElement("a");
      link.className = "link-btn";
      link.href = href;
      link.textContent = platform;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      linkGrid.appendChild(link);
    });
  }

  button.addEventListener("click", () => {
    const isOpen = linksWrap.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  button.appendChild(title);
  button.appendChild(subtitle);

  linksWrap.appendChild(linkGrid);

  article.appendChild(button);
  article.appendChild(linksWrap);

  return article;
};

async function renderSongs() {
  try {
    const response = await fetch(`./songs.json?v=${Date.now()}`);

    if (!response.ok) {
      throw new Error("songs.json load failed");
    }

    const songs = await response.json();

    songList.innerHTML = "";

    songs.forEach((song) => {
      songList.appendChild(createCard(song));
    });

  } catch (error) {
    console.error(error);

    songList.innerHTML = `
      <p class="song-subtitle">
        Songs unavailable right now.
      </p>
    `;
  }
}

// ✅ 修復：fade-in 動畫觸發邏輯（原版缺失導致頁面空白）
function initFadeIn() {
  const fadeEls = document.querySelectorAll(".fade-in");

  if (!("IntersectionObserver" in window)) {
    // 舊瀏覽器 fallback：直接顯示
    fadeEls.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  fadeEls.forEach((el) => observer.observe(el));
}

// 先渲染歌曲，再啟動動畫觀察
renderSongs().then(() => {
  initFadeIn();
});
