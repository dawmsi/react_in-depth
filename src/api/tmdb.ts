import { Movie } from '../reducers/movies';

async function get<TBody>(relativeUrl: string): Promise<TBody> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  };

  const responce = await fetch(
    `${import.meta.env.VITE_API}${relativeUrl}`,
    options
  );
  const json: TBody = await responce.json();
  return json;
}

interface PageResponce<TResult> {
  page: number;
  results: TResult[];
}

export const client = {
  async getNowPlaying(): Promise<Movie[]> {
    const responce = await get<PageResponce<Movie>>(
      '/3/movie/now_playing?language=en-US&page=1'
    );
    return responce.results;
  },
};
