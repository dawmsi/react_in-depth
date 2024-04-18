import { Container, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { CountdownVideo } from '../CountdownVideo';
import MapView from '../MapView';

const About = () => {
  const [countdown, setCountdown] = useState(9);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intervalId = useRef<any>();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCountdown((value) => value - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId.current);
    };
  });

  useEffect(() => {
    if (countdown < 1) {
      clearInterval(intervalId.current);
    }
  }, [countdown]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center">
        Comimg soon: {countdown}
      </Typography>
      <CountdownVideo />
      <MapView />
    </Container>
  );
};

export default About;
