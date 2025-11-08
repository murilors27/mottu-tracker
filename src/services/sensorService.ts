import api from "../services/api";

export interface Sensor {
  id?: number;
  localizacao: string;
}

function handleApiError(error: any, action: string): never {
  const status = error.response?.status;
  const raw = error.response?.data;
  let message = "Erro inesperado.";

  if (raw) {
    if (typeof raw === "object") {
      message = raw.message || raw.error || message;
    } else if (typeof raw === "string") {
      message = raw;
    }
  } else if (error.message) {
    message = error.message;
  }

  console.warn(`❌ Erro ao ${action}:`, message, "(Status:", status || "sem status", ")");
  throw error;
}

export async function getSensores(): Promise<Sensor[]> {
  try {
    const response = await api.get("/sensores");
    return response.data.content || response.data;
  } catch (error) {
    handleApiError(error, "listar sensores");
  }
}

export async function getSensorById(id: number): Promise<Sensor> {
  try {
    const response = await api.get(`/sensores/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "buscar sensor");
  }
}

export async function createSensor(sensor: Sensor): Promise<Sensor> {
  try {
    const response = await api.post("/sensores", sensor);
    return response.data;
  } catch (error) {
    handleApiError(error, "cadastrar sensor");
  }
}

export async function updateSensor(id: number, sensor: Sensor): Promise<Sensor> {
  try {
    const response = await api.put(`/sensores/${id}`, sensor);
    return response.data;
  } catch (error) {
    handleApiError(error, "atualizar sensor");
  }
}

export async function deleteSensor(id: number): Promise<void> {
  try {
    await api.delete(`/sensores/${id}`);
  } catch (error) {
    handleApiError(error, "excluir sensor");
  }
}
