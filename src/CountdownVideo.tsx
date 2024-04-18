import { Card, CardActions, CardMedia, IconButton } from '@mui/material';
import { Pause, PlayArrow } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

export function CountdownVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef && videoRef.current?.play();
  }, []);

  function togglePlaying(): void {
    const nextPlaying = !isPlaying;

    if (nextPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }

    setIsPlaying(nextPlaying);
  }

  return (
    <Card sx={{ justifyContent: 'center', my: 3 }}>
      <CardMedia>
        <video
          ref={videoRef}
          src="https://www.pexels.com/download/video/4276289/"
          height={500}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </CardMedia>
      <CardActions>
        <IconButton onClick={togglePlaying}>
          {!isPlaying ? (
            <PlayArrow sx={{ height: 38, width: 38 }}></PlayArrow>
          ) : (
            <Pause sx={{ height: 38, width: 38 }}></Pause>
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
