import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { strings } from "../locales/strings";
import { lightTheme, darkTheme } from "../styles/colors";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const { login } = useAuth();
  const { language } = useLanguage();
  const t = strings[language];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      return Alert.alert(t.error, t.fillAllFields);
    }

    try {
      setLoading(true);
      await login(username, password);
      Alert.alert(t.success, t.loginSuccess);
    } catch {
      Alert.alert(t.error, t.invalidCredentials);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t.login}</Text>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.input, color: colors.text },
        ]}
        placeholder={t.usernamePlaceholder}
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.input, color: colors.text },
        ]}
        placeholder={t.passwordPlaceholder}
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <AppButton
        title={loading ? t.loggingIn : t.login}
        onPress={handleLogin}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#00ff88",
  },
  input: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#00ff8844",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
});
