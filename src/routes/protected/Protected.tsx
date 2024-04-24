import { useAuth0 } from '@auth0/auth0-react';
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { protectedApi } from '../../services/protectedApi';

export function Protected() {
  const [response, setResponse] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getJSON = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await protectedApi.getData(accessToken);
        const json = await response?.json();
        if (response) {
          setResponse(JSON.stringify(json, null, 2));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getJSON();
  }, [getAccessTokenSilently]);

  return (
    <Container sx={{ p: 2 }}>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This page calls external API protected by JWT token.
      </Alert>
      {!response ? (
        <>
          <LinearProgress />
          <Typography>Server is not responding / OFFLINE</Typography>
        </>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography variant="button">Response:</Typography>
          <pre>
            <code>{response}</code>
          </pre>
        </Box>
      )}
    </Container>
  );
}
