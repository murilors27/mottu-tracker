import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

type AuthContextType = {
  token: string | null;
  user: string | null;
  isAdmin: boolean;
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
    const loadAuthData = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        const savedUser = await AsyncStorage.getItem("user");

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(savedUser);
        }
      } catch (err) {
        console.error("Erro ao carregar autenticação:", err);
      } finally {
        setInitializing(false);
      }
    };
    loadAuthData();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.get("/motos", {
        auth: { username, password },
      });

      if (response.status === 200) {
        const basicToken = btoa(`${username}:${password}`);
        await AsyncStorage.setItem("token", basicToken);
        await AsyncStorage.setItem("user", username);

        setToken(basicToken);
        setUser(username);
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.multiRemove(["token", "user"]);
  };

  const isAdmin = user === "admin";

  return (
    <AuthContext.Provider
      value={{ token, user, isAdmin, initializing, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
