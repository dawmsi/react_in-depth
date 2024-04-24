import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { NavLink as RouterLink } from 'react-router-dom';
import { AuthSection } from './AuthSection';
import { useAuth0 } from '@auth0/auth0-react';

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
      sx={{ my: 1, mx: 1.5, textDecoration: 'none' }}>
      {children}
    </Link>
  );
}

export function AppHeader() {
  const { isAuthenticated } = useAuth0();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Extra', path: '/extra' },
    { name: 'Protected_Api', path: '/protected' },
    { name: 'About', path: '/about' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <LiveTvOutlinedIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
         MoviesTV
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            {navigation.map(({ name, path }, index) => {
              if (path === '/protected' && !isAuthenticated) return;

              return (
                <HeaderLink key={index} to={path}>
                  {name}
                </HeaderLink>
              );
            })}
          </nav>
        </Box>
        <AuthSection />
      </Toolbar>
    </AppBar>
  );
}
