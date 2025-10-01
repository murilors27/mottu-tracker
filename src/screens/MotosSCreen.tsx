import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/colors';

type Moto = {
  modelo: string;
  cor: string;
  identificadorUWB: string;
  sensorId: number | string;
  status: string;
};

export default function MotosScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const carregarMotos = async () => {
    try {
      const dados = await AsyncStorage.getItem('motos');
      if (dados) {
        setMotos(JSON.parse(dados));
      } else {
        setMotos([]);
      }
    } catch (error) {
      console.error('Erro ao carregar motos', error);
      setMotos([]);
    }
  };

  useEffect(() => {
    carregarMotos();
  }, []);

  const getStatusIcon = (status: string): string => {
    switch (status) {
      case 'Disponível':
        return '🟢';
      case 'Em uso':
        return '🟡';
      case 'Manutenção':
        return '🔧';
      default:
        return '❓';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>📍 Motos Localizadas</Text>
      <FlatList
        data={motos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.model, { color: colors.text }]}>{item.modelo}</Text>
            <Text style={{ color: colors.text }}>Cor: {item.cor}</Text>
            <Text style={{ color: colors.text }}>Sensor ID: {item.sensorId}</Text>
            <Text style={{ color: colors.text }}>Identificador UWB: {item.identificadorUWB}</Text>
            <Text style={{ color: colors.text }}>
              Status: {getStatusIcon(item.status)} {item.status}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>
            Nenhuma moto cadastrada ainda 🚫
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' },
  card: { padding: 15, borderRadius: 10, marginBottom: 12 },
  model: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
});
