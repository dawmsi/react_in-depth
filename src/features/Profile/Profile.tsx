import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, Container, Stack, Typography } from '@mui/material';

export function Profile() {
  const { user } = useAuth0();

  return (
    <Container sx={{ p: 2 }}>
      <Stack>
        <Box>
          <Avatar src={user?.picture} />
          <Box sx={{ mt: 1 }}>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography>{user?.email}</Typography>
          </Box>
        </Box>
        <Box>
          <pre>
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
        </Box>
      </Stack>
    </Container>
  );
}
