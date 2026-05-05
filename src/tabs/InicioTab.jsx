import SectionHeader from '../components/SectionHeader.jsx'
import SlideCard from '../components/SlideCard.jsx'
import { mensajesInicio } from '../content/inicio.js'

const accentText = {
  blue:   'text-blue-700',
  green:  'text-green-700',
  orange: 'text-orange-700',
  red:    'text-red-700',
  gray:   'text-gray-700',
}

const numBg = {
  blue:   'bg-blue-100 text-blue-700',
  green:  'bg-green-100 text-green-700',
  orange: 'bg-orange-100 text-orange-700',
  red:    'bg-red-100 text-red-700',
  gray:   'bg-gray-100 text-gray-600',
}

export default function InicioTab() {
  return (
    <div className="space-y-5">
      <SectionHeader num="0" title="Inicio" subtitle="ACV Isquémico Agudo · Mensajes clave" />
      <div className="space-y-3">
        {mensajesInicio.map((m) => (
          <SlideCard key={m.num} accent={m.accent}>
            <div className="flex items-start gap-3">
              <span className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full font-display text-base font-bold ${numBg[m.accent]}`}>
                {m.num}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className={`font-display text-base mb-2 ${accentText[m.accent]}`}>{m.titulo}</h3>

                {m.items && (
                  <div className="space-y-2">
                    {m.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                          <span className="text-sm text-gray-500"> — {item.detalle}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {m.pasos && (
                  <div className="space-y-2">
                    {m.pasos.map((p, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-200 text-orange-800 text-xs font-bold flex items-center justify-center">{p.paso}</span>
                        <span className="text-sm text-gray-700">{p.texto}</span>
                      </div>
                    ))}
                  </div>
                )}

                {m.texto && !m.destacado && (
                  <p className="text-sm text-gray-600 leading-relaxed">{m.texto}</p>
                )}

                {m.texto && m.destacado && (
                  <p className="text-sm text-red-800 leading-relaxed font-medium">{m.texto}</p>
                )}

                {m.semaforo && (
                  <div className="mt-2 flex gap-2">
                    {[['bg-red-500','Absolutas'],['bg-yellow-400','Relativas mayores'],['bg-green-500','Relativas menores']].map(([bg, label]) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 rounded-full flex-shrink-0 ${bg}`} />
                        <span className="text-xs text-gray-600">{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SlideCard>
        ))}
      </div>
    </div>
  )
}
