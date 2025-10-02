# 🏍️ Mottu Tracker (Mobile)

Aplicativo mobile desenvolvido com **React Native** e **TypeScript**, integrado à **API REST** em **Java Spring Boot**, para cadastro, rastreamento e visualização de motos da empresa **Mottu**.

O app simula um sistema de pátio inteligente, onde cada moto possui um identificador UWB único e está vinculada a um sensor, permitindo gerenciar a frota de forma organizada, prática e responsiva.


---

## 📱 Funcionalidades implementadas

- ✅ Login com autenticação JWT (API Java Spring Boot)
- ✅ Navegação entre 5 telas: Home, Motos Localizadas, Cadastro, Preferências e Sobre
- ✅ Tema claro e escuro, com alternância dinâmica
- ✅ Formulário de cadastro validado (campos obrigatórios + validação de tipos)
- ✅ Armazenamento de token com AsyncStorage, garantindo persistência de login
- ✅ Listagem de motos com dados vindos da API (seed inicial + cadastros realizados no app)
- ✅ Verificação de duplicidade para Sensor ID e Identificador UWB
- ✅ Inclusão do campo “Status” da moto (Disponível 🟢, Em uso 🟡, Manutenção 🔧)
- ✅ Logout com limpeza de sessão
- ✅ Interface responsiva e pronta para expansão futura

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- [Axios](https://axios-http.com/)
- Back-end: [Java](https://www.java.com/) + [SpringBoot](https://spring.io/projects/spring-boot)  
- Banco de dados: [PostgreSQL](https://www.postgresql.org/)

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```

git clone https://github.com/murilors27/mottu-tracker.git
cd mottu-tracker

```

### 2. Instalar as dependências

```

npm install

```

### 3. Configurar a API

- Acesse o repositório da API Java correspondente
- Certifique-se de que o servidor está rodando em http://localhost:8080 (ou atualize a baseURL em src/services/api.ts)

### 4. Iniciar o App

```

npx expo start

```

---

## 📂 Estrutura de Pastas

```

mottu-tracker/
├── src/
│   ├── components/   # Componentes reutilizáveis (ex: botões customizados)
│   ├── context/      # Contextos globais de autenticação e tema
│   ├── screens/      # Telas principais do app (Login, Home, Cadastro, etc.)
│   ├── services/     # Serviços de integração com a API (ex: cadastro e listagem de motos)
│   ├── styles/       # Estilos globais e definição de temas (claro/escuro)
│   └── types.ts      # Tipos auxiliares do TypeScript
│
├── App.tsx           # Ponto de entrada do aplicativo
├── app.json          # Configuração do Expo
├── index.ts          # Arquivo inicial de execução
├── package.json      # Dependências e scripts do projeto
├── tsconfig.json     # Configuração do TypeScript
└── README.md         # Documentação do projeto

```

---

## 👥 Integrantes

| Nome                                | RM       | GitHub                                |
|-------------------------------------|----------|----------------------------------------|
| Murilo Ribeiro Santos               | RM555109 | [@murilors27](https://github.com/murilors27) |
| Thiago Garcia Tonato                | RM99404  | [@thiago-tonato](https://github.com/thiago-tonato) |
| Ian Madeira Gonçalves da Silva      | RM555502 | [@IanMadeira](https://github.com/IanMadeira) |

**Curso**: Análise e Desenvolvimento de Sistemas  
**Instituição**: FIAP – Faculdade de Informática e Administração Paulista
