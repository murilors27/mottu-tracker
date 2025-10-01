import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/colors';
import { Picker } from '@react-native-picker/picker';
import AppButton from '../components/AppButton';

type Moto = {
  modelo: string;
  cor: string;
  identificadorUWB: string;
  sensorId: string;
  status: string;
};

export default function CadastroScreen() {
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [identificadorUWB, setIdentificadorUWB] = useState('');
  const [sensorId, setSensorId] = useState('');
  const [motoSalva, setMotoSalva] = useState<Moto | null>(null);
  const [status, setStatus] = useState('Disponível');

  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const placeholderColor = '#888';

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

    const novaMoto: Moto = { modelo, cor, identificadorUWB, sensorId, status };

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
    } catch {
      setMotoSalva(null);
    }
  };

  const handleLimpar = () => {
    setModelo('');
    setCor('');
    setIdentificadorUWB('');
    setSensorId('');
    setStatus('Disponível');
  };

  useEffect(() => {
    carregarDadosSalvos();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>📝 Cadastro de Moto</Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          placeholder="Modelo"
          placeholderTextColor={placeholderColor}
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          placeholder="Cor"
          placeholderTextColor={placeholderColor}
          value={cor}
          onChangeText={setCor}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          placeholder="Identificador UWB"
          placeholderTextColor={placeholderColor}
          value={identificadorUWB}
          onChangeText={setIdentificadorUWB}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          placeholder="Sensor ID"
          placeholderTextColor={placeholderColor}
          keyboardType="numeric"
          value={sensorId}
          onChangeText={setSensorId}
        />

        <Text style={{ color: colors.text, fontSize: 16, marginBottom: 8 }}>Status da Moto:</Text>
        <View style={[styles.pickerContainer, { backgroundColor: colors.input }]}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            dropdownIconColor={colors.text}
            style={{ color: colors.text }}
          >
            <Picker.Item label="Disponível" value="Disponível" />
            <Picker.Item label="Em uso" value="Em uso" />
            <Picker.Item label="Manutenção" value="Manutenção" />
          </Picker>
        </View>

        <AppButton title="Salvar Moto" onPress={salvarDados} />
        <AppButton title="Limpar Campos" onPress={handleLimpar} variant="danger" />

        {motoSalva && (
          <View style={[styles.preview, { backgroundColor: colors.card }]}>
            <Text style={[styles.previewTitle, { color: colors.text }]}>📦 Última Moto Salva:</Text>
            <Text style={{ color: colors.text }}>Modelo: {motoSalva.modelo}</Text>
            <Text style={{ color: colors.text }}>Cor: {motoSalva.cor}</Text>
            <Text style={{ color: colors.text }}>Identificador UWB: {motoSalva.identificadorUWB}</Text>
            <Text style={{ color: colors.text }}>Sensor ID: {motoSalva.sensorId}</Text>
            <Text style={{ color: colors.text }}>Status: {motoSalva.status}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { padding: 12, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  preview: { padding: 15, borderRadius: 8, marginTop: 20 },
  previewTitle: { fontWeight: 'bold', marginBottom: 10, fontSize: 16 },
  pickerContainer: { borderRadius: 8, marginBottom: 20 },
});
