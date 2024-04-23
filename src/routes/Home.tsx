import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const greeting = isAuthenticated ? `Hi ${user?.name}!` : `Hi guest!`;

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Welcome
        </Typography>
        <Typography align="center" variant="h5" paragraph>
          {greeting}
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
