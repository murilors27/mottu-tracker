import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import MotosScreen from './src/screens/MotosSCreen';
import CadastroScreen from './src/screens/CadastroScreen';
import PreferenciasScreen from './src/screens/PreferenciasScreen';
import SobreScreen from './src/screens/SobreScreen';


import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme === 'dark' ? '#1E1E1E' : '#005eff',
          },
          headerTintColor: theme === 'dark' ? '#FFF' : '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Motos" component={MotosScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Preferências" component={PreferenciasScreen} />
        <Stack.Screen name="Sobre" component={SobreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
