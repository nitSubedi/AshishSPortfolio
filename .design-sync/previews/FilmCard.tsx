import { FilmCard } from 'portfolio';

export const WithImage = () => (
  <FilmCard
    film={{
      id: 'griot',
      title: 'Griot of the South',
      role: 'Director, Cinematographer, Editor',
      image: '/projects/griot/cover.png',
      vimeoId: '1194469987',
      vimeoHash: 'd1d67f7679',
      description:
        "A short musical documentary about John Mohead, a Delta blues singer and songwriter devoted to preserving Southern music and culture. The film follows Mohead's voice and his commitment to keeping a regional tradition alive.",
    }}
  />
);

export const WithYear = () => (
  <FilmCard
    film={{
      id: 'jere',
      title: 'Jere Allen: A Lifetime of Passion and Resilience',
      role: 'Director, Cinematographer, Editor',
      image: '/projects/jere-allen/cover.png',
      vimeoId: '941591505',
      vimeoHash: '1f181bebaa',
      year: '2024',
      description:
        'An intimate portrait of Jere Allen, a lifelong painter, told through his life, his studio, and the work he has made across decades.',
    }}
  />
);
