import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import VideoModal from './components/VideoModal';

/* ─── Film data ──────────────────────────────────────────── */
const FILMS = [
  {
    id: 'threading',
    title: 'Threading The American Dream',
    year: '2026',
    status: 'Work in Progress',
    role: 'Director · Cinematographer · Editor',
    image: null,
    videoSrc: '/projects/cotton-thread/Teaser 2.mp4',
    synopsis:
      'Dipa Bhattarai, a Nepali student in Mississippi, threads eyebrows for friends in a dorm room — then turns the skill into a kiosk, a second shop, and a fight with the State Board of Cosmetology that ends up changing state law.',
    featured: true,
  },
  {
    id: 'griot',
    title: 'Griot of the South',
    year: '',
    role: '',
    image: null,
  },
  {
    id: 'jere',
    title: 'Jere Allen',
    year: '2024',
    role: '',
    image: null,
    url: 'https://vimeo.com/941591505?fl=pl&fe=sh',
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
    subtitle: 'Portrait series',
    years: '2025',
    layout: 'editorial',
    cover: null,
    images: [],
    caption: {
      lede: 'A year with Earnest Brown.',
      body: 'Mr. Brown is a retired barber in north Oxford, Mississippi. I photographed him in his shop, his garden, and the front porch of the house he has lived in since 1971 — a slow portrait of a man who has spent fifty years watching the same block change around him.',
    },
  },
  {
    id: 'landscape',
    title: 'Landscape',
    subtitle: 'Nepal · Mississippi',
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
function TopBar({ section, setSection }) {
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

/* ─── Films section ──────────────────────────────────────── */
function FilmsSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const featured = FILMS.find(f => f.featured);
  const rest = FILMS.filter(f => !f.featured);

  return (
    <section className="tab-panel" data-screen-label="Films">
      <div className="section-head">
        <h2>Films</h2>
      </div>

      {/* Featured */}
      <article className="featured">
        <div className="media" onClick={() => setVideoOpen(true)} style={{ cursor: 'pointer' }}>
          <span className="play-pill">
            <span className="dot" />
            Watch · Teaser
          </span>
        </div>
        <div className="body">
          <h3>{featured.title}</h3>
          <p className="synopsis">{featured.synopsis}</p>
        </div>
      </article>

      <AnimatePresence>
        {videoOpen && (
          <VideoModal videoSrc={featured.videoSrc} onClose={() => setVideoOpen(false)} />
        )}
      </AnimatePresence>

      {rest.length > 0 && (
        <div className="grid" style={{ marginTop: 80 }}>
          {rest.map(film => <FilmCard key={film.id} film={film} />)}
        </div>
      )}
    </section>
  );
}

function FilmCard({ film }) {
  const handleClick = () => {
    if (film.url) window.open(film.url, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="card" onClick={handleClick} style={film.url ? { cursor: 'pointer' } : {}}>
      <div className="media">
        <div className="media-placeholder" />
      </div>
      <div className="info">
        <h4 className="title">{film.title}</h4>
        {film.year && <span className="year">{film.year}</span>}
      </div>
      {film.role && <p className="role">{film.role}</p>}
    </div>
  );
}

/* ─── Travel section ─────────────────────────────────────── */
function TravelSection() {
  return (
    <section className="tab-panel" data-screen-label="Travel">
      <div className="section-head">
        <h2>Travel Documentaries</h2>
      </div>

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
            <p className="role">{t.subtitle ? `${t.subtitle} — ${t.loc}` : t.loc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ─── Photography section ────────────────────────────────── */
function PhotographySection() {
  const [openSet, setOpenSet] = useState(null);

  if (openSet) {
    const set = PHOTO_SETS.find(s => s.id === openSet);
    return (
      <section className="tab-panel" data-screen-label="Photography">
        <div className="section-head">
          <div className="folder-breadcrumb">
            <button className="back-link" onClick={() => setOpenSet(null)}>
              ← Photography
            </button>
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
        <span className="count">{PHOTO_SETS.length} series</span>
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
              <div style={{ width: '100%', height: '100%', background: 'var(--bg-2)' }} />
              <span className="folder-count">{set.images.length} images</span>
            </div>
            <div className="folder-meta">
              <div className="folder-title-row">
                <span className="photo-set-num">{String(si + 1).padStart(2, '0')}</span>
                <h3>{set.title}</h3>
              </div>
              <p className="folder-sub">{set.subtitle}</p>
              <p className="folder-years">{set.years}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PhotoLayout({ layout, images, title }) {
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
function AboutSection() {
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
            Director, Cinematographer, Editor — working between Mississippi and Nepal.
          </p>
          <p>
            Ashish Shrestha is a documentary filmmaker and cinematographer based
            in Oxford, Mississippi, originally from Nepal. His work centers on
            observational, visually driven films about people and places that
            are underrepresented. Through his films, he aims to create a
            positive impact on society by bringing overlooked stories to light.
          </p>
          <p>
            He is currently completing his MFA in Documentary Expression at the
            University of Mississippi. He is working on his thesis film,{' '}
            <em>Threading The American Dream</em>, which follows Nepali immigrant
            entrepreneur Dipa Bhattarai and her legal fight that changed
            Mississippi state law.
          </p>
          <p>
            His short film <em>Jere Allen — A Lifetime of Passion and Resilience,
            Painted on Canvas</em> is an intimate portrait of a lifelong painter.
            The film was selected for the South Georgia Film Festival, Oxford Film
            Festival, Redfish Film Festival, Rising Tide Film Festival, and Jackson
            Doc Fest.
          </p>
          <p>
            Before graduate school, Ashish worked as a cinematographer and editor
            in Nepal, producing more than 45 travel documentaries for digital
            platforms named <em>Ghumante</em>. His work reflects his experience as
            a Nepali immigrant in the American South and his commitment to telling
            grounded, human stories with clarity and care.
          </p>

          <div className="contact-card">
            <a
              className="resume-btn"
              href="/about-me.pdf"
              download="Ashish-Shrestha-Resume.pdf"
            >
              <span className="resume-btn-arrow" aria-hidden="true">↓</span>
              <span className="resume-btn-label">
                <span className="resume-btn-main">Download résumé</span>
                <span className="resume-btn-sub">PDF</span>
              </span>
            </a>
            <span className="eyebrow">Get in touch</span>
            <a className="email" href="mailto:ashish.stha5@gmail.com">
              ashish.stha5@gmail.com
            </a>
            <div className="links">
              <a href="https://www.instagram.com/theashishshrestha" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://vimeo.com/ashishshrestha" target="_blank" rel="noopener noreferrer">Vimeo</a>
              <a href="https://www.youtube.com/@theashishshrestha" target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div>© 2026 Ashish Shrestha — All work, all rights reserved.</div>
      <div className="socials">
        <a href="https://www.instagram.com/theashishshrestha" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://vimeo.com/ashishshrestha" target="_blank" rel="noopener noreferrer">Vimeo</a>
        <a href="https://www.youtube.com/@theashishshrestha" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="mailto:ashish.stha5@gmail.com">Email</a>
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
