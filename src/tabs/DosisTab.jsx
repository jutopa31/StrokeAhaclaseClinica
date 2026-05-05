import { useState } from 'react'
import SectionHeader from '../components/SectionHeader.jsx'
import SlideCard from '../components/SlideCard.jsx'
import AlertBox from '../components/AlertBox.jsx'
import { RotateCcw, Minus, Plus } from 'lucide-react'

const monitoreoTA = [
  { tiempo: '0 – 2 hs',   frecuencia: 'Cada 15 min', nota: 'Durante la infusión del trombolítico' },
  { tiempo: '2 – 8 hs',   frecuencia: 'Cada 30 min', nota: 'Primeras horas post-infusión' },
  { tiempo: '8 – 24 hs',  frecuencia: 'Cada 60 min', nota: 'Hasta completar las 24 horas' },
]

const monitoreoNIHSS = [
  { momento: 'Al finalizar la infusión',  detalle: '60 minutos post-inicio' },
  { momento: 'A las 2 horas',             detalle: 'Post-inicio del trombolítico' },
  { momento: 'A las 6 horas',             detalle: 'Control intermedio' },
  { momento: 'A las 24 horas',            detalle: 'Previo a neuroimagen de control' },
  { momento: 'Ante cualquier deterioro',  detalle: 'Evaluación inmediata — activar protocolo de hemorragia' },
]

const RTPA_DOSE   = 0.9
const RTPA_MAX    = 90
const TNK_DOSE    = 0.25
const TNK_MAX     = 25

function fmt(n) { return Number(n.toFixed(1)) }

function calcRtpa(kg) {
  const total  = Math.min(RTPA_DOSE * kg, RTPA_MAX)
  const bolus  = fmt(total * 0.10)
  const inf    = fmt(total * 0.90)
  const capped = RTPA_DOSE * kg > RTPA_MAX
  return { total: fmt(total), bolus, inf, capped }
}

function calcTnk(kg) {
  const total  = Math.min(TNK_DOSE * kg, TNK_MAX)
  const capped = TNK_DOSE * kg > TNK_MAX
  return { total: fmt(total), capped }
}

function Row({ label, value, sub, highlight }) {
  return (
    <div className={`flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0 ${highlight ? 'bg-blue-50 -mx-4 px-4 rounded-lg' : ''}`}>
      <div>
        <p className="text-sm text-gray-700 font-medium">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <span className={`font-display text-xl font-bold ${highlight ? 'text-blue-700' : 'text-gray-800'}`}>
        {value} <span className="text-sm font-sans font-normal text-gray-500">mg</span>
      </span>
    </div>
  )
}

