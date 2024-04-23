import { AppState, Auth0Provider } from '@auth0/auth0-react';
import configuration from '../configuration';
import { useNavigate } from 'react-router-dom';

const authConfig = {
  domain: configuration.auth0Domain!,
  clientId: configuration.auth0ClientId!,
  authorizationParams: {
    redirect_uri: configuration.auth0RedirectUri,
    audience: configuration.audience,
  },
};

interface StatefulAuthProviderProps {
  children?: React.ReactNode;
}

export function StatefulAuthProvider({ children }: StatefulAuthProviderProps) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      {...authConfig}
      useRefreshTokens
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  );
}
