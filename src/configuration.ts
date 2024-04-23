const configuration = {
  apiUrl: import.meta.env.VITE_API,
  apiToken: import.meta.env.VITE_API_TOKEN,
  auth0Domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
  auth0ClientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
  auth0RedirectUri: import.meta.env.VITE_APP_AUTH0_CALLBACK_URI,
  protectedApiUrl: import.meta.env.VITE__APP_PROTECTED_API_URL,
  audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
};

export default configuration;
