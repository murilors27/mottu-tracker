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
import { createSensor, Sensor } from "../../services/sensorService";

export default function CadastroSensorScreen() {
  const [localizacao, setLocalizacao] = useState("");
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const placeholderColor = "#888";

  const validarFormulario = (): boolean => {
    if (!localizacao.trim()) {
      Alert.alert("Campo obrigatório", "Informe a localização do sensor.");
      return false;
    }

    const regex = /^Setor [A-Z] - Coluna [1-9][0-9]*$/;
    if (!regex.test(localizacao.trim())) {
      Alert.alert(
        "Formato inválido",
        "A localização deve seguir o formato: Setor X - Coluna Y (ex: Setor A - Coluna 1)."
      );
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

      if (/localiza(c|ç)ao/i.test(msg))
        return "Já existe um sensor cadastrado nessa localização.";
      if (/formato/i.test(msg))
        return "Formato inválido. Use o padrão 'Setor X - Coluna Y'.";
      if (/not found|não encontrado/i.test(msg))
        return "Recurso não encontrado.";
      return msg || "Ocorreu um erro inesperado.";
    }
    return "Erro ao conectar-se ao servidor.";
  };

  const salvarSensor = async () => {
    if (!validarFormulario()) return;

    const novoSensor: Sensor = { localizacao };

    try {
      setLoading(true);
      await createSensor(novoSensor);
      Alert.alert("Sucesso", "Sensor cadastrado com sucesso!");
      setLocalizacao("");
    } catch (err: any) {
      Alert.alert("Erro", interpretarErro(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          Cadastro de Sensor
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.input,
              color: colors.text,
              borderColor: colors.primary,
            },
          ]}
          placeholder="Ex: Setor A - Coluna 1"
          placeholderTextColor={placeholderColor}
          value={localizacao}
          onChangeText={setLocalizacao}
          autoCapitalize="characters"
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginVertical: 20 }}
          />
        ) : (
          <>
            <AppButton title="Salvar Sensor" onPress={salvarSensor} />
            <AppButton
              title="Limpar Campo"
              onPress={() => setLocalizacao("")}
              variant="danger"
            />
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
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
});