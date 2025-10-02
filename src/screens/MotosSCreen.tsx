import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/colors";
import { getMotos, Moto } from "../services/motosService";
import { useRoute } from "@react-navigation/native";

export default function MotosScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const route = useRoute<any>();

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

  const getStatusIcon = (status: string): string => {
    switch (status) {
      case "DISPONIVEL":
        return "🟢";
      case "EM_USO":
        return "🟡";
      case "MANUTENCAO":
        return "🔧";
      default:
        return "❓";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>📍 Motos Localizadas</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item, index) =>
            item.id ? String(item.id) : `${item.identificadorUWB}-${index}`
          }
          renderItem={({ item }) => {
            const status = item.status || "DISPONIVEL"; // 🔑 fallback
            return (
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={[styles.model, { color: colors.text }]}>
                  {item.modelo || "Modelo não informado"}
                </Text>
                <Text style={{ color: colors.text }}>Cor: {item.cor || "—"}</Text>
                <Text style={{ color: colors.text }}>Sensor ID: {item.sensorId || "—"}</Text>
                <Text style={{ color: colors.text }}>
                  Identificador UWB: {item.identificadorUWB || "—"}
                </Text>
                <Text style={{ color: colors.text }}>
                  Status: {getStatusIcon(status)} {status}
                </Text>
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
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, alignSelf: "center" },
  card: { padding: 15, borderRadius: 10, marginBottom: 12 },
  model: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
});
