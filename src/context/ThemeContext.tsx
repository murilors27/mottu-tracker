import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const carregarTema = async () => {
      const temaSalvo = await AsyncStorage.getItem('preferenciaModoEscuro');
      if (temaSalvo !== null) {
        setTheme(JSON.parse(temaSalvo) ? 'dark' : 'light');
      }
    };
    carregarTema();
  }, []);

  const toggleTheme = async () => {
    const novoTema = theme === 'light' ? 'dark' : 'light';
    setTheme(novoTema);
    await AsyncStorage.setItem('preferenciaModoEscuro', JSON.stringify(novoTema === 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
