import { createContext } from 'react';

export interface AuthInfo {
  user: {
    name: string;
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export const AnonymousUser = {
  name: 'AnonymousUser',
};

export const AuthContext = createContext({
  user: AnonymousUser,
});
