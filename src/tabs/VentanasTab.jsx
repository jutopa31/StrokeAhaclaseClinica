import SectionHeader from '../components/SectionHeader.jsx'
import SlideCard from '../components/SlideCard.jsx'
import AlertBox from '../components/AlertBox.jsx'
import VentanasClock from '../components/VentanasClock.jsx'
import { ventanas, mensajesVentanas } from '../content/ventanas.js'

const colorMap = { green:'green', blue:'blue', yellow:'orange' }

export default function VentanasTab() {
  return (
    <div className="space-y-5">
      <SectionHeader num="3" title="Ventanas terapéuticas" subtitle="Tiempo = cerebro" />
      <SlideCard accent="red">
        <p className="text-sm text-gray-700 leading-relaxed">
          En un ACV por oclusión de gran vaso se pierden <strong>1.9 millones de neuronas por minuto</strong> sin tratamiento.
          Cada 15 minutos de demora equivalen, en promedio, a un mes de vida independiente perdido.
        </p>
      </SlideCard>
      <VentanasClock />
      <div className="space-y-3">
        {ventanas.map((v, i) => {
          const titulo = v.tachado
            ? v.nombre.split(v.tachado).map((part, idx, arr) =>
                idx < arr.length - 1
                  ? <span key={idx}>{part}<s className="text-gray-400">{v.tachado}</s></span>
                  : <span key={idx}>{part}</span>
              )
            : v.nombre

          return (
            <SlideCard key={i} accent={colorMap[v.color] || 'gray'} title={titulo}>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-wide text-gray-400 font-medium">Ventana</span>
                  <p className="font-semibold text-gray-900">{v.inicio}–{v.fin} horas</p>
                  <p className="mt-1 text-gray-600">
                    {v.descripcionPartes
                      ? v.descripcionPartes.map((p, j) =>
                          p.tachado
                            ? <s key={j} className="text-gray-400">{p.texto}</s>
                            : <span key={j}>{p.texto}</span>
                        )
                      : <span className={v.tachadoDescripcion ? 'line-through text-gray-400' : ''}>{v.descripcion}</span>
                    }
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wide text-gray-400 font-medium">Condición</span>
                  <p className={`mt-0.5 ${v.tachadoCondicion ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {v.condicion}
                  </p>
                  {v.condicionNueva && (
                    <p className="text-gray-800 font-semibold mt-1">{v.condicionNueva}</p>
                  )}
                  <p className={`text-xs mt-2 ${v.tachadoMeta ? 'line-through text-gray-300' : 'text-gray-400'}`}>
                    {v.meta}
                  </p>
                  <p className="text-xs text-gray-400">{v.referencia}</p>
                </div>
              </div>
              {v.cita && (
                <p className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 italic leading-relaxed">
                  {v.cita}
                </p>
              )}
            </SlideCard>
          )
        })}
      </div>
      <AlertBox type="blue" title="Conceptos clave" items={mensajesVentanas} />
    </div>
  )
}