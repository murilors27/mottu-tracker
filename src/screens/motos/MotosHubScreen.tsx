import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { strings } from "../../locales/strings";
import { lightTheme, darkTheme } from "../../styles/colors";
import { globalStyles } from "../../styles/globalStyles";
import AppButton from "../../components/AppButton";

export default function MotosHubScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { isAdmin } = useAuth();
  const { language } = useLanguage();
  const t = strings[language];
  const colors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View
      style={[
        globalStyles.centeredContainer,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[globalStyles.title, { color: colors.text }]}>
        {t.motos}
      </Text>
      <Text style={[globalStyles.subtitle, { color: colors.text }]}>
        {t.selectAction}
      </Text>

      <View style={{ width: "90%", marginTop: 20 }}>
        <AppButton
          title={t.viewMotos}
          onPress={() => navigation.navigate("Motos")}
        />
        {isAdmin && (
          <AppButton
            title={t.registerMoto}
            onPress={() => navigation.navigate("CadastroMoto")}
          />
        )}
        <AppButton
          title={t.back}
          onPress={() => navigation.goBack()}
          variant="secondary"
        />
      </View>
    </View>
  );
}
