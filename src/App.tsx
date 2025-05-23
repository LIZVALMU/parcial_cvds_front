import { useState } from 'react'
import './App.css'
import ListaCitas from './components/ListaCitas'
import FormularioCita from './components/FormularioCita'

function App() {
  const [actualizarLista, setActualizarLista] = useState(0)

  const handleCitaCreada = () => {
    setActualizarLista(prev => prev + 1)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ECI Salud Vital - Gestión de Citas</h1>
      </header>

      <main className="app-content">
        <FormularioCita onCitaCreada={handleCitaCreada} />
        
        <ListaCitas key={actualizarLista} />
      </main>
    </div>
  )
}

export default App
