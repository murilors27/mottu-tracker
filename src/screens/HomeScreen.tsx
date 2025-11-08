import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { lightTheme, darkTheme } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";
import AppButton from "../components/AppButton";

export default function HomeScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { logout, isAdmin, user } = useAuth();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const handleLogout = async () => await logout();

  return (
    <View
      style={[
        globalStyles.centeredContainer,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[globalStyles.title, { color: colors.text }]}>
        🏍️ Mottu Tracker
      </Text>
      <Text style={[globalStyles.subtitle, { color: colors.text }]}>
        Bem-vindo, {user}! Escolha uma opção abaixo:
      </Text>

      <View style={{ width: "90%" }}>
        <AppButton
          title="Ver Motos Localizadas"
          onPress={() => navigation.navigate("Motos")}
        />
        {isAdmin && (
          <>
            <AppButton
              title="Cadastrar Nova Moto"
              onPress={() => navigation.navigate("CadastroMoto")}
            />
            <AppButton
              title="Ver Sensores"
              onPress={() => navigation.navigate("Sensores")}
            />
            <AppButton
              title="Cadastrar Sensor"
              onPress={() => navigation.navigate("CadastroSensor")}
            />
          </>
        )}
        <AppButton
          title="Preferências"
          onPress={() => navigation.navigate("Preferências")}
        />
        <AppButton
          title="Sobre o App"
          onPress={() => navigation.navigate("Sobre")}
        />
        <AppButton title="Sair" onPress={handleLogout} variant="danger" />
      </View>
    </View>
  );
}
