import api from "../services/api";

export interface Moto {
  id?: number;
  modelo: string;
  cor: string;
  identificadorUWB: string;
  sensorId: number;
  status?: string;
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

export async function createMoto(moto: Moto): Promise<Moto> {
  try {
    const response = await api.post("/motos", moto);
    return response.data;
  } catch (error) {
    handleApiError(error, "cadastrar moto");
  }
}

export async function getMotos(): Promise<Moto[]> {
  try {
    const response = await api.get("/motos");
    return response.data.content || response.data;
  } catch (error) {
    handleApiError(error, "listar motos");
  }
}

export async function getMotoById(id: number): Promise<Moto> {
  try {
    const response = await api.get(`/motos/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "buscar moto");
  }
}

export async function updateMoto(id: number, moto: Moto): Promise<Moto> {
  try {
    const response = await api.put(`/motos/${id}`, moto);
    return response.data;
  } catch (error) {
    handleApiError(error, "atualizar moto");
  }
}

export async function deleteMoto(id: number): Promise<void> {
  try {
    await api.delete(`/motos/${id}`);
  } catch (error) {
    handleApiError(error, "excluir moto");
  }
}
