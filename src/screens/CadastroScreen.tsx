import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/colors';

type Moto = {
  modelo: string;
  cor: string;
  identificadorUWB: string;
  sensorId: string;
};

export default function CadastroScreen() {
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [identificadorUWB, setIdentificadorUWB] = useState('');
  const [sensorId, setSensorId] = useState('');
  const [motoSalva, setMotoSalva] = useState<Moto | null>(null);

  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const validarFormulario = () => {
    if (!modelo || !cor || !identificadorUWB || !sensorId) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return false;
    }
    if (isNaN(Number(sensorId))) {
      Alert.alert('Sensor ID inválido', 'Sensor ID deve ser um número.');
      return false;
    }
    return true;
  };

  const salvarDados = async () => {
    if (!validarFormulario()) return;
  
    const novaMoto: Moto = { modelo, cor, identificadorUWB, sensorId };
  
    try {
      const listaSalva = await AsyncStorage.getItem('motos');
      const lista: Moto[] = listaSalva ? JSON.parse(listaSalva) : [];

      const duplicada = lista.find(
        moto =>
          moto.identificadorUWB === identificadorUWB ||
          moto.sensorId === sensorId
      );
  
      if (duplicada) {
        Alert.alert('Erro', 'Já existe uma moto com esse identificador UWB ou Sensor ID.');
        return;
      }
  
      lista.push(novaMoto);
      await AsyncStorage.setItem('motos', JSON.stringify(lista));
  
      Alert.alert('Sucesso', 'Moto salva com sucesso!');
      handleLimpar();
      carregarDadosSalvos();
    } catch {
      Alert.alert('Erro', 'Erro ao salvar dados!');
    }
  };

  const carregarDadosSalvos = async () => {
    try {
      const dados = await AsyncStorage.getItem('motos');
      if (dados) {
        const lista: Moto[] = JSON.parse(dados);
        if (lista.length > 0) {
          const ultima = lista[lista.length - 1];
          setMotoSalva(ultima);
        } else {
          setMotoSalva(null);
        }
      } else {
        setMotoSalva(null);
      }
    } catch (error) {
      console.error('Erro ao carregar dados salvos', error);
      setMotoSalva(null);
    }
  };

  const handleLimpar = () => {
    setModelo('');
    setCor('');
    setIdentificadorUWB('');
    setSensorId('');
  };

  useEffect(() => {
    carregarDadosSalvos();
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>📝 Cadastro de Moto</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
        placeholder="Modelo"
        placeholderTextColor={colors.text}
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
        placeholder="Cor"
        placeholderTextColor={colors.text}
        value={cor}
        onChangeText={setCor}
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
        placeholder="Identificador UWB"
        placeholderTextColor={colors.text}
        keyboardType="numeric"
        value={identificadorUWB}
        onChangeText={setIdentificadorUWB}
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
        placeholder="Sensor ID"
        placeholderTextColor={colors.text}
        keyboardType="numeric"
        value={sensorId}
        onChangeText={setSensorId}
      />

      <View style={styles.button}>
        <Button title="Salvar Moto" onPress={salvarDados} color={colors.primary} />
      </View>

      <View style={styles.button}>
        <Button title="Limpar Campos" onPress={handleLimpar} color="#d9534f" />
      </View>

      <Button
        title="🧹 Limpar Todas as Motos (Teste)"
        onPress={async () => {
        await AsyncStorage.removeItem('motos');
        Alert.alert('Lista limpa!');
        setMotoSalva(null);
        }}
        color="#dc3545"
      />

      {motoSalva && (
        <View style={[styles.preview, { backgroundColor: colors.card }]}>
          <Text style={[styles.previewTitle, { color: colors.text }]}>📦 Última Moto Salva:</Text>
          <Text style={{ color: colors.text }}>Modelo: {motoSalva.modelo}</Text>
          <Text style={{ color: colors.text }}>Cor: {motoSalva.cor}</Text>
          <Text style={{ color: colors.text }}>Identificador UWB: {motoSalva.identificadorUWB}</Text>
          <Text style={{ color: colors.text }}>Sensor ID: {motoSalva.sensorId}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { padding: 12, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  button: { marginBottom: 15 },
  preview: { padding: 15, borderRadius: 8, marginTop: 20 },
  previewTitle: { fontWeight: 'bold', marginBottom: 10, fontSize: 16 },
});