import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FaLinkedin, FaVimeoV, FaInstagram } from 'react-icons/fa';

/* ─── Film data ──────────────────────────────────────────── */
const FILMS = [
  {
    id: 'threading',
    title: 'Threading the American Dream',
    role: 'Director, Cinematographer, Editor',
    image: '/media/threading-american-dream.jpg',
    vimeoId: '1194505499',
    vimeoHash: 'e3cea82ba4',
    logline:
      'A Nepali immigrant fights the Mississippi cosmetology board and wins, changing state law.',
    synopsis:
      'Threading the American Dream is a 26-minute character-driven documentary about Dipa Bhattarai, a Nepali immigrant who came to the American South to pursue her undergraduate degree. She built a threading business from almost nothing, was shut down by the Mississippi State Board of Cosmetology, and fought back through a federal lawsuit that ultimately changed Mississippi law.',
    accolades: [
      'First Prize, Student Documentary Pitch, Riverrun International Film Festival 2026.',
      'First Prize, Student Artistic Presentation, Auburn Southern Studies Conference 2026.',
      'Official Selection, Nepal America International Film Festival 2026.',
    ],
  },
  {
    id: 'jere',
    title: 'Jere Allen: A Lifetime of Passion and Resilience',
    role: 'Director, Cinematographer',
    image: '/projects/jere-allen/cover.png',
    vimeoId: '941591505',
    vimeoHash: '1f181bebaa',
    synopsis:
      'An intimate portrait of Jere Allen, a lifelong painter, told through his life, his studio, and the work he has made across decades. The film sits with a man still devoted to his craft late in life and asks what it means to keep making art when the making is the point.',
    accolades: [
      'Official Selection, 2025: South Georgia Film Festival, Oxford Film Festival, Redfish Film Festival, Rising Tide Film Festival, Jackson Doc Fest.',
    ],
  },
  {
    id: 'griot',
    title: 'Griot of the South',
    role: 'Director, Cinematographer',
    image: '/projects/griot/cover.png',
    vimeoId: '1194469987',
    vimeoHash: 'd1d67f7679',
    synopsis:
      "A short musical documentary about John Mohead, a Delta blues singer and songwriter devoted to preserving Southern music and culture. The film follows Mohead's voice and his commitment to keeping a regional tradition alive.",
  },
];

/* ─── Production work data (Ghumante) ────────────────────── */
const PRODUCTION = [
  { name: 'KORI', subtitle: 'The Beautiful Highlands of Kaski', loc: 'Kaski, Nepal', year: '2020', yt: 'WnGWfHJQb5U' },
  { name: 'Chola Circuit & Everest Base Camp', subtitle: 'Ep. Two, Kalapathar & EBC', loc: 'Khumbu, Nepal', year: '2021', yt: 'LolExdWgPDU' },
  { name: 'Badimalika & Tribeni Patan', subtitle: 'Pilgrimage via Kalikot', loc: 'Bajura, Nepal', year: '2021', yt: '9iXhMmPtqRE' },
  { name: 'Khumai Dada', subtitle: 'Great Machhapuchhre Trail', loc: 'Kaski, Nepal', year: '2022', yt: 'C0xkXjMK8Jk' },
  { name: 'Ramaroshan', subtitle: 'Episode I, 12 Lakes, 18 Meadows', loc: 'Achham, Nepal', year: '2021', yt: 'VTq6NA18xeM' },
  { name: 'People & Culture of Madhesh Pradesh', subtitle: 'Imagine Nepal', loc: 'Madhesh, Nepal', year: '2022', yt: 'SBEkfMAD6VM' },
  { name: 'Saipal Base Camp, Road Trip', subtitle: 'Episode 1', loc: 'Bajhang, Nepal', year: '2022', yt: 'uGTjK0m_NQY' },
  { name: 'Saipal Base Camp, The Trek', subtitle: 'Episode 2', loc: 'Bajhang, Nepal', year: '2022', yt: 'jid2_wtB7kQ' },
  { name: 'Raidhungi & Saipal Finale', subtitle: 'Bajhang series finale', loc: 'Bajhang, Nepal', year: '2023', yt: 'c0u_ppZVsLk' },
  { name: 'Holi in Janakpur', subtitle: 'Festival of colors', loc: 'Janakpur, Nepal', year: '2024', yt: 'pqHYiqfaqNI' },
  { name: 'Kanchanjunga Base Camp', subtitle: 'Ep. 1, Oktang', loc: 'Taplejung, Nepal', year: '2020', yt: 'BBa0F1kzToI' },
  { name: 'Kanchanjunga Base Camp', subtitle: 'Ep. 2, Pangpema North', loc: 'Taplejung, Nepal', year: '2020', yt: '6itDcVxx-s4' },
  { name: 'Meme Pokhari', subtitle: 'Lockdown Series', loc: 'Lamjung, Nepal', year: '2020', yt: 'ELgO9sT7uW0' },
  { name: 'Gokyo', subtitle: 'Chola Circuit Ep. 3, Chola Pass & Gokyo Ri', loc: 'Khumbu, Nepal', year: '2020', yt: 'zIMONZdb188' },
  { name: 'NESO', subtitle: 'The dying festival of the Kanchanjungas', loc: 'Ghunsa, Taplejung', year: '2020', yt: 'ozvsYlEz-Lg' },
];

