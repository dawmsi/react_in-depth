import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AnonymousUser, AuthContext } from '../AppContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const loggedIn = user !== AnonymousUser;
  const greeting = loggedIn ? `Hi ${user.name}!` : `Hi ghost!`;

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
