import { useEffect } from "react";
import MovieCard from "./MovieCard";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { Movie, fetchMovies } from "../../reducers/movies";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface MoviesProps {
  movies: Movie[];
  loading: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
function Movies({ movies, loading }: MoviesProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center p-3">
          <span className="animate-spin text-2xl">{`M`}</span>
        </div>
      ) : (
        <ul className="flex flex-wrap justify-center gap-2">
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
      )}
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});

const connector = connect(mapStateToProps);

// eslint-disable-next-line react-refresh/only-export-components
export default connector(Movies);
