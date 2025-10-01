import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../utils/firebaseErrors";
import AppButton from "../components/AppButton";
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/colors";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email || !password || !confirm) {
      return Alert.alert("Erro", "Preencha todos os campos!");
    }
    if (password !== confirm) {
      return Alert.alert("Erro", "As senhas não coincidem!");
    }
    try {
      setLoading(true);
      await register(email, password);
      Alert.alert("Sucesso", "Conta criada! Faça login.");
      navigation.navigate("Login");
    } catch (err: any) {
      const code = err.code || "auth/unknown";
      Alert.alert("Erro", getAuthErrorMessage(code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Criar Conta</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
        placeholder="Confirmar Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <AppButton title={loading ? "Criando..." : "Registrar"} onPress={handleRegister} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 8, marginBottom: 12, padding: 10, fontSize: 16 },
});
