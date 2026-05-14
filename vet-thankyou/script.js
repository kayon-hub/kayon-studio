const songList = document.getElementById('song-list');

const songs = [
  {
    title: "不完美的快樂 (2026 Remastered Version) Mini Album",
    subtitle: "謝謝每一位曾經努力想留下歐巴的人。",
    platforms: {
      "Apple Music": "https://is.gd/ec6R3Q",
      "Spotify": "https://open.spotify.com/album/4rxVJhUSasV4dtwMVBsQ3H?si=dJkUIPAyTrWoja6PSplASA",
      "KKBOX": "https://www.kkbox.com/tw/tc/album/DXKBzcIPYpMkg8zIUr",
      "LINE MUSIC": "https://music-tw.line.me/album/7941443",
      "YouTube Music": "https://music.youtube.com/playlist?list=OLAK5uy_mjhgI-rnwovVQD-68s8KzRZHCsU5YpNvQ"
    }
  },

  {
    title: "WAIT FOR ME EP",
    subtitle: "A pause between breath and goodbye.",
    platforms: {
      "Apple Music": "https://music.apple.com/tw/album/wait-for-me-single/1872379566",
      "Spotify": "https://open.spotify.com/album/3fMqdwXuY0xVTkdzfeM9RV",
      "KKBOX": "https://kkbox.fm/YaJwlv",
      "LINE MUSIC": "https://music-tw.line.me/album/7877386",
      "YouTube Music": "https://music.youtube.com/playlist?list=OLAK5uy_loRD8sfhP_1otNtvnw-kbuouEgo7B1WL0"
    }
  },

  {
    title: "你不在的時候",
    subtitle: "The hallway keeps your silence gently.",
    platforms: {
      "Apple Music": "https://music.apple.com/tw/album/%E4%BD%A0%E4%B8%8D%E5%9C%A8%E7%9A%84%E6%99%82%E5%80%99/1875298284?i=1875298589",
      "Spotify": "https://open.spotify.com/track/4CGG2KmvgqRuPRp9RfUT4W",
      "KKBOX": "https://kkbox.fm/Wp1oNUs",
      "LINE MUSIC": "https://music-tw.line.me/track/7891770001",
      "YouTube Music": "https://music.youtube.com/watch?v=Oj79bGiyPn8"
    }
  },

  {
    title: "放手的重量 EP",
    subtitle: "Learning love can also mean letting go.",
    platforms: {
      "Apple Music": "https://music.apple.com/tw/album/%E6%94%BE%E6%89%8B%E7%9A%84%E9%87%8D%E9%87%8F-2026-remastered-version-single/1876513606",
      "Spotify": "https://open.spotify.com/album/5Rjj8L6CUJnEp4qMb7jcOQ",
      "KKBOX": "https://kkbox.fm/baJqP6",
      "LINE MUSIC": "https://music-tw.line.me/album/7894972",
      "YouTube Music": "https://music.youtube.com/playlist?list=OLAK5uy_kc2rZHQw5_nu6pvz1sAeWm1q-kbeutP-s"
    }
  },

  {
    title: "我很好 feat. KAYON",
    subtitle: "A quiet answer to those who still worry.",
    platforms: {
      "Apple Music": "https://music.apple.com/tw/album/%E6%88%91%E5%BE%88%E5%A5%BD-feat-kayon/1886120117?i=1886120119",
      "Spotify": "https://open.spotify.com/track/5d3LHrRPt8zIDKEgl4HLBs",
      "KKBOX": "https://kkbox.fm/Ww13fMs",
      "YouTube Music": "https://music.youtube.com/watch?v=NwMU0cd_weY"
    }
  },

  {
    title: "在我身邊",
    subtitle: "Still beside you.",
    platforms: {
      "Spotify": "https://open.spotify.com/track/04FVxKOT3pKLMK4DAlWRvJ",
      "KKBOX": "https://kkbox.fm/W51zbns",
      "LINE MUSIC": "https://music-tw.line.me/track/7917274001",
      "YouTube Music": "https://music.youtube.com/watch?v=1z7IgzwNB9A"
    }
  }
];

songs.forEach((song) => {
  const card = document.createElement('div');
  card.className = 'song-card';

  const title = document.createElement('h3');
  title.className = 'song-title';
  title.textContent = song.title;

  const subtitle = document.createElement('p');
  subtitle.className = 'song-subtitle';
  subtitle.textContent = song.subtitle;

  const links = document.createElement('div');
  links.className = 'song-links';

  Object.entries(song.platforms).forEach(([platform, url]) => {
    const a = document.createElement('a');

    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'link-btn';
    a.textContent = platform;

    links.appendChild(a);
  });

  card.append(title, subtitle, links);
  songList.appendChild(card);
});
