import React from "react";
import * as Notifications from "expo-notifications";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  Theme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { LanguageProvider } from "./src/context/LanguageContext";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SplashScreen from "./src/screens/SplashScreen";
import PreferenciasScreen from "./src/screens/PreferenciasScreen";
import SobreScreen from "./src/screens/SobreScreen";

import MotosHubScreen from "./src/screens/motos/MotosHubScreen";
import SensoresHubScreen from "./src/screens/sensores/SensoresHubScreen";

import MotosScreen from "./src/screens/motos/MotosSCreen";
import CadastroMotoScreen from "./src/screens/motos/CadastroScreen";
import EditarMotoScreen from "./src/screens/motos/EditarMotoScreen";

import SensoresScreen from "./src/screens/sensores/SensoresScreen";
import CadastroSensorScreen from "./src/screens/sensores/CadastroSensorScreen";
import EditarSensorScreen from "./src/screens/sensores/EditarSensorScreen";

Notifications.setNotificationHandler({
  handleNotification: async () =>
    ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    } as Notifications.NotificationBehavior),
});

const Stack = createNativeStackNavigator();

function Routes() {
  const { token, initializing } = useAuth();
  const { theme } = useTheme();

  const BaseTheme = theme === "dark" ? DarkTheme : DefaultTheme;

  const MyTheme: Theme = {
    ...BaseTheme,
    colors: {
      ...BaseTheme.colors,
      background: theme === "dark" ? "#000000" : "#ffffff",
      text: theme === "dark" ? "#ffffff" : "#000000",
      primary: theme === "dark" ? "#00ff88" : "#007f5f",
      card: theme === "dark" ? "#111111" : "#f5f5f5",
      border: "transparent",
    },
  };

  if (initializing) return <SplashScreen />;

  return (
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={MyTheme.colors.background as string}
      />

      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />

              <Stack.Screen name="MotosHub" component={MotosHubScreen} />
              <Stack.Screen name="SensoresHub" component={SensoresHubScreen} />

              <Stack.Screen name="Motos" component={MotosScreen} />
              <Stack.Screen
                name="CadastroMoto"
                component={CadastroMotoScreen}
              />
              <Stack.Screen name="EditarMoto" component={EditarMotoScreen} />

              <Stack.Screen name="Sensores" component={SensoresScreen} />
              <Stack.Screen
                name="CadastroSensor"
                component={CadastroSensorScreen}
              />
              <Stack.Screen
                name="EditarSensor"
                component={EditarSensorScreen}
              />

              <Stack.Screen
                name="Preferências"
                component={PreferenciasScreen}
              />
              <Stack.Screen name="Sobre" component={SobreScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Routes />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
