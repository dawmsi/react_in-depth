import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';
import { memo } from 'react';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  image?: string;
}

interface MovieProps extends Movie {
  enableUserActions?: boolean;
  onAddFavorite?(id: number): void;
}

// eslint-disable-next-line react-refresh/only-export-components
const MovieCard = ({
  id,
  title,
  popularity,
  overview,
  image,
  enableUserActions,
  onAddFavorite,
}: MovieProps) => {
  console.count('MovieCard');

  return (
    <Card>
      <CardMedia component="div" sx={{ pt: '99%' }} image={image} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5">{title}</Typography>
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
          {enableUserActions && (
            <Tooltip title="Add to favorite">
              <Button
                onClick={() => {
                  onAddFavorite?.(id);
                }}>
                <Favorite />
              </Button>
            </Tooltip>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

const memoizeComponent = memo(MovieCard);

export default memoizeComponent;
