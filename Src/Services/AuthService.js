import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceEventEmitter } from 'react-native';
import api from "./Conexion";

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        console.log("Respuesta del servidor", response.data);
        console.log("Keys in response.data:", Object.keys(response.data));
        const token = response.data.Token;

        console.log("Token recibido", token);

        if (token) {
            await AsyncStorage.setItem("userToken", token);
            DeviceEventEmitter.emit('tokenUpdated');
            return { success: true, token };
        }
        return { success: false, message: "Respuesta sin token" };

    } catch (e) {
        console.log(
            "Error al iniciar sesion",
            e.response ? e.response.data : e.message,
        );

        return {
            success: false,
            message: e.response ? e.response.data : "Error de conexion",
        };
    }
};
