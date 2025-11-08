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
  card: {
    backgroundColor: "#1c1c1c",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00ff8844",
    marginBottom: 12,
  },
  text: { color: "#e0e0e0" },
});

