import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

type AuthContextType = {
  token: string | null;
  user: string | null;
  initializing: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
          const payload = JSON.parse(atob(savedToken.split(".")[1]));
          setUser(payload.sub || null);
        }
      } catch (err) {
        console.error("Erro ao carregar token:", err);
      } finally {
        setInitializing(false);
      }
    };
    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await api.post("/api/auth/login", { username, password });
    const newToken = response.data.token;
    if (!newToken) throw new Error("Token não retornado pela API");

    setToken(newToken);
    await AsyncStorage.setItem("token", newToken);

    const payload = JSON.parse(atob(newToken.split(".")[1]));
    setUser(payload.sub || username);
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, initializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