/* ─── Photo sets ─────────────────────────────────────────── */
const FARM_TO_MARKET = {
  title: 'Farm to Market',
  lede: 'Mr. Brown, Water Valley, Mississippi.',
  body: 'Mr. Brown is a farmer based in Water Valley, Mississippi, continuing a tradition his parents began 43 years ago. He grows mushrooms, vegetables, fruits, and herbs, and raises chickens and goats, doing most of the work himself. Each week he brings his harvest to the Oxford community market, which he sees as a vital way for independent farmers to reach customers directly. This series follows his journey from farm to market, and his enduring love for the work despite its challenges.',
  images: [
    { src: '/projects/mr-brown/web/1 Large.jpeg', alt: 'Mr. Brown at work on his farm in Water Valley, Mississippi' },
    { src: '/projects/mr-brown/web/2 Large.jpeg', alt: 'Mr. Brown tending his crops' },
    { src: '/projects/mr-brown/web/3 Large.jpeg', alt: 'Rows of vegetables growing on the farm' },
    { src: '/projects/mr-brown/web/4 Large.jpeg', alt: 'Mr. Brown harvesting produce by hand' },
    { src: '/projects/mr-brown/web/5 Large.jpeg', alt: 'Fresh harvest gathered from the farm' },
    { src: '/projects/mr-brown/web/DSC02528 Large.jpeg', alt: 'Mr. Brown at the Oxford community market' },
    { src: '/projects/mr-brown/web/DSC02645 Large.jpeg', alt: 'Produce laid out for sale at the market' },
    { src: '/projects/mr-brown/web/DSC02651 Large.jpeg', alt: 'Mr. Brown greeting customers at his market stall' },
    { src: '/projects/mr-brown/web/DSC02767 Large.jpeg', alt: 'Mr. Brown at the end of a day at the market' },
  ],
};

