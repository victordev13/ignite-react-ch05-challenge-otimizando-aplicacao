import { useCallback, useEffect, useMemo, useState } from "react";
import { GenreResponseProps, MovieProps } from "../App";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenreId: number;
}

export function Content({ selectedGenreId }: ContentProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const fetchMovies = useCallback(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  const fetchGenreDetail = useCallback(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  useEffect(() => {
    fetchMovies();
    fetchGenreDetail();
  }, [fetchMovies, fetchGenreDetail]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)}
        </div>
      </main>
    </div>
  )
}