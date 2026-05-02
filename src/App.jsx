import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import TabBar from './components/TabBar.jsx'
import NihssTab from './tabs/NihssTab.jsx'
import CodigoAcvTab from './tabs/CodigoAcvTab.jsx'
import VentanasTab from './tabs/VentanasTab.jsx'
import ContraindicacionesTab from './tabs/ContraindicacionesTab.jsx'
import CasoClinicoTab from './tabs/CasoClinicoTab.jsx'
import MensajesClaveTab from './tabs/MensajesClaveTab.jsx'
import { casos } from './content/casos.js'

const staticTabs = [
  { id:'nihss',    path:'/nihss',    label:'NIHSS',           shortLabel:'NIHSS'     },
  { id:'codigo',   path:'/codigo',   label:'Código ACV',      shortLabel:'Código'    },
  { id:'ventanas', path:'/ventanas', label:'Ventanas',        shortLabel:'Ventanas'  },
  { id:'contra',   path:'/contra',   label:'Contraindicaciones', shortLabel:'Contrain.' },
]

const casoTabs = casos.map((c, i) => ({
  id: c.id,
  path: `/${c.id}`,
  label: c.titulo,
  shortLabel: `Caso ${i + 1}`,
}))

const mensajesTab = { id:'mensajes', path:'/mensajes', label:'Mensajes clave', shortLabel:'Claves' }

const tabs = [...staticTabs, ...casoTabs, mensajesTab]

// Numeric offset for SectionHeader — static tabs occupy 1-4
const casoOffset = staticTabs.length + 1

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
            <Route path="/nihss"    element={<NihssTab />} />
            <Route path="/codigo"   element={<CodigoAcvTab />} />
            <Route path="/ventanas" element={<VentanasTab />} />
            <Route path="/contra"   element={<ContraindicacionesTab />} />
            {casos.map((caso, i) => (
              <Route
                key={caso.id}
                path={`/${caso.id}`}
                element={<CasoClinicoTab caso={caso} num={casoOffset + i} />}
              />
            ))}
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