const NEPAL = {
  title: 'What I Saw in Nepal',
  body: 'A personal documentary series made across Nepal, from the high mountains to the daily life of rural communities. These images sit landscape and portrait side by side: peaks, night skies, and open valleys next to the people, families, and small moments that make up life in the places I come from.',
  images: [
    { src: '/projects/nepal/nepal-01-mountain-peak-dawn.jpg', alt: 'Snow-capped Himalayan peak at dawn, pink sky over the mountains' },
    { src: '/projects/nepal/nepal-02-three-children-village.jpg', alt: 'Three children standing together in a Nepali village' },
    { src: '/projects/nepal/nepal-03-terraced-valley-clouds.jpg', alt: 'Green terraced valley with clouds rolling over a Himalayan village' },
    { src: '/projects/nepal/nepal-04-man-holding-child.jpg', alt: 'A man holds a child close, bundled against the cold' },
    { src: '/projects/nepal/nepal-05-wildflower-meadow-pond.jpg', alt: 'Wildflower meadow with a pond reflecting snow-capped mountains' },
    { src: '/projects/nepal/nepal-06-figure-mountain-trail.jpg', alt: 'A figure walks a mountain trail carrying a load' },
    { src: '/projects/nepal/nepal-07-trekker-alpine-lake.jpg', alt: 'A trekker rests beside an alpine lake in the Himalayas' },
    { src: '/projects/nepal/nepal-08-boy-waving-smiling.jpg', alt: 'A young boy waves and smiles at the camera' },
    { src: '/projects/nepal/nepal-09-hillside-path-peak.jpg', alt: 'Green hillside path leading toward a snow-capped peak' },
    { src: '/projects/nepal/nepal-10-tending-cow-lantern-night.jpg', alt: 'A person tends to a cow by lantern light at night' },
    { src: '/projects/nepal/nepal-11-figure-sunrise-ridge.jpg', alt: 'A lone figure watches the sunrise from a mountain ridge' },
    { src: '/projects/nepal/nepal-12-two-people-hillside.jpg', alt: 'Two people sit together on a hillside overlooking the mountains' },
    { src: '/projects/nepal/nepal-13-peaks-dusk-sky.jpg', alt: 'Himalayan peaks glowing under a dusk sky' },
    { src: '/projects/nepal/nepal-14-milky-way-campsite.jpg', alt: 'The Milky Way over a mountain campsite at night' },
    { src: '/projects/nepal/nepal-15-star-trails-night-sky.jpg', alt: 'Star trails streaking across the night sky above the mountains' },
  ],
};

const ADDITIONAL_WORK = {
  title: 'Additional Work',
  body: 'A wider selection of photographs made across places and subjects.',
  images: [
    { src: '/projects/additional/additional-festival-performers-night.jpg', alt: 'Musicians and dancers performing at a nighttime festival' },
    { src: '/projects/additional/additional-basketball-jump-shot.jpg', alt: 'A basketball player leaps for a jump shot outdoors' },
    { src: '/projects/additional/additional-open-air-market-evening.jpg', alt: 'Vendors and shoppers at an open-air market in the evening' },
    { src: '/projects/additional/additional-highway-sunset.jpg', alt: 'An open highway stretching toward the sunset' },
    { src: '/projects/additional/additional-soccer-match.jpg', alt: 'Players compete in an outdoor soccer match' },
    { src: '/projects/additional/additional-covered-market-stalls.jpg', alt: 'Shoppers browsing stalls inside a covered market' },
    { src: '/projects/additional/additional-basketball-court-spectators.jpg', alt: 'Players and spectators at an outdoor basketball court' },
  ],
};

