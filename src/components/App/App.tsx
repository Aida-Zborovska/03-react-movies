import toast, { Toaster } from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';

const notify = () => toast.error('No movies found for your request.');
type Status = 'success' | 'empty' | 'error';

export default function App() {
  const [status, setStatus] = useState<Status>('empty');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleForm(query: string) {
    setLoader(true);
    try {
      const result: Movie[] = await fetchMovies(query);
      setMovies(result);
      if (result.length === 0) {
        notify();
        setStatus('empty');
      } else {
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
      setMovies([]);
      console.error(err);
    }
    setLoader(false);
  }
  function handleMovieClick(selectedId: number) {
    setIsModalOpen(true);
    const movie = movies.filter(movie => movie.id === selectedId);
    setSelectedMovie(movie[0]);
  }
  function handleModalClose() {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }
  return (
    <>
      <SearchBar onSubmit={handleForm} />
      <Toaster />
      {status === 'success' && (
        <MovieGrid onSelect={handleMovieClick} movies={movies} />
      )}
      {status === 'error' && <ErrorMessage />}
      {loader && <Loader />}
      {isModalOpen && selectedMovie && (
        <MovieModal onClose={handleModalClose} movie={selectedMovie} />
      )}
    </>
  );
}
