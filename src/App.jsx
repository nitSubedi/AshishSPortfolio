import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaVimeoV, FaInstagram } from 'react-icons/fa';

/* ─── Film data ──────────────────────────────────────────── */
const FILMS = [
  {
    id: 'threading',
    title: 'Threading the American Dream',
    year: '2026',
    status: 'Work in Progress',
    role: 'Director, Cinematographer, Editor',
    image: '/media/threading-american-dream.jpg',
    vimeoId: '1194505499',
    vimeoHash: 'e3cea82ba4',
    synopsis:
      'Threading the American Dream is a 26-minute character-driven documentary about Dipa Bhattarai, a Nepali immigrant who came to the American South to pursue her undergraduate degree. She built a threading business from almost nothing, was shut down by the Mississippi State Board of Cosmetology, and fought back through a federal lawsuit that ultimately changed Mississippi law.',
    accolades: [
      'First Prize, Student Documentary Pitch, Riverrun International Film Festival 2026.',
      'First Prize, Student Artistic Presentation, Auburn Southern Studies Conference 2026.',
    ],
    featured: true,
  },
  {
    id: 'griot',
    title: 'Griot of the South',
    year: '',
    role: 'Director, Cinematographer, Editor',
    image: '/projects/griot/cover.png',
    vimeoId: '1194469987',
    vimeoHash: 'd1d67f7679',
    description:
      "A short musical documentary about John Mohead, a Delta blues singer and songwriter devoted to preserving Southern music and culture. The film follows Mohead's voice and his commitment to keeping a regional tradition alive.",
  },
  {
    id: 'jere',
    title: 'Jere Allen: A Lifetime of Passion and Resilience',
    year: '',
    role: 'Director, Cinematographer, Editor',
    image: '/projects/jere-allen/cover.png',
    vimeoId: '941591505',
    vimeoHash: '1f181bebaa',
    description:
      'An intimate portrait of Jere Allen, a lifelong painter, told through his life, his studio, and the work he has made across decades. The film sits with a man still devoted to his craft late in life and asks what it means to keep making art when the making is the point.',
  },
];

/* ─── Travel data — all 15 films ────────────────────────── */
const TRAVEL = [
  { name: 'KORI', subtitle: 'The Beautiful Highlands of Kaski', loc: 'Kaski, Nepal', year: '2020', yt: 'WnGWfHJQb5U' },
  { name: 'Chola Circuit & Everest Base Camp', subtitle: 'Ep. Two — Kalapathar & EBC', loc: 'Khumbu, Nepal', year: '2021', yt: 'LolExdWgPDU' },
  { name: 'Badimalika & Tribeni Patan', subtitle: 'Pilgrimage via Kalikot', loc: 'Bajura, Nepal', year: '2021', yt: '9iXhMmPtqRE' },
  { name: 'Khumai Dada', subtitle: 'Great Machhapuchhre Trail', loc: 'Kaski, Nepal', year: '2022', yt: 'C0xkXjMK8Jk' },
  { name: 'Ramaroshan', subtitle: 'Episode I — 12 Lakes, 18 Meadows', loc: 'Achham, Nepal', year: '2021', yt: 'VTq6NA18xeM' },
  { name: 'People & Culture of Madhesh Pradesh', subtitle: 'Imagine Nepal', loc: 'Madhesh, Nepal', year: '2022', yt: 'SBEkfMAD6VM' },
  { name: 'Saipal Base Camp — Road Trip', subtitle: 'Episode 1', loc: 'Bajhang, Nepal', year: '2022', yt: 'uGTjK0m_NQY' },
  { name: 'Saipal Base Camp — The Trek', subtitle: 'Episode 2', loc: 'Bajhang, Nepal', year: '2022', yt: 'jid2_wtB7kQ' },
  { name: 'Raidhungi & Saipal Finale', subtitle: 'Bajhang series finale', loc: 'Bajhang, Nepal', year: '2023', yt: 'c0u_ppZVsLk' },
  { name: 'Holi in Janakpur', subtitle: 'Festival of colors', loc: 'Janakpur, Nepal', year: '2024', yt: 'pqHYiqfaqNI' },
  { name: 'Kanchanjunga Base Camp', subtitle: 'Ep. 1 — Oktang', loc: 'Taplejung, Nepal', year: '2020', yt: 'BBa0F1kzToI' },
  { name: 'Kanchanjunga Base Camp', subtitle: 'Ep. 2 — Pangpema North', loc: 'Taplejung, Nepal', year: '2020', yt: '6itDcVxx-s4' },
  { name: 'Meme Pokhari', subtitle: 'Lockdown Series', loc: 'Lamjung, Nepal', year: '2020', yt: 'ELgO9sT7uW0' },
  { name: 'Gokyo', subtitle: 'Chola Circuit Ep. 3 — Chola Pass & Gokyo Ri', loc: 'Khumbu, Nepal', year: '2020', yt: 'zIMONZdb188' },
  { name: 'NESO', subtitle: 'The dying festival of the Kanchanjungas', loc: 'Ghunsa, Taplejung', year: '2020', yt: 'ozvsYlEz-Lg' },
];

