import { AxiosInstance } from '../AxiosInstance';
import type { Cita } from '../types/Cita';

export const CitaService = {
  getAllCitas: async () => {
    try {
      const response = await AxiosInstance.get('/api/citas/all');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las citas:', error);
      throw error;
    }
  },

  getCitasByCorreo: async (correo: string) => {
    try {
      const response = await AxiosInstance.get(`/api/citas/${correo}/correo`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener citas por correo:', error);
      throw error;
    }
  },

  filtrarCitasPorEstado: async (correo: string, estado: string) => {
    try {
      const response = await AxiosInstance.get(`/api/citas/${correo}/${estado}/filtrar`);
      return response.data;
    } catch (error) {
      console.error('Error al filtrar citas por estado:', error);
      throw error;
    }
  },

  crearCita: async (cita: Cita) => {
    try {
      const response = await AxiosInstance.post('/api/citas/crear', cita);
      return response.data;
    } catch (error) {
      console.error('Error al crear la cita:', error);
      throw error;
    }
  },

  cancelarCita: async (id: string) => {
    try {
      const response = await AxiosInstance.post(`/api/citas/${id}/cancelar`);
      return response.data;
    } catch (error) {
      console.error('Error al cancelar la cita:', error);
      throw error;
    }
  },
};
