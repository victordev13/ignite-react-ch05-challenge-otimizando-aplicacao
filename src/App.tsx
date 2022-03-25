import { useCallback, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const handleClickButton = useCallback((id: number) => setSelectedGenreId(id), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        selectedGenreId={selectedGenreId}
        buttonClickCallback={handleClickButton}
      />

      <Content selectedGenreId={selectedGenreId} />
    </div>
  )
}