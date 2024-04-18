import { Outlet } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';

import { deepPurple } from '@mui/material/colors';
import AppHeader from './AppHeader';
import { AnonymousUser, AuthContext, AuthInfo } from './AppContext';
import { useState } from 'react';

const defaultTheme = createTheme({
  palette: {
    primary: deepPurple,
  },
});

const App = () => {
  const [auth, setAuth] = useState<AuthInfo>({ user: AnonymousUser });

  const fakeAuth = {
    user: {
      name: 'Matiew',
    },
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthContext.Provider value={auth}>
        <AppHeader
          onLogin={() => setAuth(fakeAuth)}
          onLogout={() => setAuth(fakeAuth)}
        />
        <Container component="main" sx={{ p: 2, mt: '64px' }}>
          <Outlet />
        </Container>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
