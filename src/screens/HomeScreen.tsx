import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>🏍️ Mottu Tracker</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>Bem-vindo! Escolha uma opção abaixo:</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Motos')}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>📍 Ver Motos Localizadas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>📝 Cadastrar Nova Moto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Preferências')}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>⚙️ Preferências</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Sobre')}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>ℹ️ Sobre o App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30 },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});