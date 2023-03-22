// CSS
import "./MovieGrid.css";

// Hooks
import { useState, useEffect } from "react";

// React-Router-DOM
import { useSearchParams } from "react-router-dom";

// Components
import MovieCard from "../components/MovieCard";

// API Import
const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [movies, setMovies] = useState([]);

  // Funcao async pois faz a requisicao
  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results); // Filmes
  };

  // Chama a funcao sempre que o componente (pagina) for carregado
  useEffect(() => {
    const searchWithQueryURL = `${searchUrl}?${apiKey}&query=${query}`;
    getSearchedMovies(searchWithQueryURL);
  }, []);

  return (
    <div className="container">
      <h2 className="title">
        Movie: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies?.length === 0 && <p>Loading...</p>}
        {movies?.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
