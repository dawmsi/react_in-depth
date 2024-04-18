import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import Navigation from './routes/Navigation';
import { useContext } from 'react';
import { AnonymousUser, AuthContext } from './AppContext';

interface AuthSectionProps {
  onLogin(): void;
  onLogout(): void;
}

interface AuthHeaderProps {
  onLogin(): void;
  onLogout(): void;
}

const AppHeader = ({ onLogin, onLogout }: AuthHeaderProps) => {
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar component="nav">
          <LiveTvOutlinedIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit">
            React Adven
          </Typography>
          <Stack
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between">
            <Navigation />
            <AuthSection onLogin={onLogin} onLogout={onLogout} />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

function AuthSection({ onLogin, onLogout }: AuthSectionProps) {
  const auth = useContext(AuthContext);
  const loggedIn = auth.user !== AnonymousUser;

  if (loggedIn) {
    return (
      <Stack alignItems="center" direction="row" spacing={2}>
        <Typography>Hello {auth.user.name}!</Typography>
        <Button variant="text" color="inherit" onClick={onLogout}>
          Log out
        </Button>
      </Stack>
    );
  }

  return (
    <Button variant="text" color="inherit" onClick={onLogin}>
      Log in
    </Button>
  );
}

export default AppHeader;
