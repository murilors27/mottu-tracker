import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { ThemeProvider } from "./src/context/ThemeContext";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MotosScreen from "./src/screens/MotosSCreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import PreferenciasScreen from "./src/screens/PreferenciasScreen";
import SobreScreen from "./src/screens/SobreScreen";
import EditarMotoScreen from "./src/screens/EditarMotoScreen";

const Stack = createNativeStackNavigator();

function Routes() {
  const { token, initializing } = useAuth();

  if (initializing) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Motos" component={MotosScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="EditarMoto" component={EditarMotoScreen} />
          <Stack.Screen name="Preferências" component={PreferenciasScreen} />
          <Stack.Screen name="Sobre" component={SobreScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
