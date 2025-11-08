import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../styles/colors";
import AppButton from "../../components/AppButton";
import { updateSensor, Sensor } from "../../services/sensorService";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function EditarSensorScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const sensor: Sensor = route.params?.sensor;

  const [localizacao, setLocalizacao] = useState(sensor?.localizacao || "");
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const placeholderColor = "#888";

  const validarFormulario = () => {
    if (!localizacao.trim()) {
      Alert.alert("Campo obrigatório", "Informe a localização do sensor.");
      return false;
    }
    return true;
  };

  const salvarAlteracoes = async () => {
    if (!validarFormulario()) return;

    const sensorAtualizado: Sensor = { id: sensor.id, localizacao };

    try {
      setLoading(true);
      await updateSensor(sensor.id!, sensorAtualizado);
      Alert.alert("Sucesso", "Sensor atualizado com sucesso!");
      navigation.goBack();
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o sensor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          Editar Sensor
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          placeholder="Localização"
          placeholderTextColor={placeholderColor}
          value={localizacao}
          onChangeText={setLocalizacao}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginVertical: 20 }}
          />
        ) : (
          <>
            <AppButton title="Salvar Alterações" onPress={salvarAlteracoes} />
            <AppButton title="Cancelar" variant="danger" onPress={() => navigation.goBack()} />
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#00ff8844",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
});
