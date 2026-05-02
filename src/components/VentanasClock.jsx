import { useState } from 'react'

export default function VentanasClock() {
  const [inicioHs, setInicioHs] = useState(2)
  const [llegadaHs, setLlegadaHs] = useState(1)

  const maxVentana = 24
  const totalWidth = 600

  const trombolisisLimit = 4.5
  const trombectomiaLimit = 24

  const enTrombolis = inicioHs <= trombolisisLimit
  const enTrombectomia = inicioHs > trombolisisLimit && inicioHs <= trombectomiaLimit
  const fueraVentana = inicioHs > trombectomiaLimit

  const pct = (h) => Math.min(h / maxVentana, 1)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h3 className="font-display text-lg text-gray-800 mb-4">Simulador de ventanas terapéuticas</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Tiempo desde inicio de síntomas</span>
            <span className="font-semibold text-gray-900">{inicioHs.toFixed(1)} hs</span>
          </label>
          <input type="range" min="0" max="30" step="0.5" value={inicioHs}
            onChange={e => setInicioHs(Number(e.target.value))}
            className="w-full accent-red-600" />
        </div>
        <div>
          <label className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Tiempo en hospital (desde ingreso hasta ahora)</span>
            <span className="font-semibold text-gray-900">{llegadaHs.toFixed(1)} hs</span>
          </label>
          <input type="range" min="0" max="6" step="0.25" value={llegadaHs}
            onChange={e => setLlegadaHs(Number(e.target.value))}
            className="w-full accent-blue-600" />
        </div>
      </div>

      {/* Timeline visual */}
      <div className="relative h-14 rounded-lg overflow-hidden mb-2">
        <div className="absolute inset-0 bg-gray-100" />
        <div className="absolute inset-y-0 left-0 bg-green-200" style={{ width: `${pct(trombolisisLimit) * 100}%` }} />
        <div className="absolute inset-y-0 bg-yellow-200"
          style={{ left: `${pct(trombolisisLimit) * 100}%`, width: `${(pct(trombectomiaLimit) - pct(trombolisisLimit)) * 100}%` }} />

        {/* Marker inicio síntomas */}
        <div className="absolute inset-y-0 w-0.5 bg-red-600 z-10" style={{ left: `${pct(Math.min(inicioHs, maxVentana)) * 100}%` }}>
          <div className="absolute -top-px -left-1 w-2 h-2 rounded-full bg-red-600" />
          <div className="absolute top-4 -left-8 text-xs font-medium text-red-700 whitespace-nowrap bg-white px-1 rounded shadow-sm">{inicioHs.toFixed(1)}h</div>
        </div>

        {/* Labels zona */}
        <div className="absolute inset-0 flex">
          <div className="flex items-center justify-center text-xs font-semibold text-green-800 opacity-70" style={{ width: `${pct(trombolisisLimit) * 100}%` }}>
            <span className="hidden sm:inline">Trombólisis</span><span className="sm:hidden">IVT</span>
          </div>
          <div className="flex items-center justify-center text-xs font-semibold text-yellow-800 opacity-70"
            style={{ width: `${(pct(trombectomiaLimit) - pct(trombolisisLimit)) * 100}%` }}>
            <span className="hidden sm:inline">Trombectomía</span><span className="sm:hidden">EVT</span>
          </div>
          <div className="flex items-center justify-center text-xs text-gray-400 opacity-70 flex-1">Fuera</div>
        </div>
      </div>

      <div className="flex gap-4 text-xs text-gray-500 mb-4">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-200 inline-block"/>0–4.5 hs trombólisis</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-200 inline-block"/>4.5–24 hs trombectomía*</span>
        <span className="text-gray-400">* selección por imagen</span>
      </div>

      {/* Resultado */}
      <div className={`rounded-xl p-4 border-2 transition-all ${
        enTrombolis ? 'bg-green-50 border-green-400' :
        enTrombectomia ? 'bg-yellow-50 border-yellow-400' :
        'bg-red-50 border-red-400'}`}>
        {enTrombolis && <>
          <div className="font-semibold text-green-800 text-sm">✅ Dentro de ventana de trombólisis</div>
          <div className="text-xs text-green-700 mt-1">Tiempo restante: {Math.max(0, trombolisisLimit - inicioHs).toFixed(1)} hs. Activar Código ACV y preparar trombólisis.</div>
        </>}
        {enTrombectomia && <>
          <div className="font-semibold text-yellow-800 text-sm">⚠️ Fuera de trombólisis — evaluar trombectomía</div>
          <div className="text-xs text-yellow-700 mt-1">Tiempo restante para trombectomía: {Math.max(0, trombectomiaLimit - inicioHs).toFixed(1)} hs. Requiere angio-TC y selección por imagen.</div>
        </>}
        {fueraVentana && <>
          <div className="font-semibold text-red-800 text-sm">❌ Fuera de ambas ventanas terapéuticas</div>
          <div className="text-xs text-red-700 mt-1">Manejo médico de ACV agudo. Prevención secundaria y neuroprotección.</div>
        </>}
        {llegadaHs > 0 && (
          <div className="mt-2 pt-2 border-t border-current border-opacity-20 text-xs text-gray-600">
            Tiempo en hospital: {llegadaHs.toFixed(1)} hs. Tiempo perdido dentro del hospital: {(llegadaHs * 60).toFixed(0)} minutos.
          </div>
        )}
      </div>
    </div>
  )
}