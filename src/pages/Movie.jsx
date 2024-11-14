import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { TfiVideoClapper } from "react-icons/tfi";
import './Movie.css';
import MovieCard from "../components/MovieCard";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  };

  const getMovieVideos = async (movieId) => {
    const videoURL = `${moviesURL}${movieId}/videos?${apiKey}`;
    const res = await fetch(videoURL);
    const data = await res.json();
    setVideos(data.results);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieURL);
    getMovieVideos(id); // Chama a função para buscar os vídeos do filme
  }, []);

  return (
    <div className="movie_page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p className="value">{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p className="value">{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p className="value">{movie.runtime} minutos</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Sinopse:
            </h3>
            <p>{movie.overview}</p>
          </div>
          {videos.length >  0 && (
            <div className="trailer">
              <h3>
                <TfiVideoClapper /> Trailer:
              </h3>
              <div className="embed-responsive embed-responsive-16by9">
                {videos.slice(0,1).map((video) => (
                  <iframe
                    key={video.id}
                    className="embed-responsive-item"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allowFullScreen
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Movie;
