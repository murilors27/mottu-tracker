import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/colors';
import { useAuth } from '../context/AuthContext';
import AppButton from '../components/AppButton';

export default function HomeScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{'🏍️ Mottu Tracker'}</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        {'Bem-vindo! Escolha uma opção abaixo:'}
      </Text>

      <AppButton title="📍 Ver Motos Localizadas" onPress={() => navigation.navigate('Motos')} />
      <AppButton title="📝 Cadastrar Nova Moto" onPress={() => navigation.navigate('Cadastro')} />
      <AppButton title="⚙️ Preferências" onPress={() => navigation.navigate('Preferências')} />
      <AppButton title="ℹ️ Sobre o App" onPress={() => navigation.navigate('Sobre')} />
      <AppButton title="🚪 Sair" onPress={handleLogout} variant="danger" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30 },
});
