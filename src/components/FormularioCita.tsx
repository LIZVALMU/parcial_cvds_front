import React, { useState, useEffect } from 'react';
import { CitaService } from '../services/CitaService';
import { EspecialidadService } from '../services/EspecialidadService';
import type { Cita } from '../types/Cita';

interface FormularioCitaProps {
  onCitaCreada: () => void;
}

const FormularioCita: React.FC<FormularioCitaProps> = ({ onCitaCreada }) => {
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Cita>({
    nombreCompleto: '',
    cedula: '',
    correo: '',
    fechaCita: null,
    especialidad: '',
    doctor: '',
    ubicacion: 'ECI',
    estado: 'Confirmada'
  });
  const [error, setError] = useState<string>('');
  const [exito, setExito] = useState<string>('');

  useEffect(() => {
    const cargarEspecialidades = async () => {
      try {
        const data = await EspecialidadService.getAllEspecialidades();
        setEspecialidades(data);
      } catch (error) {
        console.error('Error al cargar especialidades:', error);
        setEspecialidades(['Medicina General', 'Odontología', 'Psicología', 'Otros']);
      }
    };

    cargarEspecialidades();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setExito('');

    try {
      await CitaService.crearCita(formValues);
      setExito('¡Cita creada con éxito!');
      setFormValues({
        nombreCompleto: '',
        cedula: '',
        correo: '',
        fechaCita: null,
        especialidad: '',
        doctor: '',
        ubicacion: 'ECI',
        estado: 'Confirmada'
      });
      onCitaCreada();
    } catch (error) {
      console.error('Error al crear cita:', error);
      setError('Error al crear la cita. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="formulario-cita">
      <h2>Programar Nueva Cita</h2>
      
      {error && <div className="error-message">{error}</div>}
      {exito && <div className="success-message">{exito}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreCompleto">Nombre Completo</label>
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            value={formValues.nombreCompleto}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cedula">Cédula</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={formValues.cedula}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formValues.correo}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="fechaCita">Fecha de Cita</label>
          <input
            type="date"
            id="fechaCita"
            name="fechaCita"
            value={formValues.fechaCita || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="especialidad">Especialidad</label>
          <select
            id="especialidad"
            name="especialidad"
            value={formValues.especialidad}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una especialidad</option>
            {especialidades.length > 0 ? (
              especialidades.map((esp, index) => (
                <option key={index} value={esp}>
                  {esp}
                </option>
              ))
            ) : (
              <>
                <option value="Medicina General">Medicina General</option>
                <option value="Odontología">Odontología</option>
                <option value="Psicología">Psicología</option>
                <option value="Otros">Otros</option>
              </>
            )}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="doctor">Doctor</label>
          <input
            type="text"
            id="doctor"
            name="doctor"
            value={formValues.doctor}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn-crear">
          Programar Cita
        </button>
      </form>
    </div>
  );
};

export default FormularioCita;
