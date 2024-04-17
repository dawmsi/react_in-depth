import { Movie } from "../../reducers/movies";

const MovieCard = ({ title, popular, overview }: Movie) => {
  return (
    <div className="p-2 flex flex-col justify-center items-center w-fit bg-gray-700 rounded-md">
      <h3>{title}</h3>
      <p>{overview}</p>
      <span>{popular}</span>
    </div>
  );
};

export default MovieCard;
