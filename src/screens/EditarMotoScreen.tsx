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
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/colors";
import { updateMoto, deleteMoto, Moto } from "../services/motosService";
import AppButton from "../components/AppButton";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function EditarMotoScreen() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const motoParam: Moto = route.params?.moto;

  const [moto, setMoto] = useState<Moto | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (motoParam) setMoto(motoParam);
  }, [motoParam]);

  const interpretarErro = (err: any): string => {
    if (err.response) {
      let msg = "";
      const data = err.response.data;

      try {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        msg =
          typeof parsed === "object"
            ? parsed.message || parsed.error || ""
            : typeof parsed === "string"
            ? parsed
            : "";
      } catch {
        msg = typeof data === "string" ? data : "";
      }

      if (/uwb/i.test(msg))
        return "Já existe uma moto cadastrada com este Identificador UWB.";
      if (/aloca(c|ç)ao|loca(c|ç)ao/i.test(msg))
        return "Não é possível excluir esta moto, pois ela está vinculada a uma alocação (histórico de uso).";
      if (/sensor/i.test(msg))
        return "Sensor vinculado inválido. Verifique o ID informado.";
      if (/restricao|integridade/i.test(msg))
        return "Operação não permitida. Verifique vínculos e restrições.";
      return msg || "Ocorreu um erro inesperado.";
    }
    return "Erro ao conectar-se ao servidor.";
  };

  const handleUpdate = async () => {
    if (!moto) return;
    if (!moto.modelo || !moto.cor || !moto.identificadorUWB || !moto.sensorId) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      setLoading(true);
      await updateMoto(moto.id!, moto);
      Alert.alert("Sucesso", "Moto atualizada com sucesso!");
      navigation.navigate("Motos", { refresh: true });
    } catch (err: any) {
      Alert.alert("Erro", interpretarErro(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!moto) return;

    Alert.alert(
      "Excluir Moto",
      `Tem certeza que deseja excluir a moto "${moto.modelo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await deleteMoto(moto.id!);
              Alert.alert("Sucesso", "Moto excluída com sucesso!");
              navigation.navigate("Motos", { refresh: true });
            } catch (err: any) {
              Alert.alert("Erro", interpretarErro(err));
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (!moto) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Nenhuma moto selecionada.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          Editar Moto
        </Text>

        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.text },
          ]}
          placeholder="Modelo"
          placeholderTextColor="#888"
          value={moto.modelo}
          onChangeText={(v) => setMoto({ ...moto, modelo: v })}
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.text },
          ]}
          placeholder="Cor"
          placeholderTextColor="#888"
          value={moto.cor}
          onChangeText={(v) => setMoto({ ...moto, cor: v })}
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.text },
          ]}
          placeholder="Identificador UWB"
          placeholderTextColor="#888"
          value={moto.identificadorUWB}
          onChangeText={(v) => setMoto({ ...moto, identificadorUWB: v })}
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.text },
          ]}
          placeholder="Sensor ID"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={String(moto.sensorId || "")}
          onChangeText={(v) => setMoto({ ...moto, sensorId: parseInt(v) || 0 })}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginVertical: 20 }}
          />
        ) : (
          <>
            <AppButton title="Salvar Alterações" onPress={handleUpdate} />
            <AppButton
              title="Excluir Moto"
              onPress={handleDelete}
              variant="danger"
            />
            <AppButton
              title="Voltar"
              onPress={() => navigation.goBack()}
              variant="secondary"
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

