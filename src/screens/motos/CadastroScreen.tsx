import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../styles/colors";
import AppButton from "../../components/AppButton";
import { createMoto, Moto } from "../../services/motosService";
import { getSensores, Sensor } from "../../services/sensorService";

export default function CadastroScreen() {
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [identificadorUWB, setIdentificadorUWB] = useState("");
  const [sensorId, setSensorId] = useState("");
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const placeholderColor = "#888";

  useEffect(() => {
    const fetchSensores = async () => {
      try {
        const data = await getSensores();
        setSensores(data);
      } catch (error) {
        console.warn("Erro ao buscar sensores:", error);
      }
    };
    fetchSensores();
  }, []);

  const validarFormulario = () => {
    if (!modelo || !cor || !identificadorUWB || !sensorId) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha todos os campos."
      );
      return false;
    }

    const regexUWB = /^UWB(?!000)\d{3}$/;
    if (!regexUWB.test(identificadorUWB.trim())) {
      Alert.alert("Formato inválido", "Use o formato UWB001 até UWB999.");
      return false;
    }

    const n = Number(sensorId);
    if (!Number.isInteger(n) || n <= 0) {
      Alert.alert("Sensor inválido", "Selecione um sensor válido da lista.");
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

      if (/duplicada|já existe/i.test(msg))
        return "Já existe uma moto cadastrada com este Identificador UWB.";
      if (/UWB/i.test(msg))
        return "Identificador UWB inválido. Use o formato UWB001 até UWB999.";
      if (/aloca(c|ç)ao|loca(c|ç)ao/i.test(msg))
        return "Não é possível excluir esta moto, pois está vinculada a uma alocação.";
      if (/sensor/i.test(msg))
        return "Sensor vinculado inválido. Verifique o sensor selecionado.";
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
      identificadorUWB: identificadorUWB.trim().toUpperCase(),
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
        <Text style={[styles.title, { color: colors.text }]}>
          Cadastro de Moto
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
          placeholder="Identificador UWB (ex: UWB001)"
          placeholderTextColor={placeholderColor}
          value={identificadorUWB}
          onChangeText={setIdentificadorUWB}
          autoCapitalize="characters"
        />

        <View
          style={[styles.pickerContainer, { backgroundColor: colors.input }]}
        >
          <Picker
            selectedValue={sensorId}
            onValueChange={(value) => setSensorId(value)}
            dropdownIconColor={colors.text}
            style={{
              color: colors.text,
              backgroundColor: colors.input,
            }}
            itemStyle={{
              color: colors.text,
            }}
            mode="dropdown"
          >
            <Picker.Item
              label="Selecione o Sensor"
              value=""
              color={colors.text}
            />
            {sensores.map((sensor) => (
              <Picker.Item
                key={sensor.id}
                label={sensor.localizacao}
                value={sensor.id?.toString()}
                color={colors.text}
              />
            ))}
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#00ff8844",
    borderRadius: 8,
    marginBottom: 20,
  },
});