/* ─── Photo sets ─────────────────────────────────────────── */
const PHOTO_SETS = [
  {
    id: 'mr-brown',
    title: 'Mr. Brown',
    subtitle: 'Journey from Farm to Market',
    years: '2025',
    layout: 'essay',
    cover: '/projects/mr-brown/web/1 Large.jpeg',
    images: [
      '/projects/mr-brown/web/1 Large.jpeg',
      '/projects/mr-brown/web/2 Large.jpeg',
      '/projects/mr-brown/web/3 Large.jpeg',
      '/projects/mr-brown/web/4 Large.jpeg',
      '/projects/mr-brown/web/5 Large.jpeg',
      '/projects/mr-brown/web/DSC02528 Large.jpeg',
      '/projects/mr-brown/web/DSC02645 Large.jpeg',
      '/projects/mr-brown/web/DSC02651 Large.jpeg',
      '/projects/mr-brown/web/DSC02767 Large.jpeg',
    ],
    caption: {
      lede: 'From farm to market.',
      body: 'Mr. Brown is a local farmer in Water Valley, Mississippi, who has been farming for 43 years following the footsteps of his parents. He grows vegetables, fruits, herbs, and raises livestock — and brings everything to the Oxford community market. This project follows his journey from the land to the people he sells to.',
    },
  },
  {
    id: 'landscape',
    title: 'Landscape',
    subtitle: '',
    years: '2020–2025',
    layout: 'wide',
    cover: null,
    images: [],
    caption: {
      lede: 'Two places, one camera.',
      body: 'Pictures made between trekking shoots in Nepal and quiet driving weeks across the Mississippi Delta. The frames are wide on purpose — most are made just before or after the main film of the day, when the light has gone soft and the work is technically over.',
    },
  },
];

