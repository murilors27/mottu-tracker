import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  // containers
  container: {
    flex: 1,
    padding: 20,
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  // textos e títulos
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00cc6a",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 25,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 15,
    textAlign: "justify",
    color: "#e0e0e0",
    marginBottom: 12,
    lineHeight: 22,
  },

  // inputs
  input: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#00ff8844",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  // cards
  card: {
    backgroundColor: "#1c1c1c",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00ff8844",
    shadowColor: "#00cc6a",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 12,
  },

  // equipe
  memberCard: {
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#00ff8844",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    backgroundColor: "#1c1c1c",
    shadowColor: "#00cc6a",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#00cc6a",
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#e0e0e0",
  },
  rm: {
    fontSize: 14,
    color: "#bbb",
    marginBottom: 4,
  },
  link: {
    fontSize: 14,
    color: "#00cc6a",
    textDecorationLine: "underline",
  },
  footer: {
    fontSize: 14,
    color: "#777",
    marginTop: 30,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#00ff8844",
    paddingTop: 10,
  },
});
