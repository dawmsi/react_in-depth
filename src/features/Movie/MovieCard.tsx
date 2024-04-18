import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Movie } from '../../reducers/movies';
import { Link as RouterLink } from 'react-router-dom';

const MovieCard = ({ id, title, popularity, overview, poster_path }: Movie) => {
  return (
    <Card>
      <CardMedia
        component="div"
        sx={{ pt: '99%' }}
        image={`${import.meta.env.VITE_MEDIA}` + poster_path}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          className="text-ellipsis text-nowrap max-w-full overflow-hidden">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {overview}
        </Typography>
        <Typography variant="button" display="block" mt={2} fontWeight={600}>
          {popularity}
        </Typography>
        <CardActions>
          <Button
            component={RouterLink}
            to={`/movies/${id}`}
            variant="contained"
            color="secondary">
            Details
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