/* ─── TopBar ─────────────────────────────────────────────── */
export function TopBar({ section, setSection }) {
  const items = [
    ['films', 'Films'],
    ['travel', 'Travel Documentaries'],
    ['photography', 'Photography'],
    ['about', 'About'],
  ];
  return (
    <header className="topbar">
      <div className="brand" onClick={() => setSection('films')} style={{ cursor: 'pointer' }}>
        <h1 className="brand-name">Ashish Shrestha</h1>
        <p className="brand-role">Documentary Filmmaker</p>
      </div>
      <nav className="nav" aria-label="Sections">
        {items.map(([id, label]) => (
          <button
            key={id}
            aria-current={section === id ? 'true' : 'false'}
            onClick={() => setSection(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

/* ─── Inline Vimeo player ────────────────────────────────── */
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

/* ─── Films section ──────────────────────────────────────── */
export function FilmsSection() {
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const featured = FILMS.find(f => f.featured);
  const rest = FILMS.filter(f => !f.featured);

  return (
    <section className="tab-panel" data-screen-label="Films">
      <div className="section-head">
        <h2>Films</h2>
      </div>

      {/* Featured */}
      <article className="featured">
        <div
          className="media"
          onClick={!featuredPlaying ? () => setFeaturedPlaying(true) : undefined}
          style={{ cursor: featuredPlaying ? 'default' : 'pointer' }}
        >
          {featuredPlaying ? (
            <VimeoPlayer vimeoId={featured.vimeoId} vimeoHash={featured.vimeoHash} title={featured.title} />
          ) : (
            <>
              {featured.image && (
                <img src={featured.image} alt={featured.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </>
          )}
        </div>
        <div className="body">
          <h3>{featured.title}</h3>
          {featured.role && <p className="role">{featured.role}</p>}
          <p className="synopsis">{featured.synopsis}</p>
          {featured.accolades && (
            <div className="accolades">
              {featured.accolades.map((line, i) => (
                <p key={i} className="synopsis">{line}</p>
              ))}
            </div>
          )}
        </div>
      </article>

      {rest.length > 0 && (
        <>
          <div className="films-divider" />
          <div className="grid" style={{ marginTop: 60 }}>
            {rest.map(film => <FilmCard key={film.id} film={film} />)}
          </div>
        </>
      )}
    </section>
  );
}

export function FilmCard({ film }) {
  const [playing, setPlaying] = useState(false);
  const handleClick = () => {
    if (film.vimeoId) setPlaying(true);
    else if (film.url) window.open(film.url, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="card" onClick={!playing ? handleClick : undefined} style={(!playing && (film.vimeoId || film.url)) ? { cursor: 'pointer' } : {}}>
      <div className="media">
        {playing ? (
          <VimeoPlayer vimeoId={film.vimeoId} vimeoHash={film.vimeoHash} title={film.title} />
        ) : film.image ? (
          <img src={film.image} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div className="media-placeholder" />
        )}
      </div>
      <div className="info">
        <div className="info-row">
          <h4 className="title">{film.title}</h4>
          {film.year && <span className="year">{film.year}</span>}
        </div>
        {film.role && <p className="role">{film.role}</p>}
        {film.description && <p className="description">{film.description}</p>}
      </div>
    </div>
  );
}

/* ─── Travel section ─────────────────────────────────────── */
function formatViews(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M views';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K views';
  return n + ' views';
}

export function TravelSection() {
  const [views, setViews] = useState({});

  useEffect(() => {
    const key = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!key) return;
    const ids = TRAVEL.map(t => t.yt).join(',');
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
    <section className="tab-panel" data-screen-label="Travel">
      <div className="section-head">
        <h2>Travel Documentaries</h2>
      </div>

      <p className="travel-intro">All of these films were made for Ghumante, a Nepali travel content creator where I worked as cinematographer and editor from 2017 to 2023. Over six years, I shot and edited 45+ films across Nepal — from week-long to month-long treks in the Himalayas. I was part of the team when it grew from 10,000 to 250,000 subscribers. I worked on a small crew, planning and handling the camera in the field and editing at my desk. The films blend observational documentary with landscape.</p>

      <div className="grid grid-3">
        {TRAVEL.map((t, i) => (
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
                alt={`${t.name} — thumbnail`}
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

/* ─── Photography section ────────────────────────────────── */
export function PhotographySection() {
  const [openSet, setOpenSet] = useState(null);

  if (openSet) {
    const set = PHOTO_SETS.find(s => s.id === openSet);
    return (
      <section className="tab-panel" data-screen-label="Photography">
        <div className="section-head">
          <div className="folder-breadcrumb">
            <h2>{set.title}</h2>
          </div>
        </div>

        <div className="folder-caption">
          <p className="folder-caption-lede">{set.caption.lede}</p>
          <p className="folder-caption-body">{set.caption.body}</p>
        </div>

        <PhotoLayout layout={set.layout} images={set.images} title={set.title} />

      </section>
    );
  }

  return (
    <section className="tab-panel" data-screen-label="Photography">
      <div className="section-head">
        <h2>Photography</h2>
      </div>
      <div className="folder-grid">
        {PHOTO_SETS.map((set, si) => (
          <div
            className="folder"
            key={set.id}
            onClick={() => setOpenSet(set.id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setOpenSet(set.id)}
          >
            <div className="folder-tab" aria-hidden="true" />
            <div className="folder-cover">
              {set.cover
                ? <img src={set.cover} alt={set.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', background: 'var(--bg-2)' }} />
              }
            </div>
            <div className="folder-meta">
              <div className="folder-title-row">
                <h3>{set.title}</h3>
              </div>
              <p className="folder-sub">{set.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PhotoLightbox({ images, index, onClose, onPrev, onNext }) {
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
        src={images[index]}
        alt={`Photo ${index + 1}`}
        className="lightbox-img"
        onClick={e => e.stopPropagation()}
      />
      <button className="lightbox-next" onClick={e => { e.stopPropagation(); onNext(); }}>›</button>
    </div>
  );
}

export function PhotoLayout({ layout, images, title }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const total = images.length;

  const Placeholder = () => (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg-2)' }} />
  );
  const Img = ({ i }) => {
    if (!images[i]) return <Placeholder />;
    return (
      <img
        src={images[i]}
        alt={`${title} ${i + 1}`}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    );
  };

  if (layout === 'essay') {
    return (
      <>
        <div className="layout-essay">
          {images.map((src, i) => (
            <div key={i} className="le-essay-item" onClick={() => setLightboxIndex(i)}>
              <img src={src} alt={`${title} ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
        {lightboxIndex !== null && (
          <PhotoLightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((lightboxIndex - 1 + total) % total)}
            onNext={() => setLightboxIndex((lightboxIndex + 1) % total)}
          />
        )}
      </>
    );
  }

  if (layout === 'editorial') {
    return (
      <div className="layout-editorial">
        <div className="le-row-1">
          <div className="le-hero"><Img i={0} /></div>
          <div className="le-col">
            <div className="le-col-item"><Img i={1} /></div>
            <div className="le-col-item"><Img i={2} /></div>
          </div>
        </div>
        <div className="le-row-2">
          <div className="le-portrait"><Img i={3} /></div>
          <div className="le-wide"><Img i={4} /></div>
        </div>
        {images[5] && <div className="le-row-3"><Img i={5} /></div>}
      </div>
    );
  }

  if (layout === 'wide') {
    return (
      <div className="layout-wide">
        <div className="lw-pano"><Img i={0} /></div>
        <div className="lw-split">
          <div className="lw-two"><Img i={1} /></div>
          <div className="lw-one"><Img i={2} /></div>
        </div>
        <div className="lw-pano"><Img i={3} /></div>
        <div className="lw-split lw-split-flip">
          <div className="lw-one"><Img i={4} /></div>
          <div className="lw-two"><Img i={5} /></div>
        </div>
      </div>
    );
  }

  return null;
}

/* ─── About section ──────────────────────────────────────── */
export function AboutSection() {
  return (
    <section className="tab-panel" data-screen-label="About">
      <div className="section-head">
        <h2>About</h2>
        <span className="count">Currently — Oxford, Mississippi</span>
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
            His short film <em>Jere Allen — A Lifetime of Passion and Resilience, Painted on Canvas</em>, an
            intimate portrait of a lifelong painter. The film was selected for the South Georgia Film Festival,
            Oxford Film Festival, Redfish Film Festival, Rising Tide Film Festival, and Jackson Doc Fest.
          </p>
          <p>
            Before graduate school, Ashish worked as a cinematographer and editor in Nepal, producing more than
            45 travel documentaries for digital platforms named <em>Ghumante</em>. His work reflects his
            experience as a Nepali international student in the American South and his commitment to telling
            grounded, human stories with clarity and care.
          </p>

          <div className="contact-card">
            <a
              className="resume-btn"
              href="/resume.pdf"
              download="Ashish-Shrestha-Resume.pdf"
            >
              <span className="resume-btn-arrow" aria-hidden="true">↓</span>
              <span className="resume-btn-label">
                <span className="resume-btn-main">Résumé</span>
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
      <div>© 2026 Ashish Shrestha — All work, all rights reserved.</div>
      <div className="socials">
        <a href="https://www.instagram.com/ashish.5tha/" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram"><FaInstagram size={15} /></a>
        <a href="https://vimeo.com/ashishshrestha" target="_blank" rel="noopener noreferrer" title="Vimeo" aria-label="Vimeo"><FaVimeoV size={15} /></a>
        <a href="https://www.linkedin.com/in/ashish5tha" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn"><FaLinkedin size={15} /></a>
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────────── */
export default function App() {
  const [section, setSection] = useState('films');

  useEffect(() => {
    const fromHash = (window.location.hash || '').replace('#', '');
    if (['films', 'travel', 'photography', 'about'].includes(fromHash)) {
      setSection(fromHash);
    }
  }, []);

  useEffect(() => {
    if (window.location.hash.replace('#', '') !== section) {
      window.history.replaceState(null, '', `#${section}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [section]);

  const panels = {
    films: <FilmsSection />,
    travel: <TravelSection />,
    photography: <PhotographySection />,
    about: <AboutSection />,
  };

  return (
    <main className="site">
      <TopBar section={section} setSection={setSection} />
      {panels[section]}
      <Footer />
    </main>
  );
}
