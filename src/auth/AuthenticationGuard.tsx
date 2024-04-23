import { withAuthenticationRequired } from '@auth0/auth0-react';
import { LinearProgress } from '@mui/material';
import React from 'react';

interface AuthenticatedGuardProps {
  component: React.ComponentType;
}

export function AuthenticationGuard({ component }: AuthenticatedGuardProps) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <LinearProgress />,
  });

  return <Component />;
}
