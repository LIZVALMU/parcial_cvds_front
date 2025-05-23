import React, { useState, useEffect } from 'react';
import { CitaService } from '../services/CitaService';
import CitaCard from './CitaCard';
import type { Cita } from '../types/Cita';

const ListaCitas: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [correoFiltro, setCorreoFiltro] = useState<string>('');
  const [estadoFiltro, setEstadoFiltro] = useState<string>('');

  const cargarCitas = async () => {
    try {
      setLoading(true);
      const data = await CitaService.getAllCitas();
      setCitas(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar citas:', error);
      setLoading(false);
    }
  };

  const filtrarCitas = async () => {
    try {
      setLoading(true);
      let data;

      if (correoFiltro && estadoFiltro) {
        data = await CitaService.filtrarCitasPorEstado(correoFiltro, estadoFiltro);
      } else if (correoFiltro) {
        data = await CitaService.getCitasByCorreo(correoFiltro);
      } else {
        data = await CitaService.getAllCitas();
      }

      setCitas(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al filtrar citas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  return (
    <div className="lista-citas">
      <h2>Lista de Citas</h2>
      
      <div className="filtros">
        <input
          type="email"
          placeholder="Filtrar por correo"
          value={correoFiltro}
          onChange={(e) => setCorreoFiltro(e.target.value)}
        />
        <select
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
        <button onClick={filtrarCitas}>Filtrar</button>
        <button onClick={cargarCitas}>Limpiar filtros</button>
      </div>

      {loading ? (
        <p>Cargando citas...</p>
      ) : citas.length === 0 ? (
        <p>No hay citas disponibles</p>
      ) : (
        <div className="citas-container">
          {citas.map((cita) => (
            <CitaCard 
              key={cita.id} 
              cita={cita} 
              onCitaCancelada={cargarCitas} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaCitas;
