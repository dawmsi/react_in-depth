import { Box, Typography } from '@mui/material';

export const Error = () => {
  return (
    <Box
      p={3}
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'blue',
      }}>
      <Typography color="white" variant="h2">
        Fatal Error
      </Typography>
      <Typography color="white" variant="h6" paragraph maxWidth="md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim atque
        aliquid suscipit tenetur in perferendis eum impedit pariatur, tempore
        aut omnis corrupti, ab, quo repudiandae et perspiciatis non totam
        adipisci.
      </Typography>
    </Box>
  );
};
