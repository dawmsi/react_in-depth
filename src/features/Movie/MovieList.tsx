import { useEffect } from "react";
import MovieCard from "./MovieCard";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { client } from "../../api/tmdb";
import { Movie, moviesLoaded } from "../../reducers/movies";

interface MoviesProps {
  movies: Movie[];
}

function Movies({ movies }: MoviesProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadData() {
      const results = await client.getNowPlaying();
      dispatch(moviesLoaded(results));
    }

    loadData();
  }, [dispatch]);

  return (
    <ul className="flex flex-wrap gap-2">
      {movies.map(({ title, popularity, overview, poster_path, id = 0 }, index) => (
        <article key={`${index}${id}`}>
          <MovieCard
            key={"card" + id}
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
