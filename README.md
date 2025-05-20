# 🏍️ Mottu Tracker (Mobile)

Aplicativo mobile desenvolvido com **React Native** e **TypeScript** para facilitar o rastreamento, cadastro e visualização de motos da empresa **Mottu**, utilizando como base conceitual a tecnologia de localização **UWB (Ultra Wideband)**. 

O app simula o funcionamento de um sistema de pátio inteligente, onde cada moto possui um identificador UWB único e está vinculada a um sensor. Ele complementa a proposta geral do projeto, oferecendo uma interface funcional, intuitiva e com persistência de dados.

---

## 👥 Integrantes

| Nome                                | RM       | GitHub                                |
|-------------------------------------|----------|----------------------------------------|
| Murilo Ribeiro Santos               | RM555109 | [@murilors27](https://github.com/murilors27) |
| Thiago Garcia Tonato                | RM99404  | [@thiago-tonato](https://github.com/thiago-tonato) |
| Ian Madeira Gonçalves da Silva      | RM555502 | [@IanMadeira](https://github.com/IanMadeira) |

**Curso**: Análise e Desenvolvimento de Sistemas  
**Instituição**: FIAP – Faculdade de Informática e Administração Paulista

---

## 📱 Funcionalidades implementadas

- ✅ Navegação entre 5 telas: Home, Motos Localizadas, Cadastro, Preferências e Sobre
- ✅ Protótipo funcional com tema claro e escuro
- ✅ Formulário controlado por estado (`useState`)
- ✅ Armazenamento local com `AsyncStorage`
- ✅ Validação de campos obrigatórios
- ✅ Verificação de duplicidade (Sensor ID e UWB)
- ✅ Exibição da última moto cadastrada
- ✅ Inclusão do campo “Status” com ícones (Disponível, Em uso, Manutenção)
- ✅ Estilização global baseada em tema
- ✅ Estrutura pronta para expansão (ex: integração com back-end Java)

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage)

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

git clone https://github.com/murilors27/mottu-tracker.git
cd mottu-tracker

### 2. Instalar as dependências

npm install

### 3. Iniciar o projeto

npx expo start