export default function DosisTab() {
  const [peso, setPeso] = useState(70)

  const rtpa = calcRtpa(peso)
  const tnk  = calcTnk(peso)

  const adj = (delta) => setPeso(p => Math.min(200, Math.max(30, p + delta)))

  return (
    <div className="space-y-5">
      <SectionHeader num="6" title="Calculadora de dosis" subtitle="rtPA · TNK" />

      {/* Weight picker */}
      <SlideCard accent="gray">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Peso del paciente</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => adj(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors active:scale-95"
          >
            <Minus size={18} />
          </button>

          <div className="flex items-baseline gap-1">
            <input
              type="number"
              value={peso}
              min={30} max={200}
              onChange={e => {
                const v = parseInt(e.target.value)
                if (!isNaN(v)) setPeso(Math.min(200, Math.max(30, v)))
              }}
              className="w-20 text-center font-display text-5xl font-bold text-gray-800 bg-transparent border-none outline-none"
            />
            <span className="text-lg text-gray-400 font-medium">kg</span>
          </div>

          <button
            onClick={() => adj(+1)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors active:scale-95"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="mt-3 flex justify-center gap-2">
          {[50,60,70,80,90,100].map(kg => (
            <button
              key={kg}
              onClick={() => setPeso(kg)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors
                ${peso === kg ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {kg}
            </button>
          ))}
        </div>
      </SlideCard>

      {/* rtPA */}
      <SlideCard accent="blue">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-lg text-blue-700">rtPA — Alteplase</h3>
          {rtpa.capped && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Dosis máxima</span>
          )}
        </div>
        <p className="text-xs text-gray-400 mb-4">0,9 mg/kg · máx 90 mg</p>

        <Row label="Dosis total" value={rtpa.total} highlight />
        <Row label="Bolo (10%)" value={rtpa.bolus} sub="IV en 1 minuto" />
        <Row label="Infusión (90%)" value={rtpa.inf} sub="IV en 60 minutos" />

        <div className="mt-4 bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-700 font-medium mb-1">Preparación</p>
          <p className="text-xs text-blue-600 leading-relaxed">
            Diluir en SF o DAD 5%. Administrar bolo por vía periférica exclusiva calibre 18.
            No puncionar arterias ni colocar SNG/sonda vesical durante la infusión.
          </p>
        </div>
      </SlideCard>

      {/* TNK */}
      <SlideCard accent="green">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-lg text-green-700">TNK — Tenecteplase</h3>
          {tnk.capped && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Dosis máxima</span>
          )}
        </div>
        <p className="text-xs text-gray-400 mb-4">0,25 mg/kg · máx 25 mg</p>

        <Row label="Bolo único" value={tnk.total} sub="IV en 5–10 segundos" highlight />

        <div className="mt-4 bg-green-50 rounded-lg p-3">
          <p className="text-xs text-green-700 font-medium mb-1">Ventaja operativa</p>
          <p className="text-xs text-green-600 leading-relaxed">
            Bolo único sin infusión prolongada. Facilita el traslado inmediato a sala de hemodinamia
            para trombectomía mecánica (bridging).
          </p>
        </div>
      </SlideCard>

      {/* Reset */}
      <button
        onClick={() => setPeso(70)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-all"
      >
        <RotateCcw size={14} /> Restablecer a 70 kg
      </button>

      {/* Post-trombolisis */}
      <div className="pt-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Cuidados post-trombolisis</p>

        {/* TA */}
        <SlideCard accent="red" title="Monitoreo de tensión arterial">
          <p className="text-xs text-gray-500 mb-3">Meta: TA &lt; 180/105 mmHg durante las primeras 24 horas</p>
          <div className="space-y-2">
            {monitoreoTA.map((m) => (
              <div key={m.tiempo} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2.5">
                <span className="text-xs font-mono font-bold text-red-600 w-16 flex-shrink-0">{m.tiempo}</span>
                <span className="text-sm font-semibold text-gray-800 flex-1">{m.frecuencia}</span>
                <span className="text-xs text-gray-400 text-right hidden sm:block">{m.nota}</span>
              </div>
            ))}
          </div>
          <AlertBox type="red" text="Si TA > 180/105 mmHg: nicardipina IV 5 mg/h o labetalol IV 10 mg. No usar nitroprusiato." />
        </SlideCard>

        {/* NIHSS */}
        <SlideCard accent="orange" title="Evaluación neurológica — NIHSS" className="mt-3">
          <div className="space-y-2">
            {monitoreoNIHSS.map((n) => (
              <div key={n.momento} className="flex items-start gap-3 bg-gray-50 rounded-lg px-3 py-2.5">
                <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${n.momento.includes('deterioro') ? 'bg-red-500' : 'bg-orange-400'}`} />
                <div>
                  <p className={`text-sm font-semibold ${n.momento.includes('deterioro') ? 'text-red-700' : 'text-gray-800'}`}>{n.momento}</p>
                  <p className="text-xs text-gray-400">{n.detalle}</p>
                </div>
              </div>
            ))}
          </div>
        </SlideCard>

        {/* Neuroimagen */}
        <SlideCard accent="blue" title="Neuroimagen de control" className="mt-3">
          <div className="space-y-2">
            {[
              { tipo: 'TC a las 24 horas', detalle: 'Rutina — excluir transformación hemorrágica antes de iniciar antiagregantes', urgente: false },
              { tipo: 'TC inmediata', detalle: 'Ante deterioro neurológico agudo — descartar hemorragia intracraneal sintomática', urgente: true },
            ].map((item) => (
              <div key={item.tipo} className={`rounded-lg px-3 py-3 border ${item.urgente ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
                <p className={`text-sm font-semibold ${item.urgente ? 'text-red-800' : 'text-blue-800'}`}>
                  {item.urgente ? '🚨 ' : '📅 '}{item.tipo}
                </p>
                <p className={`text-xs mt-0.5 ${item.urgente ? 'text-red-700' : 'text-blue-700'}`}>{item.detalle}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">No iniciar antiagregantes ni anticoagulantes en las primeras 24 horas post-trombolisis.</p>
        </SlideCard>

        {/* Restricciones */}
        <SlideCard accent="gray" title="Restricciones durante las primeras 24 horas" className="mt-3">
          <ul className="space-y-1.5">
            {[
              'No punciones arteriales (femoral, radial, subclavia)',
              'No colocar SNG ni sonda vesical (salvo indicación estricta)',
              'No anticoagulación ni antiagregación',
              'No procedimientos invasivos',
              'Monitoreo continuo en unidad de stroke o UCI',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </SlideCard>
      </div>
    </div>
  )
}
