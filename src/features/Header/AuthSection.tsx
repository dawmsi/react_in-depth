import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { UserSettingsMenu } from "./UserSettingsMenu";

export function AuthSection() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return isAuthenticated && user ? (
    <UserSettingsMenu user={user} onLogout={handleLogout} onOpenProfile={() => navigate("/profile")} />
  ) : (
    <Button color="inherit" onClick={handleLogin}>
      Log in
    </Button>
  );
}
