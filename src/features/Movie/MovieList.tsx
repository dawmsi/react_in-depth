import MovieCard from "./MovieCard";
/* import { Movie } from "../../reducers/movies"; */
import { connect } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { client } from "../../api/tmdb";
import { Movie } from "../../reducers/movies";
/* 
interface MoviesProps {
  movies: Movie[];
} */

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadData() {
      const results = await client.getNowPlaying();
      setMovies(results);
      console.log(results);
    }

    loadData();
  }, []);

  return (
    <ul className="flex flex-wrap gap-2">
      {movies.map(({ id, title, popularity, overview, poster_path }) => (
        <article key={id}>
          <MovieCard
            title={title}
            popularity={popularity}
            overview={overview}
            poster_path={poster_path}
          />
        </article>
      ))}
    </ul>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
});

const connector = connect(mapStateToProps);

export default connector(Movies);
