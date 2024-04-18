import { Outlet } from 'react-router-dom';
import Navigation from './routes/Navigation';
import {
  AppBar,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';

import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { deepPurple } from '@mui/material/colors';

const defaultTheme = createTheme({
  palette: {
    primary: deepPurple,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar>
        <Toolbar component="nav">
          <LiveTvOutlinedIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit">
            React Adven
          </Typography>
          <Navigation />
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ p: 2, mt: '64px' }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default App;
