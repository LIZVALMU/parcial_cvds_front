export interface Cita {
  id?: string;
  nombreCompleto: string;
  cedula: string;
  correo: string;
  fechaCita: string | null;
  especialidad: string;
  doctor: string;
  ubicacion: string;
  estado: string;
}
