import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import TabBar from './components/TabBar.jsx'
import NihssTab from './tabs/NihssTab.jsx'
import CodigoAcvTab from './tabs/CodigoAcvTab.jsx'
import VentanasTab from './tabs/VentanasTab.jsx'
import ContraindicacionesTab from './tabs/ContraindicacionesTab.jsx'
import CasoClinico1Tab from './tabs/CasoClinico1Tab.jsx'
import CasoClinico2Tab from './tabs/CasoClinico2Tab.jsx'
import MensajesClaveTab from './tabs/MensajesClaveTab.jsx'

const tabs = [
  { id:'nihss',   path:'/nihss',   label:'NIHSS',           shortLabel:'NIHSS'    },
  { id:'codigo',  path:'/codigo',  label:'Código ACV',      shortLabel:'Código'   },
  { id:'ventanas',path:'/ventanas',label:'Ventanas',        shortLabel:'Ventanas' },
  { id:'contra',  path:'/contra',  label:'Contraindicaciones',shortLabel:'Contrain.'},
  { id:'caso1',   path:'/caso1',   label:'Caso 1',          shortLabel:'Caso 1'   },
  { id:'caso2',   path:'/caso2',   label:'Caso 2',          shortLabel:'Caso 2'   },
  { id:'mensajes',path:'/mensajes',label:'Mensajes clave',  shortLabel:'Claves'   },
]

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-gray-900 px-4 py-3 flex-shrink-0">
          <div className="max-w-4xl mx-auto flex items-baseline justify-between">
            <div>
              <p className="font-display text-red-400 text-sm tracking-wide">ACV Isquémico Agudo</p>
              <p className="text-xs text-gray-500 mt-0.5">Residentes de Clínica Médica · Hospital Posadas</p>
            </div>
            <p className="text-xs text-gray-600 hidden sm:block">Guía AHA/ASA 2026</p>
          </div>
        </header>
        <TabBar tabs={tabs} />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/nihss" replace />} />
            <Route path="/nihss"   element={<NihssTab />} />
            <Route path="/codigo"  element={<CodigoAcvTab />} />
            <Route path="/ventanas" element={<VentanasTab />} />
            <Route path="/contra"  element={<ContraindicacionesTab />} />
            <Route path="/caso1"   element={<CasoClinico1Tab />} />
            <Route path="/caso2"   element={<CasoClinico2Tab />} />
            <Route path="/mensajes" element={<MensajesClaveTab />} />
          </Routes>
        </main>
        <footer className="text-center text-xs text-gray-400 py-4 border-t border-gray-200 flex-shrink-0">
          Basado en Guía AHA/ASA 2026 · Unidad de Stroke · Hospital Posadas
        </footer>
      </div>
    </HashRouter>
  )
}