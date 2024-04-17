import MovieCard from "./MovieCard";
import { Movie } from "../../reducers/movies";
import { connect } from "react-redux";
import { RootState } from "../../store";

interface MoviesProps {
  movies: Movie[];
}

function Movies({ movies }: MoviesProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {movies.map(({ title, popular, overview }, index) => (
        <article key={index}>
          <MovieCard title={title} popular={popular} overview={overview} />
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
