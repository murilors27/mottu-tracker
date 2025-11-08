import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { ThemeProvider } from "./src/context/ThemeContext";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PreferenciasScreen from "./src/screens/PreferenciasScreen";
import SobreScreen from "./src/screens/SobreScreen";

import MotosScreen from "./src/screens/motos/MotosSCreen";
import CadastroMotoScreen from "./src/screens/motos/CadastroScreen";
import EditarMotoScreen from "./src/screens/motos/EditarMotoScreen";

import SensoresScreen from "./src/screens/sensores/SensoresScreen";
import CadastroSensorScreen from "./src/screens/sensores/CadastroSensorScreen";
import EditarSensorScreen from "./src/screens/sensores/EditarSensorScreen";

const Stack = createNativeStackNavigator();

function Routes() {
  const { token, initializing } = useAuth();
  if (initializing) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />

          {/* Motos */}
          <Stack.Screen name="Motos" component={MotosScreen} />
          <Stack.Screen name="CadastroMoto" component={CadastroMotoScreen} />
          <Stack.Screen name="EditarMoto" component={EditarMotoScreen} />

          {/* Sensores */}
          <Stack.Screen name="Sensores" component={SensoresScreen} />
          <Stack.Screen name="CadastroSensor" component={CadastroSensorScreen} />
          <Stack.Screen name="EditarSensor" component={EditarSensorScreen} />

          {/* Outras telas */}
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
