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
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/colors";
import { Picker } from "@react-native-picker/picker";
import AppButton from "../components/AppButton";
import { createMoto, Moto } from "../services/motosService";

export default function CadastroScreen() {
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [identificadorUWB, setIdentificadorUWB] = useState("");
  const [sensorId, setSensorId] = useState("");
  const [status, setStatus] = useState("DISPONIVEL");
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const placeholderColor = "#888";

  const validarFormulario = () => {
    if (!modelo || !cor || !identificadorUWB || !sensorId) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha todos os campos."
      );
      return false;
    }
    if (isNaN(Number(sensorId))) {
      Alert.alert("Sensor ID inválido", "Sensor ID deve ser um número.");
      return false;
    }
    return true;
  };

  const salvarDados = async () => {
    if (!validarFormulario()) return;

    const novaMoto: Moto = { modelo, cor, identificadorUWB, sensorId, status };

    try {
      setLoading(true);
      await createMoto(novaMoto);
      Alert.alert("Sucesso", "Moto cadastrada com sucesso!");
      handleLimpar();
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Erro ao salvar moto na API.");
    } finally {
      setLoading(false);
    }
  };

  const handleLimpar = () => {
    setModelo("");
    setCor("");
    setIdentificadorUWB("");
    setSensorId("");
    setStatus("DISPONIVEL");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          📝 Cadastro de Moto
        </Text>

        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.text },
          ]}
          placeholder="Modelo"
          placeholderTextColor={placeholderColor}
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.text },
          ]}
          placeholder="Cor"
          placeholderTextColor={placeholderColor}
          value={cor}
          onChangeText={setCor}
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.text },
          ]}
          placeholder="Identificador UWB"
          placeholderTextColor={placeholderColor}
          value={identificadorUWB}
          onChangeText={setIdentificadorUWB}
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.text },
          ]}
          placeholder="Sensor ID"
          placeholderTextColor={placeholderColor}
          keyboardType="numeric"
          value={sensorId}
          onChangeText={setSensorId}
        />

        <Text style={{ color: colors.text, fontSize: 16, marginBottom: 8 }}>
          Status da Moto:
        </Text>
        <View
          style={[
            styles.pickerContainer,
            {
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.text,
            },
          ]}
        >
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            dropdownIconColor={colors.text}
            style={{
              color: colors.text,
              backgroundColor: colors.card,
            }}
            itemStyle={{
              color: colors.text,
            }}
          >
            <Picker.Item label="Disponível" value="DISPONIVEL" />
            <Picker.Item label="Em uso" value="EM_USO" />
            <Picker.Item label="Manutenção" value="MANUTENCAO" />
          </Picker>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginVertical: 20 }}
          />
        ) : (
          <>
            <AppButton title="Salvar Moto" onPress={salvarDados} />
            <AppButton
              title="Limpar Campos"
              onPress={handleLimpar}
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: { padding: 12, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  pickerContainer: { borderRadius: 8, marginBottom: 20 },
});
