import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Moto {
  id?: number;
  modelo: string;
  cor: string;
  identificadorUWB: string;
  sensorId: string;
  status: string;
}

const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado. Faça login novamente.");
  return { Authorization: `Bearer ${token}` };
};

export const getMotos = async () => {
  const headers = await getAuthHeader();
  const response = await api.get("/api/motos", { headers });

  if (Array.isArray(response.data.content)) {
    return response.data.content;
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return [];
};

export const createMoto = async (moto: Moto) => {
  const headers = await getAuthHeader();
  const response = await api.post("/api/motos", moto, { headers });
  return response.data;
};
