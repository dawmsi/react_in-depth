import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { AuthSection } from './AuthSection';
import { useAuth0 } from '@auth0/auth0-react';

export function AppHeader() {
  const { isAuthenticated } = useAuth0();

  return (
    <AppBar position="static">
      <Toolbar>
        <LiveTvOutlinedIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          The Movies DB
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/extra">Extra</HeaderLink>
            {isAuthenticated && (
              <HeaderLink to="/protected">Protected</HeaderLink>
            )}
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Box>
        <AuthSection />
      </Toolbar>
    </AppBar>
  );
}

function HeaderLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      component={RouterLink}
      to={to}
      variant="button"
      color="inherit"
      sx={{ my: 1, mx: 1.5 }}>
      {children}
    </Link>
  );
}
