import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Welcome
        </Typography>
        <Typography align="center" variant="h5" paragraph>
          Explore movies
        </Typography>
        <Stack
          marginTop={4}
          direction="row"
          spacing={2}
          justifyContent="center">
          <Button
            component={Link}
            to="movies"
            variant="contained"
            color="secondary">
            Explore
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
