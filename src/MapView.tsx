import { Container } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { addPopupToMapWidget, createMapWidget } from './features/mapWidget';
import { Map } from 'leaflet';
import { createPortal } from 'react-dom';
import { Box, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';

export default function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    if (mapRef.current === null) {
      const lMap = createMapWidget(containerRef.current!);
      mapRef.current = lMap;
      const popupDiv = addPopupToMapWidget(lMap);
      setPopupContainer(popupDiv);
    }
  }, []);

  return (
    <Container ref={containerRef} sx={{ width: '100%', height: 480, my: 4 }}>
      {popupContainer !== null && createPortal(<Greeting />, popupContainer)}
    </Container>
  );
}

function Greeting() {
  return (
    <Box>
      <Typography>Greting from Ukraine</Typography>
      <Favorite sx={{ color: '#0856B9' }} />
      <Favorite sx={{ color: '#FFD800' }} />
    </Box>
  );
}
