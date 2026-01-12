import toast, { Toaster } from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';

const notify = () => toast.error('No movies found for your request.');

export default function App() {
  const [isSuccess, setIsSuccess] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  async function handleForm(query: string) {
    try {
      const result: Movie[] = await fetchMovies(query);
      setMovies(result);
      setIsSuccess(true);
      if (result.length === 0) {
        notify();
      }
    } catch (err) {
      setIsSuccess(false);
      setMovies([]);
      console.error(err);
    }
  }
  function handleSelect() {}
  return (
    <>
      <SearchBar onSubmit={handleForm} />
      <Toaster />
      {isSuccess ? (
        <MovieGrid onSelect={handleSelect} movies={movies} />
      ) : (
        <ErrorMessage />
      )}
    </>
  );
}
