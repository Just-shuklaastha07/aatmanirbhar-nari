import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [authLoading, setAuthLoading] = useState(Boolean(token));

  const saveAuthentication = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
  };

  const register = async (formData) => {
    const data = await registerUser(formData);
    saveAuthentication(data);

    return data;
  };

  const login = async (formData) => {
    const data = await loginUser(formData);
    saveAuthentication(data);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const verifyStoredToken = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser(token);

        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (error) {
        console.error("Authentication verification failed:", error);
        logout();
      } finally {
        setAuthLoading(false);
      }
    };

    verifyStoredToken();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authLoading,
        isAuthenticated: Boolean(user && token),
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}