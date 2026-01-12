import toast, { Toaster } from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';

const notify = () => toast.error('No movies found for your request.');

export default function App() {
  async function handleForm(query: string) {
    try {
      const movies: Movie[] = await fetchMovies(query);
      if (movies.length === 0) {
        notify();
      }
      console.log(movies);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <SearchBar onSubmit={handleForm} />
      <Toaster />
    </>
  );
}
