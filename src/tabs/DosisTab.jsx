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

        <div className="grid grid-cols-2 gap-3">

          {/* TA */}
          <div className="bg-white rounded-xl border border-l-4 border-red-400 p-3 shadow-sm">
            <p className="text-xs font-semibold text-red-600 mb-2">Tensión arterial</p>
            <p className="text-xs text-gray-400 mb-2">Meta &lt; 180/105 mmHg · 24 hs</p>
            {monitoreoTA.map((m) => (
              <div key={m.tiempo} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                <span className="text-xs font-mono text-red-500">{m.tiempo}</span>
                <span className="text-xs font-bold text-gray-700">{m.frecuencia}</span>
              </div>
            ))}
            <p className="text-xs text-red-600 mt-2 leading-tight">Si &gt; 180/105: nicardipina IV o labetalol IV</p>
          </div>

          {/* NIHSS */}
          <div className="bg-white rounded-xl border border-l-4 border-orange-400 p-3 shadow-sm">
            <p className="text-xs font-semibold text-orange-600 mb-2">NIHSS</p>
            {monitoreoNIHSS.map((n) => (
              <div key={n.momento} className="flex items-start gap-1.5 py-1 border-b border-gray-50 last:border-0">
                <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.momento.includes('deterioro') ? 'bg-red-500' : 'bg-orange-400'}`} />
                <span className={`text-xs leading-tight ${n.momento.includes('deterioro') ? 'text-red-600 font-semibold' : 'text-gray-700'}`}>
                  {n.momento}
                </span>
              </div>
            ))}
          </div>

          {/* Neuroimagen */}
          <div className="bg-white rounded-xl border border-l-4 border-blue-400 p-3 shadow-sm">
            <p className="text-xs font-semibold text-blue-600 mb-2">Neuroimagen</p>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-bold text-gray-700">📅 TC a las 24 hs</p>
                <p className="text-xs text-gray-500 leading-tight">Rutina — excluir transformación hemorrágica antes de antiagregantes</p>
              </div>
              <div>
                <p className="text-xs font-bold text-red-700">🚨 TC inmediata</p>
                <p className="text-xs text-gray-500 leading-tight">Ante deterioro neurológico agudo</p>
              </div>
            </div>
          </div>

          {/* Restricciones */}
          <div className="bg-white rounded-xl border border-l-4 border-gray-400 p-3 shadow-sm">
            <p className="text-xs font-semibold text-gray-600 mb-2">Restricciones 24 hs</p>
            <ul className="space-y-1.5">
              {[
                'Sin punciones arteriales',
                'Sin SNG ni sonda vesical',
                'Sin anticoagulación/antiagregación',
                'Sin procedimientos invasivos',
                'Monitoreo en stroke unit / UCI',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                  <span className="mt-1 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