/* ─── TopBar ─────────────────────────────────────────────── */
export function TopBar() {
  const [open, setOpen] = useState(false);

  const items = [
    ['/', 'Home'],
    ['/film', 'Film'],
    ['/production', 'Production Work'],
    ['/photography', 'Photography'],
    ['/about', 'About'],
  ];

  return (
    <header className="topbar">
      <div className="brand">
        <Link to="/" aria-label="Home">
          <h1 className="brand-name">Ashish Shrestha</h1>
        </Link>
        <p className="brand-role">Documentary Filmmaker</p>
      </div>
      <button
        className="nav-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span /><span /><span />
      </button>
      <nav className={`nav${open ? ' open' : ''}`} aria-label="Sections">
        {items.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

/* ─── Inline Vimeo player (click-to-play) ────────────────── */
function VimeoPlayer({ vimeoId, vimeoHash, title }) {
  const src = `https://player.vimeo.com/video/${vimeoId}?${vimeoHash ? `h=${vimeoHash}&` : ''}autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`;
  return (
    <iframe
      src={src}
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      title={title}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}

/* ─── Film entry (poster left, text right, click-to-play) ── */
function FilmEntry({ film, lazy = true, useLogline = false }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="featured film-entry">
      <div
        className="media"
        onClick={!playing ? () => setPlaying(true) : undefined}
        style={{ cursor: playing ? 'default' : 'pointer' }}
      >
        {playing ? (
          <VimeoPlayer vimeoId={film.vimeoId} vimeoHash={film.vimeoHash} title={film.title} />
        ) : (
          <>
            {film.image && (
              <img
                src={film.image}
                alt={film.title}
                loading={lazy ? 'lazy' : undefined}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </>
        )}
      </div>
      <div className="body">
        <h3>{film.title}</h3>
        {film.role && <p className="role">{film.role}</p>}
        <p className="synopsis">{useLogline ? film.logline : film.synopsis}</p>
        {film.accolades && (
          <div className="accolades">
            {film.accolades.map((line, i) => (
              <p key={i} className="synopsis">{line}</p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/* ─── Home page ──────────────────────────────────────────── */
function HomePage() {
  const threading = FILMS.find(f => f.id === 'threading');
  return (
    <section className="tab-panel" data-screen-label="Home">
      <div className="hero-reel">
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
          <iframe
            src="https://player.vimeo.com/video/1209089293?badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="Ashish Cinematography Reel"
            allowFullScreen
          />
        </div>
      </div>

      <p className="identity-line">
        His work is shaped by culture and experience. Drawn to ordinary people carrying
        extraordinary truth in places the world rarely looks. His work explores belonging,
        resilience, and the stories that live quietly in place.
      </p>

      <div className="home-buttons">
        <Link className="home-btn" to="/film">View All Films</Link>
        <Link className="home-btn" to="/production">Production Work</Link>
        <Link className="home-btn" to="/photography">Photography</Link>
      </div>

      <div className="section-head">
        <h2>Recent Work</h2>
      </div>
      <FilmEntry film={threading} lazy useLogline />
    </section>
  );
}

/* ─── Film page ──────────────────────────────────────────── */
function FilmPage() {
  return (
    <section className="tab-panel" data-screen-label="Film">
      <div className="section-head">
        <h2>Film</h2>
      </div>
      {FILMS.map((film, i) => (
        <React.Fragment key={film.id}>
          {i > 0 && <div className="films-divider" />}
          <FilmEntry film={film} lazy={i > 0} />
        </React.Fragment>
      ))}
    </section>
  );
}

/* ─── Production Work page ───────────────────────────────── */
function formatViews(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M views';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K views';
  return n + ' views';
}

function ProductionPage() {
  const [views, setViews] = useState({});

  useEffect(() => {
    const key = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!key) return;
    const ids = PRODUCTION.map(t => t.yt).join(',');
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${key}`)
      .then(r => r.json())
      .then(data => {
        const map = {};
        data.items?.forEach(item => {
          map[item.id] = parseInt(item.statistics.viewCount, 10);
        });
        setViews(map);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="tab-panel" data-screen-label="Production">
      <div className="section-head">
        <h2>Production Work</h2>
      </div>

      <h3 className="production-org">Ghumante Pvt. Ltd. (2017 to 2023)</h3>
      <p className="travel-intro">
        Ashish Shrestha worked as a cinematographer and editor at Ghumante Pvt. Ltd. in Nepal
        from 2017 to 2023. He shot and edited 45+ travel documentaries for Ghumante's own
        YouTube channel, and helped grow the channel from 10,000 to 250,000 subscribers.
        Separately, he produced 7 short travel videos for the Imagine Nepal national
        competition, and those 7 videos were broadcast on Kantipur TV.
      </p>

      <div className="grid grid-3">
        {PRODUCTION.map((t, i) => (
          <a
            className="card"
            key={i}
            href={`https://youtu.be/${t.yt}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div className="media">
              <img
                src={`https://img.youtube.com/vi/${t.yt}/maxresdefault.jpg`}
                alt={`${t.name} thumbnail`}
                loading="lazy"
                onError={e => { e.currentTarget.src = `https://img.youtube.com/vi/${t.yt}/hqdefault.jpg`; }}
              />
              <span className="play-pill">
                <span className="dot" /> Watch
              </span>
            </div>
            <div className="info">
              <h4 className="title">{t.name}</h4>
              <span className="year">{t.year}</span>
            </div>
            {views[t.yt] && <span className="view-count">{formatViews(views[t.yt])}</span>}
          </a>
        ))}
      </div>
    </section>
  );
}

/* ─── Photography page ───────────────────────────────────── */
/* Photo entries may be plain strings or { src, alt } objects. */
const photoSrc = (img) => (typeof img === 'string' ? img : img.src);
const photoAlt = (img, fallback) => (typeof img === 'string' ? fallback : (img.alt || fallback));

export function PhotoLightbox({ images, index, onClose, onPrev, onNext, title }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>✕</button>
      <button className="lightbox-prev" onClick={e => { e.stopPropagation(); onPrev(); }}>‹</button>
      <img
        src={photoSrc(images[index])}
        alt={photoAlt(images[index], `${title} ${index + 1}`)}
        className="lightbox-img"
        onClick={e => e.stopPropagation()}
      />
      <button className="lightbox-next" onClick={e => { e.stopPropagation(); onNext(); }}>›</button>
    </div>
  );
}

export function PhotoEssay({ images, title, small = false }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const total = images.length;

  return (
    <>
      <div className={`layout-essay${small ? ' layout-essay-small' : ''}`}>
        {images.map((img, i) => (
          <div key={i} className="le-essay-item" onClick={() => setLightboxIndex(i)}>
            <img src={photoSrc(img)} alt={photoAlt(img, `${title} ${i + 1}`)} loading="lazy" />
          </div>
        ))}
      </div>
      {lightboxIndex !== null && (
        <PhotoLightbox
          images={images}
          title={title}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + total) % total)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % total)}
        />
      )}
    </>
  );
}

function PhotographyPage() {
  return (
    <section className="tab-panel" data-screen-label="Photography">
      <div className="section-head">
        <h2>{FARM_TO_MARKET.title}</h2>
        <span className="count">Photography</span>
      </div>
      <div className="folder-caption">
        <p className="folder-caption-lede">{FARM_TO_MARKET.lede}</p>
        <p className="folder-caption-body">{FARM_TO_MARKET.body}</p>
      </div>
      <PhotoEssay images={FARM_TO_MARKET.images} title={FARM_TO_MARKET.title} />

      <div className="films-divider" style={{ margin: '80px 0 0' }} />

      <div className="section-head">
        <h2>{NEPAL.title}</h2>
      </div>
      <div className="folder-caption no-lede">
        <p className="folder-caption-body">{NEPAL.body}</p>
      </div>
      <PhotoEssay images={NEPAL.images} title={NEPAL.title} />

      <div className="films-divider" style={{ margin: '80px 0 0' }} />

      <div className="section-head">
        <h2 className="secondary-head">{ADDITIONAL_WORK.title}</h2>
      </div>
      <div className="folder-caption no-lede">
        <p className="folder-caption-body">{ADDITIONAL_WORK.body}</p>
      </div>
      <PhotoEssay images={ADDITIONAL_WORK.images} title={ADDITIONAL_WORK.title} small />
    </section>
  );
}

/* ─── About page ─────────────────────────────────────────── */
function AboutPage() {
  return (
    <section className="tab-panel" data-screen-label="About">
      <div className="section-head">
        <h2>About</h2>
        <span className="count">Currently in Oxford, Mississippi</span>
      </div>
      <div className="about">
        <div className="portrait">
          <img src="/about-portrait.jpg" alt="Ashish Shrestha" />
        </div>
        <div className="about-body">
          <p className="lede">
            Director, Cinematographer, Editor, Photographer.
          </p>
          <p>
            Ashish Shrestha is a documentary filmmaker and cinematographer from Nepal, currently based in Oxford,
            Mississippi, where he is pursuing his MFA in Documentary Expression at the University of Mississippi.
            His work is shaped by culture and experience. Drawn to ordinary people carrying extraordinary truth
            in places the world rarely looks. His work explores belonging, resilience, and the stories that live
            quietly in place.
          </p>
          <p>
            Currently finishing his thesis film <em>Threading the American Dream</em>, which follows Nepali
            immigrant entrepreneur Dipa Bhattarai and her legal fight that changed Mississippi state law. A
            project that won the first prize at the Riverrun International Film Festival student documentary pitch.
          </p>
          <p>
            His short film <em>Jere Allen: A Lifetime of Passion and Resilience</em>, an
            intimate portrait of a lifelong painter. The film was selected for the South Georgia Film Festival,
            Oxford Film Festival, Redfish Film Festival, Rising Tide Film Festival, and Jackson Doc Fest.
          </p>
          <p>
            Before graduate school, Ashish Shrestha worked as a cinematographer and editor in Nepal, producing more
            than 45 travel documentaries for a digital platform named <em>Ghumante</em>. His work reflects his
            experience as a Nepali international student in the American South and his commitment to telling
            grounded, human stories with clarity and care.
          </p>

          <div className="contact-card">
            <a
              className="resume-btn"
              href="/resume.pdf"
              download="Ashish-Shrestha-CV.pdf"
            >
              <span className="resume-btn-arrow" aria-hidden="true">↓</span>
              <span className="resume-btn-label">
                <span className="resume-btn-main">Download CV</span>
                <span className="resume-btn-sub">PDF</span>
              </span>
            </a>
            <span className="eyebrow">Get in touch</span>
            <a className="email" href="mailto:ashish.stha5@gmail.com">
              ashish.stha5@gmail.com
            </a>
            <div className="links">
              <a href="https://www.instagram.com/ashish.5tha/" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram"><FaInstagram size={20} /></a>
              <a href="https://vimeo.com/ashishshrestha" target="_blank" rel="noopener noreferrer" title="Vimeo" aria-label="Vimeo"><FaVimeoV size={20} /></a>
              <a href="https://www.linkedin.com/in/ashish5tha" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contact">
        <a href="mailto:ashish.stha5@gmail.com">ashish.stha5@gmail.com</a>
        <a href="/resume.pdf" download="Ashish-Shrestha-CV.pdf">Download CV (PDF)</a>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Ashish Shrestha. All work, all rights reserved.</div>
        <div className="socials">
          <a href="https://www.instagram.com/ashish.5tha/" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram"><FaInstagram size={15} /></a>
          <a href="https://vimeo.com/ashishshrestha" target="_blank" rel="noopener noreferrer" title="Vimeo" aria-label="Vimeo"><FaVimeoV size={15} /></a>
          <a href="https://www.linkedin.com/in/ashish5tha" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn"><FaLinkedin size={15} /></a>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────────── */
const PAGE_TITLES = {
  '/': 'Ashish Shrestha, Documentary Filmmaker',
  '/film': 'Film, Ashish Shrestha',
  '/production': 'Production Work, Ashish Shrestha',
  '/photography': 'Photography, Ashish Shrestha',
  '/about': 'About, Ashish Shrestha',
};

const LEGACY_HASHES = {
  '#films': '/film',
  '#travel': '/production',
  '#photography': '/photography',
  '#about': '/about',
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const target = LEGACY_HASHES[window.location.hash];
    if (target) navigate(target, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] || PAGE_TITLES['/'];
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <main className="site">
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/film" element={<FilmPage />} />
        <Route path="/production" element={<ProductionPage />} />
        <Route path="/photography" element={<PhotographyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </main>
  );
}
