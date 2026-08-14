export interface Interest {
  id: string;
  title: string;
  creator: string;
  medium: 'Books' | 'Book' | 'Movie' | 'TV' | 'Game';
  year: string;
  note: string;
  url?: string;
  /**
   * Path under public/covers/. Leave undefined to render the generated
   * typographic card instead. Dropping a real image in and adding one line
   * here is all it takes to swap.
   */
  cover?: string;
  /** Colour pair for the generated card when there is no cover image. */
  palette: [string, string];
}

export const interests: Interest[] = [
  {
    id: 'dungeon-crawler-carl',
    title: 'Dungeon Crawler Carl',
    creator: 'Matt Dinniman',
    medium: 'Books',
    year: '2020 to now',
    note: 'The whole series. Earth gets demolished into a game show dungeon and the run is broadcast live. Eight books out, the ninth is the last one.',
    url: 'https://en.wikipedia.org/wiki/Dungeon_Crawler_Carl',
    cover: 'dungeon-crawler-carl.jpg',
    palette: ['#f97316', '#7c2d12'],
  },
  {
    id: 'the-odyssey',
    title: 'The Odyssey',
    creator: 'Christopher Nolan',
    medium: 'Movie',
    year: '2026',
    note: 'Nolan doing Homer, shot entirely on IMAX 70mm. Matt Damon as Odysseus.',
    url: 'https://en.wikipedia.org/wiki/The_Odyssey_(2026_film)',
    palette: ['#0ea5e9', '#0c4a6e'],
  },
  {
    id: 'feel-good-productivity',
    title: 'Feel-Good Productivity',
    creator: 'Ali Abdaal',
    medium: 'Book',
    year: '2023',
    note: 'Productivity built around energy and enjoyment rather than discipline. Relevant to the day job more than I expected.',
    cover: 'feel-good-productivity.jpg',
    palette: ['#facc15', '#a16207'],
  },
  {
    id: 'splatoon-raiders',
    title: 'Splatoon Raiders',
    creator: 'Nintendo',
    medium: 'Game',
    year: '2026',
    note: 'Single-player Splatoon for Switch 2. You play a mechanic working with Deep Cut across the Spirhalite Islands.',
    url: 'https://en.wikipedia.org/wiki/Splatoon_Raiders',
    palette: ['#ec4899', '#4c1d95'],
  },
  {
    id: 'fallout',
    title: 'Fallout',
    creator: 'Prime Video',
    medium: 'TV',
    year: '2024 to now',
    note: 'Season two took the wasteland to New Vegas. One of the few game adaptations that understands the source material.',
    url: 'https://en.wikipedia.org/wiki/Fallout_season_2',
    palette: ['#84cc16', '#14532d'],
  },
];
