import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { strings } from "../locales/strings";
import { lightTheme, darkTheme } from "../styles/colors";
import AppButton from "../components/AppButton";

export default function PreferenciasScreen() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const t = strings[language];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{t.preferences}</Text>

        <View style={styles.item}>
          <Text style={[styles.label, { color: colors.text }]}>
            {language === "pt" ? "Modo Escuro:" : "Modo Oscuro:"}
          </Text>
          <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
            thumbColor={theme === "dark" ? "#fff" : "#f4f3f4"}
            trackColor={{ true: colors.primary, false: "#ccc" }}
          />
        </View>

        <Text style={[styles.status, { color: colors.text }]}>
          {language === "pt"
            ? `Modo Escuro está ${theme === "dark" ? "Ativado" : "Desativado"}`
            : `El Modo Oscuro está ${
                theme === "dark" ? "Activado" : "Desactivado"
              }`}
        </Text>

        <View style={{ marginTop: 40 }}>
          <Text
            style={[
              styles.label,
              { color: colors.text, textAlign: "center", marginBottom: 10 },
            ]}
          >
            {t.language}
          </Text>

          <AppButton
            title={t.portuguese}
            onPress={() => setLanguage("pt")}
            variant={language === "pt" ? "primary" : "secondary"}
          />
          <AppButton
            title={t.spanish}
            onPress={() => setLanguage("es")}
            variant={language === "es" ? "primary" : "secondary"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 350,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
  },
  status: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
