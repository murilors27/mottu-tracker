import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../styles/colors";
import AppButton from "../../components/AppButton";
import { createMoto, Moto } from "../../services/motosService";

export default function CadastroScreen() {
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [identificadorUWB, setIdentificadorUWB] = useState("");
  const [sensorId, setSensorId] = useState("");
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const placeholderColor = "#888";

  const validarFormulario = () => {
    if (!modelo || !cor || !identificadorUWB || !sensorId) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.");
      return false;
    }
    const n = Number(sensorId);
    if (!Number.isInteger(n) || n <= 0) {
      Alert.alert("Sensor ID inválido", "Sensor ID deve ser um número inteiro positivo.");
      return false;
    }
    return true;
  };

  const interpretarErro = (err: any): string => {
    if (err.response) {
      const data = err.response.data;
      const msg =
        typeof data === "object"
          ? data.message || JSON.stringify(data)
          : typeof data === "string"
          ? data
          : "";

      if (/uwb/i.test(msg))
        return "Já existe uma moto cadastrada com este Identificador UWB.";
      if (/aloca(c|ç)ao|loca(c|ç)ao/i.test(msg))
        return "Não é possível excluir esta moto, pois ela está vinculada a uma alocação (histórico de uso).";
      if (/sensor/i.test(msg))
        return "Sensor vinculado inválido. Verifique o ID informado.";
      if (/restricao|integridade/i.test(msg))
        return "Operação não permitida. Verifique vínculos e restrições.";
      if (/not found|não encontrada/i.test(msg))
        return "Recurso não encontrado.";
      return msg || "Ocorreu um erro inesperado.";
    }
    return "Erro ao conectar-se ao servidor.";
  };

  const salvarDados = async () => {
    if (!validarFormulario()) return;

    const novaMoto: Moto = {
      modelo,
      cor,
      identificadorUWB,
      sensorId: Number(sensorId),
    };

    try {
      setLoading(true);
      await createMoto(novaMoto);
      Alert.alert("Sucesso", "Moto cadastrada com sucesso!");
      handleLimpar();
    } catch (err: any) {
      Alert.alert("Erro", interpretarErro(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLimpar = () => {
    setModelo("");
    setCor("");
    setIdentificadorUWB("");
    setSensorId("");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Cadastro de Moto</Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          placeholder="Modelo"
          placeholderTextColor={placeholderColor}
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          placeholder="Cor"
          placeholderTextColor={placeholderColor}
          value={cor}
          onChangeText={setCor}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          placeholder="Identificador UWB"
          placeholderTextColor={placeholderColor}
          value={identificadorUWB}
          onChangeText={setIdentificadorUWB}
          autoCapitalize="characters"
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          placeholder="Sensor ID"
          placeholderTextColor={placeholderColor}
          keyboardType="number-pad"
          value={sensorId}
          onChangeText={setSensorId}
        />

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
        ) : (
          <>
            <AppButton title="Salvar Moto" onPress={salvarDados} />
            <AppButton title="Limpar Campos" onPress={handleLimpar} variant="danger" />
          </>
        )}
      </View>
    </ScrollView>
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
