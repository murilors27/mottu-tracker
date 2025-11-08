import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { lightTheme, darkTheme } from "../../styles/colors";
import { globalStyles } from "../../styles/globalStyles";
import AppButton from "../../components/AppButton";

export default function SensoresHubScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { isAdmin } = useAuth();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View
      style={[
        globalStyles.centeredContainer,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[globalStyles.title, { color: colors.text }]}>Sensores</Text>
      <Text style={[globalStyles.subtitle, { color: colors.text }]}>
        Selecione uma ação:
      </Text>

      <View style={{ width: "90%", marginTop: 20 }}>
        <AppButton title="Ver Sensores" onPress={() => navigation.navigate("Sensores")} />
        {isAdmin && (
          <AppButton title="Cadastrar Sensor" onPress={() => navigation.navigate("CadastroSensor")} />
        )}
        <AppButton title="Voltar" onPress={() => navigation.goBack()} variant="secondary" />
      </View>
    </View>
  );
}
