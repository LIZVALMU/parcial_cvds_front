import React from 'react';
import { CitaService } from '../services/CitaService';
import type { Cita } from '../types/Cita';

interface CitaCardProps {
  cita: Cita;
  onCitaCancelada: () => void;
}

const CitaCard: React.FC<CitaCardProps> = ({ cita, onCitaCancelada }) => {
  const handleCancelar = async () => {
    try {
      if (cita.id) {
        await CitaService.cancelarCita(cita.id);
        onCitaCancelada();
      }
    } catch (error) {
      console.error('Error al cancelar cita:', error);
    }
  };

  return (
    <div className="cita-card">
      <h3>Cita: {cita.id}</h3>
      <p><strong>Paciente:</strong> {cita.nombreCompleto}</p>
      <p><strong>Cédula:</strong> {cita.cedula}</p>
      <p><strong>Correo:</strong> {cita.correo}</p>
      <p><strong>Fecha:</strong> {cita.fechaCita || 'No programada'}</p>
      <p><strong>Especialidad:</strong> {cita.especialidad}</p>
      <p><strong>Doctor:</strong> {cita.doctor}</p>
      <p><strong>Ubicación:</strong> {cita.ubicacion}</p>
      <p><strong>Estado:</strong> <span className={`estado-${cita.estado.toLowerCase()}`}>{cita.estado}</span></p>
      
      {cita.estado !== 'Cancelada' && (
        <button onClick={handleCancelar} className="btn-cancelar">
          Cancelar Cita
        </button>
      )}
    </div>
  );
};

export default CitaCard;
