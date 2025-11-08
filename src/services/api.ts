import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.0.104:8080/api",
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  async (config) => {
    const basicToken = await AsyncStorage.getItem("token");

    if (basicToken) {
      if (!config.headers) config.headers = {} as any;
      (config.headers as any)["Authorization"] = `Basic ${basicToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
