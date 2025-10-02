import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/colors";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      return Alert.alert("Erro", "Preencha todos os campos!");
    }

    try {
      setLoading(true);
      await login(username, password);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    } catch {
      Alert.alert("Erro", "Credenciais inválidas!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Login</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
        placeholder="Usuário (ex: admin)"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <AppButton
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleLogin}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    fontSize: 16,
  },
});
