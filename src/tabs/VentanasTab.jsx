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
        {ventanas.map((v, i) => (
          <SlideCard key={i} accent={colorMap[v.color] || 'gray'} title={v.nombre}>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-xs uppercase tracking-wide text-gray-400 font-medium">Ventana</span>
                <p className="font-semibold text-gray-900">{v.inicio}–{v.fin} horas</p>
                <p className="text-gray-600 mt-1">{v.descripcion}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wide text-gray-400 font-medium">Condición</span>
                <p className="text-gray-700 mt-0.5">{v.condicion}</p>
                <p className="text-xs text-gray-400 mt-2">{v.meta}</p>
                <p className="text-xs text-gray-400">{v.referencia}</p>
              </div>
            </div>
          </SlideCard>
        ))}
      </div>
      <AlertBox type="blue" title="Conceptos clave" items={mensajesVentanas} />
    </div>
  )
}