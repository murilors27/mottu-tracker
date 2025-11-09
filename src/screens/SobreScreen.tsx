import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  StyleSheet,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { strings } from "../locales/strings";
import { lightTheme, darkTheme } from "../styles/colors";

export default function SobreScreen() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = strings[language];
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const isDark = theme === "dark";

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>{t.about}</Text>

      <Text style={[styles.paragraph, { color: colors.text }]}>{t.about1}</Text>
      <Text style={[styles.paragraph, { color: colors.text }]}>{t.about2}</Text>
      <Text style={[styles.paragraph, { color: colors.text }]}>{t.about3}</Text>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t.team}
      </Text>

      {t.members.map((membro, i) => (
        <View
          key={i}
          style={[
            styles.member,
            {
              backgroundColor: isDark ? "#1c1c1c" : "#f0f0f0",
              shadowColor: "#00ff88",
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 4,
            },
          ]}
        >
          <Image source={membro.img} style={styles.avatar} />
          <Text style={[styles.name, { color: colors.text }]}>
            {membro.nome}
          </Text>
          <Text style={[styles.rm, { color: colors.text }]}>{membro.rm}</Text>
          <Text
            style={[styles.link, { color: colors.primary }]}
            onPress={() => Linking.openURL(membro.github)}
          >
            {membro.github.replace("https://", "")}
          </Text>
        </View>
      ))}

      <Text style={[styles.footer, { color: colors.text }]}>{t.footer}</Text>
      <Text style={{ color: colors.text, marginTop: 10, fontSize: 14 }}>
        Versão: 1.0.0 | Commit: de278e1
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00ff88",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 15,
    textAlign: "justify",
    marginBottom: 12,
    color: "#e0e0e0",
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00ff88",
    marginVertical: 20,
    textAlign: "center",
  },
  member: {
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#00ff8844",
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#00ff88",
    marginBottom: 10,
  },
  name: { fontWeight: "bold", fontSize: 16 },
  rm: { fontSize: 14, color: "#bbb", marginBottom: 4 },
  link: { fontSize: 14, textDecorationLine: "underline" },
  footer: {
    fontSize: 14,
    color: "#777",
    marginTop: 30,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#00ff8844",
    paddingTop: 10,
  },
});
