import { Movie } from "../../reducers/movies";

const MovieCard = ({ title, popularity, overview, poster_path }: Movie) => {
  return (
    <div className="p-2 flex flex-col justify-center items-center w-52 bg-gray-700 rounded-md">
      <img
        className="p-1 rounded-lg overflow-hidden"
        src={`${import.meta.env.VITE_MEDIA}` + poster_path}
        alt={"poster for " + title}
      />
      <h3 className="text-ellipsis text-nowrap max-w-full overflow-hidden">{title}</h3>
      <p className="max-h-[4.2em] leading-[1.4rem] overflow-hidden text-ellipsis max-w-full">
        {overview}
      </p>
      <span>{popularity}</span>
    </div>
  );
};

export default MovieCard;
