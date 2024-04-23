import { Outlet } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';

import { deepPurple } from '@mui/material/colors';
import { AppHeader } from './features/Header/AppHeader';

const defaultTheme = createTheme({
  palette: {
    primary: deepPurple,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppHeader />
      <Container component="main" sx={{ p: 2, mt: '64px' }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default App;
