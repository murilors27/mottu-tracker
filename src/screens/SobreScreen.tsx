import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/colors';

export default function SobreScreen() {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{'ℹ️ Sobre o App'}</Text>

      <Text style={[styles.paragraph, { color: colors.text }]}>
        {'O Mottu Tracker é um aplicativo mobile criado para facilitar a visualização e o cadastro de motos da empresa Mottu, utilizando sensores UWB para localização precisa mesmo em pátios com alta densidade.'}
      </Text>
      <Text style={[styles.paragraph, { color: colors.text }]}>
        {'O app conta com funcionalidades como cadastro de motos, visualização de motos localizadas, preferências do usuário e armazenamento local utilizando tecnologias como React Native, TypeScript, React Navigation e AsyncStorage.'}
      </Text>
      <Text style={[styles.paragraph, { color: colors.text }]}>
        {'O objetivo foi aplicar os conhecimentos adquiridos em aula no desenvolvimento de um app funcional, com navegação entre telas, formulário com manipulação de estado e dados persistentes.'}
      </Text>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>{'👥 Equipe Desenvolvedora'}</Text>

      <View style={styles.member}>
        <Image source={require('../../assets/murilo.jpg')} style={styles.avatar} />
        <Text style={[styles.name, { color: colors.text }]}>{'Murilo Ribeiro Santos'}</Text>
        <Text style={[styles.rm, { color: colors.text }]}>{'RM555109'}</Text>
        <Text style={[styles.link, { color: colors.primary }]} onPress={() => Linking.openURL('https://github.com/murilors27')}>
          {'github.com/murilors27'}
        </Text>
      </View>

      <View style={styles.member}>
        <Image source={require('../../assets/thiago.jpg')} style={styles.avatar} />
        <Text style={[styles.name, { color: colors.text }]}>{'Thiago Garcia Tonato'}</Text>
        <Text style={[styles.rm, { color: colors.text }]}>{'RM99404'}</Text>
        <Text style={[styles.link, { color: colors.primary }]} onPress={() => Linking.openURL('https://github.com/thiago-tonato')}>
          {'github.com/thiago-tonato'}
        </Text>
      </View>

      <View style={styles.member}>
        <Image source={require('../../assets/ian.png')} style={styles.avatar} />
        <Text style={[styles.name, { color: colors.text }]}>{'Ian Madeira Gonçalves da Silva'}</Text>
        <Text style={[styles.rm, { color: colors.text }]}>{'RM555502'}</Text>
        <Text style={[styles.link, { color: colors.primary }]} onPress={() => Linking.openURL('https://github.com/IanMadeira')}>
          {'github.com/IanMadeira'}
        </Text>
      </View>

      <Text style={[styles.footer, { color: colors.text }]}>{'FIAP | ADS | 2025'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  paragraph: { fontSize: 15, textAlign: 'justify', marginBottom: 12, lineHeight: 22 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 20 },
  member: { alignItems: 'center', marginBottom: 20 },
  name: { fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  rm: { fontSize: 14 },
  link: { textDecorationLine: 'underline', fontSize: 14 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  footer: { fontSize: 14, marginTop: 30 },
});
