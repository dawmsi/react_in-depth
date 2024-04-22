import { Typography } from '@mui/material';
import MovieList from '../features/Movie/MovieList';

// router lazy load function
export function Component() {
  return (
    <>
      <Typography variant="h3">Movies</Typography>
      <MovieList />
    </>
  );
}

Component.displayName = 'Movies';
