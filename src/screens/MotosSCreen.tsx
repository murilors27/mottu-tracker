import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/colors";
import { getMotos, deleteMoto, Moto } from "../services/motosService";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

export default function MotosScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { theme } = useTheme();
  const { user } = useAuth();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const isAdmin = user?.toLowerCase() === "admin";

  const carregarMotos = async () => {
    try {
      setLoading(true);
      const lista = await getMotos();
      setMotos(lista);
    } catch {
      setMotos([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarMotos();
    setRefreshing(false);
  };

  useEffect(() => {
    if (route.params?.motos) {
      setMotos(route.params.motos);
    } else {
      carregarMotos();
    }
  }, [route.params]);

  const interpretarErro = (err: any): string => {
    if (err.response) {
      const data = err.response.data;
      const msg =
        typeof data === "object"
          ? data.message || data.error
          : typeof data === "string"
          ? data
          : "";

      if (/aloca(c|ç)ao|loca(c|ç)ao/i.test(msg)) return msg;
      if (/uwb/i.test(msg))
        return "Já existe uma moto cadastrada com este Identificador UWB.";
      if (/sensor/i.test(msg))
        return "Sensor vinculado inválido. Verifique o ID informado.";
      if (/restricao|integridade/i.test(msg))
        return "Operação não permitida. Verifique vínculos e restrições.";

      return msg || "Ocorreu um erro inesperado.";
    }
    return "Erro ao conectar-se ao servidor.";
  };

  const confirmarExclusao = (moto: Moto) => {
    Alert.alert(
      "Confirmar exclusão",
      `Tem certeza que deseja excluir a moto "${moto.modelo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteMoto(moto.id!);
              Alert.alert("Sucesso", "Moto excluída com sucesso!");
              carregarMotos();
            } catch (err: any) {
              const mensagem = interpretarErro(err);
              Alert.alert("Erro", mensagem);
            }
          },
        },
      ]
    );
  };

  const getStatusIcon = (status: string): string => {
    switch (status) {
      case "DISPONIVEL":
        return "🟢";
      case "ALOCADA":
        return "🟡";
      case "MANUTENCAO":
        return "🔧";
      default:
        return "❓";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Motos Localizadas</Text>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.text, marginTop: 10 }}>Carregando motos...</Text>
        </View>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item, index) =>
            item.id ? String(item.id) : `${item.identificadorUWB}-${index}`
          }
          renderItem={({ item }) => {
            const status = item.status || "DISPONIVEL";

            return (
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.card,
                    shadowColor: "#00ff88",
                    shadowOpacity: theme === "dark" ? 0.5 : 0.25,
                    shadowRadius: 10,
                    elevation: 6,
                  },
                ]}
              >
                <Text style={[styles.model, { color: colors.text }]}>{item.modelo}</Text>
                <Text style={{ color: colors.text }}>Cor: {item.cor}</Text>
                <Text style={{ color: colors.text }}>
                  Identificador: {item.identificadorUWB}
                </Text>
                <Text style={{ color: colors.text }}>Sensor ID: {item.sensorId}</Text>
                <Text style={{ color: colors.text }}>
                  Status: {getStatusIcon(status)} {status}
                </Text>

                {isAdmin && (
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[styles.btn, { backgroundColor: colors.primary }]}
                      onPress={() => navigation.navigate("EditarMoto", { moto: item })}
                    >
                      <Text style={{ color: "#fff" }}>✏️</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.btn, { backgroundColor: "#d9534f" }]}
                      onPress={() => confirmarExclusao(item)}
                    >
                      <Text style={{ color: "#fff" }}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <Text style={{ color: colors.text, textAlign: "center", marginTop: 20 }}>
              Nenhuma moto cadastrada ainda 🚫
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#00ff8844",
  },
  model: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
});
