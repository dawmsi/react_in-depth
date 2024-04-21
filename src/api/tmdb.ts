import configuration from '../configuration';

const apiBasePath = `${configuration.apiUrl}/3`;

async function get<TBody>(relativeUrl: string): Promise<TBody> {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', `Bearer ${configuration.apiToken}`);

  const requestOptions = {
    method: 'GET',
    headers: headers,
  };

  const response = await fetch(`${apiBasePath}${relativeUrl}`, requestOptions);
  const value: TBody = await response.json();
  return value;
}

interface PageResponse<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
  total_results: number;
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  poster_path?: string | null;
}

/* interface PageDetails<T> {
  results: T[];
  page: number;
  totalPages: number;
} */

interface Configuration {
  images: {
    base_url: string;
  };
}
/* 
interface ITmbdClient {
  getConfiguration: () => Promise<Configuration>;
  getNowPlaying: (page: number) => Promise<PageDetails<MovieDetails>>;
  getKeywords: (query: string) => Promise<PageDetails<MovieDetails>>;
} */

export interface KeywordItem {
  id: number;
  name: string;
}

export interface MoviesFilters {
  keywords?: number[];
}

export const client = {
  getConfiguration: async () => {
    const response = await get<Configuration>('/configuration');
    return response;
  },
  getNowPlaying: async (page: number = 1) => {
    const response = await get<PageResponse<MovieDetails>>(
      `/movie/now_playing?page=${page}`
    );
    return {
      results: response.results,
      totalPages: response.total_pages,
      page: response.page,
    };
  },

  async getMovies(page: number, filters: MoviesFilters) {
    const params = new URLSearchParams({
      page: page.toString(),
    });

    if (filters.keywords?.length) {
      params.append('with_keywords', filters.keywords.join('|'));
    }

    const query = params.toString();

    const response = await get<PageResponse<MovieDetails>>(
      `/discover/movie?${query}`
    );
    return {
      results: response.results,
      totalPages: response.total_pages,
      page: response.page,
    };
  },

  async getKeywords(query: string) {
    const response = await get<PageResponse<KeywordItem>>(
      `/search/keyword?query=${query}`
    );
    return response.results;
  },
};
