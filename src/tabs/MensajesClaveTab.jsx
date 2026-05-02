import SectionHeader from '../components/SectionHeader.jsx'
import { mensajes, fraseFinal } from '../content/mensajesClave.js'
import { ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react'

const iconMap = { accion: ArrowRight, concepto: Lightbulb, error: AlertTriangle }
const colorMap = {
  accion:  'bg-blue-50 border-blue-200 text-blue-800',
  concepto:'bg-purple-50 border-purple-200 text-purple-800',
  error:   'bg-red-50 border-red-200 text-red-800',
}

export default function MensajesClaveTab() {
  if (mensajes.length === 0) {
    return (
      <div className="space-y-5">
        <SectionHeader num="7" title="Mensajes clave" />
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <div className="text-gray-400 text-4xl mb-3">📌</div>
          <p className="text-gray-500 font-medium">Contenido pendiente</p>
          <p className="text-sm text-gray-400 mt-1">El docente completará los mensajes clave antes de la clase.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="space-y-5">
      <SectionHeader num="7" title="Mensajes clave" />
      <div className="grid gap-4">
        {mensajes.map((m, i) => {
          const Icon = iconMap[m.tipo] || ArrowRight
          return (
            <div key={i} className={`rounded-xl border p-4 ${colorMap[m.tipo] || colorMap.concepto}`}>
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <span className="font-display text-2xl font-bold opacity-40">{m.numero}</span>
                  <Icon size={16} className="opacity-60" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{m.titulo}</p>
                  {m.descripcion && <p className="text-sm opacity-80 mt-1">{m.descripcion}</p>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {fraseFinal && (
        <div className="bg-red-700 text-white rounded-xl p-6 text-center">
          <p className="font-display text-lg italic">"{fraseFinal}"</p>
        </div>
      )}
    </div>
  )
}