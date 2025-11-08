import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/colors';

export default function PreferenciasScreen() {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Preferências</Text>

      <View style={styles.item}>
        <Text style={[styles.label, { color: colors.text }]}>Modo Escuro:</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          thumbColor={theme === 'dark' ? '#fff' : '#f4f3f4'}
          trackColor={{ true: colors.primary, false: '#ccc' }}
        />
      </View>

      <Text style={[styles.status, { color: colors.text }]}>
        {`Modo Escuro está ${theme === 'dark' ? 'Ativado' : 'Desativado'}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  label: { fontSize: 18 },
  status: { fontSize: 16, textAlign: 'center', marginTop: 20 },
});
