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
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { lightTheme, darkTheme } from "../../styles/colors";
import { getSensores, deleteSensor, Sensor } from "../../services/sensorService";
import { useNavigation } from "@react-navigation/native";

export default function SensoresScreen() {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { theme } = useTheme();
  const { isAdmin } = useAuth();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const navigation = useNavigation<any>();

  const carregarSensores = async () => {
    try {
      setLoading(true);
      const lista = await getSensores();
      setSensores(lista);
    } catch {
      setSensores([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarSensores();
    setRefreshing(false);
  };

  useEffect(() => {
    carregarSensores();
  }, []);

  const confirmarExclusao = (sensor: Sensor) => {
    Alert.alert(
      "Confirmar exclusão",
      `Deseja realmente excluir o sensor localizado em "${sensor.localizacao}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSensor(sensor.id!);
              Alert.alert("Sucesso", "Sensor excluído com sucesso!");
              carregarSensores();
            } catch {
              Alert.alert("Erro", "Não foi possível excluir o sensor.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Sensores Cadastrados</Text>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.text, marginTop: 10 }}>Carregando sensores...</Text>
        </View>
      ) : (
        <FlatList
          data={sensores}
          keyExtractor={(item, index) =>
            item.id ? String(item.id) : `${item.localizacao}-${index}`
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: colors.card,
                  shadowColor: colors.primary,
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 5,
                },
              ]}
            >
              <Text style={[styles.text, { color: colors.text }]}>
                📍 Localização: {item.localizacao}
              </Text>

              {isAdmin && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: colors.primary }]}
                    onPress={() => navigation.navigate("EditarSensor", { sensor: item })}
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
          )}
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
              Nenhum sensor cadastrado ainda ⚙️
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
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 16 },
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
