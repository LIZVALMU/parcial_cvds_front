import { AxiosInstance } from '../AxiosInstance';

export const EspecialidadService = {
  // Obtener todas las especialidades
  getAllEspecialidades: async () => {
    try {
      const response = await AxiosInstance.get('/api/especialidades/all');
      return response.data;
    } catch (error) {
      console.error('Error al obtener especialidades:', error);
      throw error;
    }
  },

  // Obtener especialidad por ID
  getEspecialidadById: async (id: string) => {
    try {
      const response = await AxiosInstance.get(`/api/especialidades/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener especialidad por ID:', error);
      throw error;
    }
  }
};
